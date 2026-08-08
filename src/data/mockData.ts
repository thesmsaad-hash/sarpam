import { Article, Author, AnalyticsData } from '../types';

export const mockAuthors: Record<string, Author> = {
  naga_scribe: {
    id: 'author-1',
    name: 'Aryavrat Sharma',
    title: 'Chief Scribe of Sacred Computing & AI Ethics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Researcher in Neuromorphic Architectures & Ancient Indian Geometry. Unearthing patterns that bridge 4,000-year-old manuscripts with quantum algorithms.',
    followers: 14200,
    following: 108,
    publishedCount: 34,
    verifiedSeal: true,
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      website: 'https://sarpam.org'
    },
    achievements: [
      {
        id: 'ach-1',
        title: 'Keeper of Serpent Codex',
        description: 'Authored over 25 verified ancient tech manuscripts.',
        icon: '📜',
        dateUnlocked: 'Jan 2026'
      },
      {
        id: 'ach-2',
        title: 'Sacred Geometrician',
        description: 'Demonstrated fractal pattern mapping in deep neural networks.',
        icon: '💠',
        dateUnlocked: 'May 2026'
      },
      {
        id: 'ach-3',
        title: '100k Sacred Claps',
        description: 'Received over 100,000 claps from modern seekers.',
        icon: '🐍',
        dateUnlocked: 'July 2026'
      }
    ]
  },
  kael_vance: {
    id: 'author-2',
    name: 'Dr. Maitreyi Varma',
    title: 'Quantum Cognitive Scientist & Philosopher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Exploring consciousness, Vedic logic systems, and non-linear memory frameworks in modern AI transformers.',
    followers: 9800,
    following: 89,
    publishedCount: 19,
    verifiedSeal: true,
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    achievements: [
      {
        id: 'ach-4',
        title: 'Philosopher Guardian',
        description: 'Pioneered consciousness comparative essays.',
        icon: '👁️',
        dateUnlocked: 'Mar 2026'
      }
    ]
  },
  dev_rishi: {
    id: 'author-3',
    name: 'Vikramaditya Roy',
    title: 'Systems Architect & Historian',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Building resilient high-frequency distributed consensus systems inspired by ancient temple architecture.',
    followers: 6400,
    following: 42,
    publishedCount: 12,
    verifiedSeal: false,
    socials: {
      github: 'https://github.com'
    }
  }
};

