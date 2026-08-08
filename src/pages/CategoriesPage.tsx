import React from 'react';
import { ChevronRight, BookOpen, Cpu, Code, Bot, Microscope, Eye, Sparkles, Rocket, Terminal } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';

interface Props {
  articles: BlogPost[];
  onSelectCategory: (category: string) => void;
}

interface CategoryInfo {
  name: BlogCategory;
  description: string;
  icon: React.ReactNode;
}

const CATEGORY_DEFINITIONS: CategoryInfo[] = [
  {
    name: 'LLMs',
    description: 'Frontier transformer architectures, reasoning models, tree search inference, and token compute benchmarks.',
    icon: <Cpu className="w-6 h-6 text-[#5EEAD4]" />
  },
  {
    name: 'AI Agents',
    description: 'Autonomous multi-agent orchestration, state machines, conflict resolution, and background agent networks.',
    icon: <Bot className="w-6 h-6 text-[#D4AF37]" />
  },
  {
    name: 'Open Source',
    description: 'Open-weights models (DeepSeek, Llama), vLLM GPU inference scaling, and on-premise AI privacy guarantees.',
    icon: <Code className="w-6 h-6 text-[#10B981]" />
  },
  {
    name: 'Robotics',
    description: 'Embodied AI, spatial vision-language-action (VLA) transformers, and real-time physical motor dexterity.',
    icon: <Terminal className="w-6 h-6 text-[#5EEAD4]" />
  },
  {
    name: 'Research Papers',
    description: 'Mathematical proofs, state space sequence models (Mamba), linear attention, and optimization functions.',
    icon: <Microscope className="w-6 h-6 text-[#D4AF37]" />
  },
  {
    name: 'Computer Vision',
    description: '3D Gaussian Splatting, zero-shot monocular depth estimation, spatial neural fields, and real-time rendering.',
    icon: <Eye className="w-6 h-6 text-[#5EEAD4]" />
  },
  {
    name: 'Generative AI',
    description: 'Diffusion Transformers (DiT), spatial-temporal patch latent video synthesis, and generative visual physics.',
    icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />
  },
  {
    name: 'Startups',
    description: 'AI infrastructure playbooks, decoupled neural architecture, and scaling autonomous media platforms.',
    icon: <Rocket className="w-6 h-6 text-[#10B981]" />
  },
  {
    name: 'Tutorials',
    description: 'Developer step-by-step guides for constructing neural pipelines, high-speed knowledge vaults, and agent workflows.',
    icon: <BookOpen className="w-6 h-6 text-[#5EEAD4]" />
  }
];

export const CategoriesPage: React.FC<Props> = ({ articles, onSelectCategory }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D4AF37]">
          Research Taxonomy
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#F8FAFC]">
          Artificial Intelligence Disciplines
        </h1>
        <p className="text-base text-[#A1A1AA]">
          Browse published scientific papers categorized by specialization and underlying model architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORY_DEFINITIONS.map((cat) => {
          const count = articles.filter(a => a.category.toLowerCase() === cat.name.toLowerCase()).length;
          return (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#0F766E]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#09090B] border border-white/10 group-hover:border-[#0F766E]/50 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/30">
                    {count} Papers
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors mb-2">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#D4AF37] group-hover:text-white">
                <span>View Category Papers</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
