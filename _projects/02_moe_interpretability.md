---
layout: page
title: MoE Interpretability
description: Adapting HeadPursuit / SOMP to classify expert specialization in Mixture-of-Experts LLMs
img: assets/img/moe_evr_heatmap.png
importance: 2
category: research
---

This project adapts the **[HeadPursuit](https://github.com/lorenzobasile/HeadPursuit)** framework — originally designed for attention heads — to **Mixture-of-Experts** language models.

**Target models:** `allenai/OLMoE-1B-7B-0924-Instruct` (16 layers, 64 experts/layer, top-8 routing) and `openai/gpt-oss-20b`.

**Pipeline:**

1. **Capture** — use `nnsight` to extract per-expert activations with multi-GPU tensor-parallelism via `torchrun`. Activations and metadata stored in HDF5.
2. **Pursuit** — run **Simultaneous Orthogonal Matching Pursuit (SOMP)** over expert activations against the model's unembedding dictionary, ranking top-k concept atoms per expert with Explained Variance Ratios (EVR).
3. **Validation** — cross-check with mean-projection baselines, per-token frequency analysis, and PCA singular-value spectra to separate monosemantic from polysemantic experts.

The output is an EVR heatmap across layers × experts, plus per-expert top-token lists for qualitative interpretation.

_Repository currently private — available on request._
