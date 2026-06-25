---
layout: page
title: Parallel Heat Stencil
description: Efficient and scalable 5-point heat stencil in C, parallelized from one core to multiple nodes with hybrid MPI + OpenMP on Cineca Leonardo
img: assets/img/hpc_mpi_strong_speedup.png
importance: 2
category: HPC
---

An efficient and scalable 5-point stencil for 2D heat diffusion, implemented in C and parallelized with hybrid MPI + OpenMP. Each iteration updates every cell to a weighted average of its four neighbours (center 0.5, neighbours 0.125), with fixed sources injecting energy. The 5-point stencil has very low arithmetic intensity, which makes it memory-bound, so the memory bottleneck is the central concern throughout. Benchmarked on Cineca Leonardo and the Orfeo EPYC cluster, and validated against a Python reference for energy conservation.

{% include figure.liquid path="assets/img/hpc_stencil_simulation.gif" class="img-fluid rounded z-depth-1 my-3" alt="Five heat sources diffusing on a 2D grid with periodic, wrap-around boundaries" %}

_Five sources diffusing with periodic boundaries: heat leaving one edge re-enters the opposite side._

| Experiment         | Result                                                     |
| ------------------ | ---------------------------------------------------------- |
| Single-core tuning | ~43% from loop hoisting, ~33% from non-temporal stores     |
| OpenMP (1 node)    | ~27× at 112 threads; `spread` ≈ 2.2× `close` at 32 threads |
| MPI strong scaling | 16.76× over 16 nodes (3 to 48 tasks)                       |
| MPI weak scaling   | ~100% efficiency out to 48 tasks                           |

### Initial code optimization

Two single-thread optimizations (10,000² grid, 100 iterations, Orfeo THIN partition):

- **Row-offset hoisting:** precompute per-row pointers outside the inner loop, so offsets are computed once per row instead of once per cell. ~43% runtime reduction over the initial version.
- **Non-temporal stores:** the output is not reused soon, so streaming it past the cache avoids cache pollution on this memory-bound kernel. ~33% reduction.

### OpenMP

The plane update and the energy reduction are parallelized across rows with `#pragma omp parallel for schedule(static)`, preserving cache locality. NUMA placement is the main factor: thread-pinning variables (`OMP_PLACES`, `OMP_PROC_BIND`) are not sufficient if the grid is first zeroed by a single thread, because every page is then allocated on one NUMA node. Initializing under the same parallel schedule (first-touch) places each thread's pages on its local node.

Thread binding then dominates, structured by the node's 8 NUMA regions. On one 112-core Leonardo node (25,000² grid, 200 iterations), `spread` scales near-linearly up to 8 threads (7.83× on 8): each thread lands in its own region and gets that region's full memory bandwidth. Past 8 threads, regions hold multiple threads and their bandwidth saturates, so efficiency falls. `close` instead packs threads into one region at a time, saturating it early so the extra cores there add little: 7.93× at 32 threads, against 17.49× for `spread` (a 2.2× difference). At full occupancy the node's aggregate bandwidth is the ceiling, so both bindings converge near 27×.

{% include figure.liquid path="assets/img/hpc_openmp_speedup.png" class="img-fluid rounded z-depth-1 my-3" alt="OpenMP speedup on Leonardo: spread binding above close until bandwidth saturates near 27x" %}

### MPI

The grid is decomposed into per-process blocks, each framed by a one-cell halo of ghost cells holding the neighbours' edges. Halos are exchanged each step with non-blocking `MPI_Isend` / `MPI_Irecv`, and computation overlaps communication: each process updates its interior while the halos are in flight, then calls `MPI_Waitall` and updates the borders once the data arrives. Communication stays a small fraction of runtime and decreases as nodes are added.

{% include figure.liquid path="assets/img/hpc_mpi_time_breakdown.png" class="img-fluid rounded z-depth-1 my-3" alt="MPI time breakdown: computation dominates, communication stays small and decreases with task count" %}

Strong scaling (50,000² grid, 1000 iterations, 3 tasks per node, 8 threads per task) reaches 16.76× across 16 nodes, slightly above ideal: spreading the fixed problem over more nodes shrinks each rank's working set and adds aggregate memory bandwidth, so the kernel becomes less memory-bound as it scales. Smaller grids would fit cache entirely and run much faster, but that regime does not represent the large systems this targets. Weak scaling holds ~100% efficiency out to 48 tasks.

<div class="row">
<div class="col-sm-6 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/hpc_mpi_strong_speedup.png" class="img-fluid rounded z-depth-1" alt="MPI strong-scaling speedup tracking ideal up to 48 tasks" %}
</div>
<div class="col-sm-6 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/hpc_mpi_weak_efficiency.png" class="img-fluid rounded z-depth-1" alt="MPI weak-scaling efficiency near 100% up to 48 tasks" %}
</div>
</div>

### Closing remarks

Profile-guided optimization and huge pages were tested without benefit (cluster TLB miss rates are already low). MPI Cartesian topology, temporal blocking, and `MPI_Waitsome` on borders remain as future work. Main takeaway: profile, profile before optimizing, and profile on the machine you will run on.

🔗 [GitHub](https://github.com/Jac-Zac/HPC_Final_Project) · [Slides](https://canva.link/eyg24os7b2z8kkh)