export const mockArticles: Article[] = [
  {
    id: 'art-deepseek-r1',
    slug: 'deepseek-r1-openai-o3-reasoning-model-breakthroughs',
    title: 'DeepSeek-R1 & OpenAI o3: Architectural Deep Dive into New Reasoning AI Models',
    subtitle: 'How test-time compute, chain-of-thought reinforcement learning, and Mixture-of-Experts (MoE) power new AI model releases.',
    summary: 'An architectural breakdown of new reasoning AI model releases (DeepSeek-R1 & OpenAI o3), examining reinforcement learning without supervised fine-tuning, cold-start data, and benchmark performance on SWE-bench and AIME 2024.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    category: 'AI Technology',
    subTheme: 'Reasoning & Agent Models',
    modelSpecs: {
      modelName: 'DeepSeek-R1 / OpenAI o3',
      modelVersion: 'v1.0 / 2026 Release',
      parameterCount: '671B MoE (37B Active)',
      licenseType: 'MIT Open Weights / Frontier API',
      benchmarkHighlight: 'AIME 2024: 79.8% | SWE-bench: 49.2%'
    },
    tags: ['DeepSeek R1', 'OpenAI o3', 'Reasoning Models', 'AI Model Release', 'Reinforcement Learning'],
    author: mockAuthors.naga_scribe,
    publishedAt: 'August 8, 2026',
    readTimeMinutes: 9,
    views: 58200,
    claps: 7420,
    audioDuration: '8 min 45 sec',
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    toc: [
      { id: 'reasoning-paradigm', text: '1. The Shift to Test-Time Compute Reasoning', level: 2 },
      { id: 'deepseek-rl', text: '2. Pure RL vs Cold-Start Distillation', level: 2 },
      { id: 'benchmark-matrix', text: '3. Model Release Benchmarks', level: 2 }
    ],
    content: `
> "The frontier of AI models is no longer defined solely by pre-training compute. New model versions achieve superhuman reasoning through dynamic test-time search." — *Sarpam AI Model Review*

## 1. The Shift to Test-Time Compute Reasoning

With the release of **DeepSeek-R1** and **OpenAI o3**, the AI paradigm has evolved. Traditional Large Language Models generated token predictions greedily. New reasoning AI model versions generate thousands of internal reasoning tokens (*Chain-of-Thought*) before emitting final answers.

![New AI Model Architecture & Latent Search](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80)

## 2. Pure RL vs Cold-Start Distillation

DeepSeek-R1 demonstrated that Group Relative Policy Optimization (GRPO) can induce complex mathematical self-correction without requiring human annotation:

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E} \left[ \frac{1}{G} \sum_{i=1}^G \min\left( \frac{\pi_\theta(q_i)}{\pi_{\text{old}}(q_i)} A_i, \text{clip}\left(\dots\right)A_i \right) \right]$$

### Model Version Comparison Matrix:
- **DeepSeek-R1 (Open Weights):** 671B parameter Mixture-of-Experts architecture with MIT license open weights.
- **OpenAI o3 (Frontier API):** High-compute inference version setting new SOTA records on competitive coding.
    `,
    comments: [
      {
        id: 'c-r1-1',
        authorName: 'Dr. Maitreyi Varma',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        content: 'Distilling DeepSeek-R1 reasoning trajectories into smaller 1.5B and 7B models is game-changing for open-source AI.',
        createdAt: '2 hours ago',
        claps: 92
      }
    ]
  },
  {
    id: 'art-gemini-llama',
    slug: 'gemini-2-llama-4-next-gen-multimodal-ai-models',
    title: 'Gemini 2.0 & Llama 4: Next-Gen Multimodal AI Model Releases & 10M Token Windows',
    subtitle: 'Exploring native audio-video processing, 405B parameter open weights, and long-context attention in new AI versions.',
    summary: 'A comprehensive benchmark analysis of new AI model versions (Gemini 2.0 Flash/Pro & Llama 4), evaluating real-time streaming, context recall, and tool-use agents.',
    coverImage: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1200&auto=format&fit=crop&q=80',
    category: 'AI Technology',
    subTheme: 'LLM Version Releases',
    modelSpecs: {
      modelName: 'Gemini 2.0 Flash / Llama 4',
      modelVersion: 'v2.0 / v4.0 Release',
      parameterCount: 'Multimodal / 405B',
      licenseType: 'Google API / Meta Community',
      benchmarkHighlight: 'Needle-in-a-Haystack: 99.8% at 10M tokens'
    },
    tags: ['Gemini 2.0', 'Llama 4', 'LLM Version Releases', 'Multimodal AI', 'Long Context'],
    author: mockAuthors.naga_scribe,
    publishedAt: 'August 6, 2026',
    readTimeMinutes: 8,
    views: 41900,
    claps: 5200,
    audioDuration: '7 min 40 sec',
    isFeatured: false,
    isTrending: true,
    isEditorsPick: true,
    content: `
## 1. Native Multimodal Audio & Vision Input

New model versions like **Gemini 2.0** process continuous audio and video natively rather than converting streams into speech-to-text transcripts first. This reduces latency down to 200ms for real-time AI voice agents.
    `,
    comments: []
  },
  {
    id: 'art-flux-sora',
    slug: 'flux-1-sora-generative-video-image-ai-models',
    title: 'Flux.1 & Sora: The Next Generation of Generative Image & Video AI Models',
    subtitle: 'Rectified flow transformers, diffusion forcing, and photorealistic video synthesis in new model releases.',
    summary: 'Dissecting rectified flow matching algorithms in Flux.1 and temporal spatio-temporal video latent transformers in Sora.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
    category: 'AI Technology',
    subTheme: 'Multimodal & Vision AI Models',
    modelSpecs: {
      modelName: 'Flux.1 Schnell / OpenAI Sora',
      modelVersion: 'v1.1 / Turbo Release',
      parameterCount: '12B Diffusion Transformer',
      licenseType: 'Apache 2.0 / Commercial API',
      benchmarkHighlight: 'Text Alignment Score: 94.2%'
    },
    tags: ['Flux.1', 'Sora', 'Generative AI', 'Diffusion Models', 'AI Vision'],
    author: mockAuthors.dev_rishi,
    publishedAt: 'August 3, 2026',
    readTimeMinutes: 7,
    views: 32400,
    claps: 4120,
    audioDuration: '6 min 30 sec',
    isFeatured: false,
    isTrending: true,
    isEditorsPick: false,
    content: `
## 1. Rectified Flow Matching vs Standard Diffusion

Flux.1 introduces straight-line velocity trajectory flows between Gaussian noise and target image data manifolds, allowing high quality outputs in 4 sampling steps.
    `,
    comments: []
  },
  {
    id: 'art-qwen-gemma',
    slug: 'qwen-2-5-gemma-2-open-source-ai-model-releases',
    title: 'Qwen 2.5 & Gemma 2: Open Source Model Releases Outperforming Closed API Models',
    subtitle: 'How 7B to 72B parameter open weight AI model versions achieve frontier coding & math benchmarks.',
    summary: 'Benchmarking new open-source AI model releases (Qwen 2.5 Coder & Gemma 2), highlighting fine-tuning recipes, quantization, and local deployment.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&auto=format&fit=crop&q=80',
    category: 'AI Technology',
    subTheme: 'Open Source AI Model Weights',
    modelSpecs: {
      modelName: 'Qwen 2.5-72B / Gemma 2-27B',
      modelVersion: 'v2.5 Release',
      parameterCount: '7B to 72B Parameters',
      licenseType: 'Apache 2.0 Open Weights',
      benchmarkHighlight: 'HumanEval: 86.4% | Math: 83.1%'
    },
    tags: ['Qwen 2.5', 'Gemma 2', 'Open Source AI', 'Local AI Models', 'Fine-Tuning'],
    author: mockAuthors.kael_vance,
    publishedAt: 'August 1, 2026',
    readTimeMinutes: 6,
    views: 28900,
    claps: 3640,
    audioDuration: '5 min 50 sec',
    isFeatured: false,
    isTrending: false,
    isEditorsPick: true,
    content: `
## 1. Open Source AI Model Dominance

The release of Qwen 2.5-Coder-32B proved that specialized open weight models can match GPT-4o on coding benchmarks while running locally on consumer RTX 4090 GPUs.
    `,
    comments: []
  }
];

