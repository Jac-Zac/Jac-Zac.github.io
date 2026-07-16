// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "Projects",
          description: "Research projects by Jacopo Zacchigna in mechanistic interpretability, machine learning, deep learning, and high-performance computing.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Peer-reviewed publications by Jacopo Zacchigna, with abstracts, full text, citation information, and links to publisher records.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum vitae of Jacopo Zacchigna, covering research, education, publications, technical skills, and professional experience.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-implicit-personalization",
          title: 'Implicit Personalization',
          description: "Detecting and attributing the user models that LLMs build implicitly during conversation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01_implicit_personalization/";
            },},{id: "projects-moe-interpretability",
          title: 'MoE Interpretability',
          description: "Reading MoE experts with sparse vocabulary directions and testing when specialization is real",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02_moe_interpretability/";
            },},{id: "projects-bayesianflow",
          title: 'BayesianFlow',
          description: "Pixel-wise uncertainty estimation in Flow Matching generative models via Last Layer Laplace Approximation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_bayesianflow/";
            },},{id: "projects-self-attention-kernels",
          title: 'Self-Attention Kernels',
          description: "Optimized causal multi-head self-attention in CUDA, OpenMP, and SIMD, reaching 1.09× naive PyTorch on A100",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_self_attention_kernels/";
            },},{id: "projects-lora-amp-dora-in-tinygrad",
          title: 'LoRA &amp;amp; DoRA in TinyGrad',
          description: "From-scratch Low-Rank Adaptation and Weight-Decomposed LoRA implemented in TinyGrad",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_lora_tinygrad/";
            },},{id: "projects-genetic-algorithms-for-neural-network-pruning",
          title: 'Genetic Algorithms for Neural-Network Pruning',
          description: "Evolving structured pruning masks for a FashionMNIST MLP while keeping its trained weights frozen",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_genetic_pruning/";
            },},{id: "projects-parallel-heat-stencil",
          title: 'Parallel Heat Stencil',
          description: "A hybrid MPI and OpenMP heat stencil scaled from one CPU core to multiple Leonardo nodes",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07_hpc_stencil/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%61%63%7A%61%63%32%30%30%32@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Jac-Zac", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jacopo-zacchigna", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=hUr0ypMAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
