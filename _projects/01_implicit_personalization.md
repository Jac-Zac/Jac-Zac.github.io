---
layout: page
title: Implicit Personalization
description: Monitoring and attributing the user models LLMs silently build — SPAR research fellowship
img:
importance: 1
category: research
---

LLMs quietly form internal representations of *who they're talking to* — guesses about a user's age, expertise, political leaning, or values — and condition their responses on them. As a **[SPAR](https://sparai.org)** research fellow with the [Implicit Personalization](https://github.com/implicit-personalization) group, I investigated how these user models are encoded and how they can be detected and analyzed.

The work spans three connected codebases:

**`persona-data`** — Dataset utilities for **SynthPersona**: 1,000 synthetic personas × 788k QA rows (explicit + implicit, FRQ + MCQ) on the [HF Hub](https://huggingface.co/datasets/implicit-personalization/synth-persona). Includes leakage-aware train/test splits.

**`persona-vectors`** — Extract per-persona hidden-state directions from LLMs (e.g. Gemma-2-27B-IT) using `nnsight` / `nnterp`, then use them for probing, PCA / UMAP analysis, and inference-time steering. Extracted vectors released on the Hub: [synth-persona-vectors](https://huggingface.co/datasets/implicit-personalization/synth-persona-vectors).

**`persona-ui`** — A Streamlit web app on [HF Spaces](https://huggingface.co/spaces/implicit-personalization/persona-ui) that exposes the whole pipeline: chat with persona-steered models, run extraction, train probes, visualize projections.

**`persona-2-lora`** — Mechanistic interpretability experiments on Doc-to-LoRA: evaluating whether LoRA adapters trained on persona biographies internalize persona attributes measurably differently from biography-prompted baselines.

📊 [Poster slides](https://docs.google.com/presentation/d/1qphCwoW-cTKJP4Nj1yXUO_OxkB0yzcqfNSs5czGOkuY/edit?slide=id.p1#slide=id.p1) · 🔗 [github.com/implicit-personalization](https://github.com/implicit-personalization)
