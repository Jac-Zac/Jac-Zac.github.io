---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* M.S. in Data Science and Artificial Intelligence, University of Trieste, 2024-ongoing
  * Focus: Machine Learning, Bayesian Statistics, Parallel Computing
* B.S. in Artificial Intelligence and Data Analytics, University of Trieste, 2022-2024
  * Thesis: _Toward automated extraction of metadata from herbarium specimen labels_

Work experience
======
* May 2024 - Jan 2025: AI Consultant
  * Obloo
  * Duties: Designed foundational GenAI Retrieval-Augmented Generation (RAG) systems, guided development of machine learning solutions, mentored interns
  * Focus: GenAI, RAG systems, ML solutions
  
Skills
======
* Programming Languages
  * Python, C/C++, Bash
* Machine Learning & AI
  * PyTorch, Deep Learning
  * Bayesian Methods
  * Computer Vision
  * Natural Language Processing
* Tools & Technologies
  * MPI, Slurm (Parallel Computing)
  * Git, Docker
  * Data Science & Statistical Analysis

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Research Projects: BayesianFlow project applying Bayesian inference to generative models
* Professional mentoring of interns in AI and machine learning
