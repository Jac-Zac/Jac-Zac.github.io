---
layout: page
title: Self-Attention Kernels
description: Optimized Causal Multi-Head Self-Attention in CUDA, OpenMP, and SIMD — 1.09× faster than PyTorch naive on A100
img: assets/img/attention_mechanism.png
importance: 1
category: systems
---

Hand-optimized **Causal Multi-Head Self-Attention (CMHSA)** with three backends validated against GPT-2 attention outputs:

| Backend            | Result                                      |
| ------------------ | ------------------------------------------- |
| CUDA v4.6          | **1.09× faster** than PyTorch naive on A100 |
| OpenMP (128 cores) | **8.11× speedup** vs single-thread          |
| Strong scaling     | Near-linear to 128 threads                  |

Benchmarked on Cineca (A100 GPUs) and Orfeo HPC clusters. The CUDA path uses tiled shared-memory access patterns and progressive kernel optimization across six versions.

🔗 [GitHub](https://github.com/Jac-Zac/Self_Attention_Kernels)
