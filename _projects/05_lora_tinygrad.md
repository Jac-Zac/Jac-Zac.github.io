---
layout: page
title: LoRA & DoRA in TinyGrad
description: From-scratch Low-Rank Adaptation and Weight-Decomposed LoRA implemented in TinyGrad
img: assets/img/lora_diagram.png
importance: 3
category: Machine Learning
code: https://github.com/Jac-Zac/ML_Project_LoRA
code_label: Archived code
slides: https://www.canva.com/design/DAGJKcSf-b8/6JX6DyIRuLxLFd6UubpZ1A/view
---

**LoRA** (Low-Rank Adaptation) and **DoRA** (Weight-Decomposed LoRA) written from scratch in [**TinyGrad**](https://github.com/tinygrad/tinygrad). Both replace the full fine-tuning update of a linear layer with a much smaller set of trainable parameters.

{% include project_actions.liquid %}

## Implementation

LoRA keeps the pretrained weight matrix frozen and learns a low-rank update through two smaller matrices. DoRA separates each weight into magnitude and direction, then applies the low-rank adaptation to the directional component only.

Both are built on TinyGrad's own tensors and autograd, with no adapter library in between. The adapter parameters and the extra matmuls stay visible in the code.