export const mockCategoriesList = [
  'LLM Version Releases',
  'Multimodal & Vision AI Models',
  'Reasoning & Agent Models',
  'Open Source AI Model Weights',
  'Neuromorphic & On-Device AI',
  'AI Model Benchmark & Fine-Tuning'
] as const;

export const mockAnalytics: AnalyticsData = {
  totalViews: 84720,
  totalClaps: 14280,
  totalFollowers: 14200,
  totalEarningsCoins: 3840,
  monthlyViews: [
    { month: 'Jan', views: 4200 },
    { month: 'Feb', views: 7800 },
    { month: 'Mar', views: 11400 },
    { month: 'Apr', views: 16200 },
    { month: 'May', views: 21000 },
    { month: 'Jun', views: 29500 },
    { month: 'Jul', views: 42000 },
    { month: 'Aug', views: 84720 }
  ],
  topArticles: [
    { title: 'The Naga Codex: Decoding Sacred Geometry Inside Deep Neural Networks', views: 24890, claps: 3840, earnings: 1420 },
    { title: 'The Lost Palm-Leaf Algorithms of Medieval Kerala Mathematicians', views: 18230, claps: 2490, earnings: 980 },
    { title: 'Architecting 99.999% Uptime: Ancient Temple Foundations', views: 12400, claps: 1890, earnings: 640 },
    { title: 'Consciousness in Silicon: Where Vedic Metaphysics Meets AI', views: 31200, claps: 5120, earnings: 1800 }
  ]
};
