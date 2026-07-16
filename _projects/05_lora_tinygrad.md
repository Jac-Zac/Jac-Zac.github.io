---
layout: page
title: LoRA & DoRA in TinyGrad
description: From-scratch Low-Rank Adaptation and Weight-Decomposed LoRA implemented in TinyGrad
img: assets/img/lora_diagram.png
importance: 2
category: Machine Learning
code: https://github.com/Jac-Zac/ML_Project_LoRA
code_label: Archived code
slides: https://www.canva.com/design/DAGJKcSf-b8/6JX6DyIRuLxLFd6UubpZ1A/view?utm_content=DAGJKcSf-b8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h21818cddf6
---

From-scratch implementations of **LoRA** (Low-Rank Adaptation) and **DoRA** (Weight-Decomposed LoRA) in [**TinyGrad**](https://github.com/tinygrad/tinygrad), showing how injecting low-rank adapters into linear layers reduces trainable parameter count while maintaining fine-tuning performance.

{% include project_actions.liquid %}

## Implementation

LoRA keeps the pretrained weight matrix frozen and learns a low-rank update through two smaller matrices. DoRA separates each weight into magnitude and direction, then applies low-rank adaptation to the directional component. Both implementations expose these mechanics directly through TinyGrad rather than relying on a high-level adapter library.

## Purpose

The project provides a compact reference for understanding parameter-efficient fine-tuning, including how adapters affect trainable parameter counts, computation graphs, and inference behavior.
