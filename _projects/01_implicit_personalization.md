---
layout: page
title: Implicit Personalization
description: Monitoring and attributing the user models LLMs silently build. SPAR research fellowship
img: assets/img/implicit_personalization.png
importance: 1
category: research
---

<img src="{{ '/assets/img/persona_icon.png' | relative_url }}" alt="Implicit Personalization logo" style="height: 2rem; vertical-align: middle; margin-bottom: 0.4rem;"> LLMs quietly form internal representations of _who they're talking to_ (guesses about a user's age, expertise, political leaning, or values) and silently condition their responses on them. As a **[SPAR](https://sparai.org)** research fellow with the [Implicit Personalization](https://github.com/implicit-personalization) group, I investigated how these user models are encoded, how they can be detected, and whether they can be steered.

The work spans four connected codebases:

**`persona-data`**: Dataset utilities for **SynthPersona**: 1,000 synthetic personas × 788k QA rows (explicit + implicit, FRQ + MCQ) covering diverse demographic and ideological profiles. Released on the [HF Hub](https://huggingface.co/datasets/implicit-personalization/synth-persona) with leakage-aware train/test splits.

{% include figure.liquid path="assets/img/persona_vector_extraction.png" class="img-fluid rounded z-depth-1 my-3" alt="SynthPersona dataset overview" %}

**`persona-vectors`**: Extract per-persona hidden-state directions from LLMs (e.g. Gemma-2-27B-IT) using `nnsight` / `nnterp`, then use them for probing, PCA / UMAP analysis, and inference-time steering. Extracted vectors released on the Hub: [synth-persona-vectors](https://huggingface.co/datasets/implicit-personalization/synth-persona-vectors).

{% include figure.liquid path="assets/img/what_are_rich_persona_vectors.png" class="img-fluid rounded z-depth-1 my-3" alt="What are rich persona vectors" %}

**`persona-ui`**: A Streamlit web app on [HF Spaces](https://huggingface.co/spaces/implicit-personalization/persona-ui) that exposes the full pipeline: chat with persona-steered models, run extraction, train probes, and visualize projections interactively.

**`persona-2-lora`**: Mechanistic interpretability experiments on Doc-to-LoRA: evaluating whether LoRA adapters trained on persona biographies internalize persona attributes measurably differently from biography-prompted baselines.

📊 [Poster slides](https://docs.google.com/presentation/d/1qphCwoW-cTKJP4Nj1yXUO_OxkB0yzcqfNSs5czGOkuY/edit?slide=id.p1#slide=id.p1) · 🔗 [github.com/implicit-personalization](https://github.com/implicit-personalization)
