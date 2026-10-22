---
layout: page
title: Implicit Personalization
description: Detecting and attributing the user models that LLMs build implicitly during conversation
img: assets/img/implicit_personalization.png
thumbnail_padded: true
importance: 1
category: Mechanistic Interpretability
report: https://library.sparai.org/reports/monitoring-and-attributing-implicit-personalization-in-conversational-agents-0zgx2q/
report_label: SPAR report
code: https://github.com/implicit-personalization
poster: https://docs.google.com/presentation/d/1qphCwoW-cTKJP4Nj1yXUO_OxkB0yzcqfNSs5czGOkuY/view
slides: https://docs.google.com/presentation/d/1rfmxho99iahgwKHRj2MvYjVk0xDcWKvN3huGAxYRxz8/view
slides_label: Lightning talk slides
---

<img src="{{ '/assets/img/persona_icon_256.webp' | relative_url }}" alt="Implicit Personalization logo" width="32" height="32" style="height: 2rem; width: auto; vertical-align: middle; margin-bottom: 0.4rem;"> LLMs form internal representations of _who they're talking to_ (guesses about a user's age, expertise, political leaning, or values) and condition their responses on them. The work was carried out during a **[SPAR](https://sparai.org)** research fellowship with the [Implicit Personalization](https://github.com/implicit-personalization) group, and covered how those user models are encoded, whether they can be detected, and whether they can be steered.

{% include project_actions.liquid %}

## Codebases

Four connected codebases:

**`persona-data`**: Dataset utilities for **SynthPersona**: 1,000 synthetic personas × 788,000 QA rows (explicit + implicit, FRQ + MCQ) covering a range of demographic and ideological profiles. Released on the [HF Hub](https://huggingface.co/datasets/implicit-personalization/synth-persona) with leakage-aware train/test splits.

{% include figure.liquid path="assets/img/persona_vector_extraction.png" class="img-fluid rounded z-depth-1 my-3" alt="SynthPersona dataset overview" zoomable=true %}

**`persona-vectors`**: Extract per-persona hidden-state directions from LLMs (e.g. Gemma-2-27B-IT) using `nnsight` / `nnterp`, then use them for probing, PCA / UMAP analysis, and inference-time steering. Extracted vectors released on the Hub: [synth-persona-vectors](https://huggingface.co/datasets/implicit-personalization/synth-persona-vectors).

{% include figure.liquid path="assets/img/what_are_rich_persona_vectors.png" class="img-fluid rounded z-depth-1 my-3" alt="What are rich persona vectors" zoomable=true %}

**`persona-ui`**: A Streamlit app on [HF Spaces](https://huggingface.co/spaces/implicit-personalization/persona-ui) for chatting with persona-steered models, running extraction, training probes, and viewing the projections.

**`persona-2-lora`**: Experiments on Doc-to-LoRA testing whether LoRA adapters trained on persona biographies internalize persona attributes differently from biography prompting alone.
