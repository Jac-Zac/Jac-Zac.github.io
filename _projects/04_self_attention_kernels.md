---
layout: page
title: Self-Attention Kernels
description: Optimized Causal Multi-Head Self-Attention in CUDA, OpenMP, and SIMD. 1.09× faster than PyTorch naive on A100
img: assets/img/attention_mechanism.png
thumbnail_padded: true
importance: 1
category: HPC
---

Hand-optimized **Causal Multi-Head Self-Attention (CMHSA)** written from scratch in C++/CUDA and progressively tuned across three backends (single-threaded SIMD, OpenMP, and CUDA), with every kernel validated numerically against PyTorch's reference implementation (naive and `scaled_dot_product_attention`). The goal was less to beat cuBLAS than to understand, layer by layer, _where_ the time actually goes on modern hardware.

| Backend                    | Best result                                            |
| -------------------------- | ------------------------------------------------------ |
| CUDA (v4.6, A100)          | **1.09× faster than PyTorch naive** (0.097s vs 0.105s) |
| OpenMP (EPYC 7H12, 128c)   | **~94× speedup** vs single-thread (~73% efficiency)    |
| Single-thread (EPYC 9374F) | **~23× speedup** from compiler flags + stride padding  |

Three different machines: the A100 GPU (Cineca), and two Orfeo CPU partitions: single-thread on a **Zen 4 EPYC 9374F (Genoa)**, multicore strong scaling on a **128-core Zen 2 EPYC 7H12**. GPU/multicore config: `batch=4, n_heads=32, seq_len=4096, head_dim=128` (single-thread uses `batch=1, n_heads=4`).

### Single-threaded: the compiler flag that mattered

The most surprising result came from chasing why `-O3 -march=native` _looked_ vectorized but ran slowly. Inspecting the assembly showed AVX-512 loads followed by **16 scalar `vaddss` instructions per iteration**. The compiler refused to keep partial sums in a vector register because IEEE 754 addition isn't associative. Adding `-fassociative-math` unlocks proper `vfmadd231ps` FMA accumulation and gives a **3.5× speedup** on its own; padding row strides to 64-byte boundaries adds another ~30%, and `-ffast-math` enables libmvec's vectorized `expf` for the softmax. Cumulatively v0 → v1_d is ~23×, almost entirely from flags and a stride tweak.

### Multi-threaded: tiling for cache, not just cores

OpenMP `collapse(2)` over `(batch, heads)` parallelizes the trivial axis but leaves K/V being reloaded per query. v1 introduces **Q-tiling (TILE_Q=32)** so each K row is loaded once per tile and reused across 32 queries, with causal masking enforced via `q_start = max(key_pos, q_tile)`. This is the same locality argument that motivates Flash Attention on the GPU side.

{% include figure.liquid path="assets/img/sak_benchmark_strong_scaling.png" class="img-fluid rounded z-depth-1 my-3" alt="Strong scaling on a 128-core AMD EPYC 7H12 (Zen 2) up to 128 threads" %}

Strong scaling on Orfeo's 128-core EPYC 7H12 (Zen 2) partition is near-ideal up to 64 threads and holds ~73% efficiency all the way to 128 (a **~94× speedup**, 20.6s → 0.22s). The gentle taper past 64 is where NUMA effects (8 NUMA nodes on this box) and memory bandwidth start to bite.

The contrast with PyTorch is the real payoff. **PyTorch's naive attention barely parallelizes**. It tops out around **8–9×** and actually _regresses_ past 64 threads (4.20s at 128 vs 3.75s at 64), because without tiling it stays pinned by memory bandwidth. v1's cache-aware tiling is what lets it keep scaling. In absolute terms at full 128 cores, v1 runs in **0.22s vs PyTorch naive's 4.20s, a 19× gap**. PyTorch's fused SDPA stays ahead at _every_ thread count, but the margin shrinks to just **~1.5× at 128 cores** (0.15s vs 0.22s), remarkably close for a hand-rolled kernel.

### CUDA: six versions, one stubborn bottleneck

The CUDA path walks through six progressively rewritten kernels:

- **v0**: one thread per query. Catastrophic: 46× _slower_ than PyTorch naive. Useful as a counter-example.
- **v1**: collaborative dot products across a 32-thread warp with `__shfl_down_sync` reduction. Coalesced Q/K loads. **8.3× over v0.**
- **v2**: XOR-pattern warp reductions (`__shfl_xor_sync`) leave the result in every lane, eliminating a broadcast. Pack 8 warps per block for occupancy. 1.37× over v1.
- **v3**: **online softmax (Flash Attention style)**: maintain a running max/sum and rescale previous accumulations with $\alpha = e^{m_{\text{old}} - m_{\text{new}}}$ as new scores arrive. Zero workspace, single pass. 1.68× over v2.
- **v4 / v4.5**: Q and the output accumulator live in registers; the inner loop is rewritten in `float4` for vectorized loads. 1.61× over v4.
- **v4.6**: **dual-key processing**: compute scores for keys $k$ and $k{+}1$ together, halving warp reductions and softmax-update overhead. This is the kernel that finally crosses **1.09× PyTorch naive**.

The instructive part is that **v5's shared-memory tiling was actually slower than v4.5**: the `__syncthreads()` cost dominated at this sequence length. v6 recovered to 0.117s with better tile sizing, but the lesson stuck: textbook Flash Attention tricks only pay when you can amortize the sync.

{% include figure.liquid path="assets/img/sak_benchmark_gpu.png" class="img-fluid rounded z-depth-1 my-3" alt="CUDA kernel speedups vs PyTorch naive and SDPA on A100" %}

### Where the gap with PyTorch SDPA comes from

PyTorch SDPA stays ~5–7× ahead. Profiling v3 with Nsight Compute makes the reason concrete: 26% of stall cycles are on the global-memory load for V (`ld.global.nc.f32` at line 240), and the L1 hit rate sits around 37%. The kernel is memory-bound, not compute-bound.

{% include figure.liquid path="assets/img/sak_v3_nsight.png" class="img-fluid rounded z-depth-1 my-3" alt="Nsight Compute warp stall analysis for v3 kernel" %}

The remaining gap is mostly things this project deliberately doesn't do: **Tensor Cores** (FP32-only here, vs. SDPA's FP16/BF16 mixed precision giving 8–16× throughput), head-dim specialization (SDPA has dedicated kernels for `head_dim=64,128`), and tighter K/V tiling to fully reuse shared memory.

🔗 [GitHub](https://github.com/Jac-Zac/Self_Attention_Kernels)
