import React, { useState } from 'react';
import { X, Send, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { articleService } from '../services/articleService';
import { BlogPost } from '../types/blog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDraftCreated: () => void;
}

export const N8nSimulatorModal: React.FC<Props> = ({ isOpen, onClose, onDraftCreated }) => {
  const [ingesting, setIngesting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleN8nPayload: Partial<BlogPost> = {
    title: 'Quantum Neural Attention Networks: Sub-Atomic Parameter Weights in LLMs',
    slug: `quantum-neural-attention-networks-${Date.now().toString().slice(-4)}`,
    excerpt: 'Autonomous n8n research synthesis on quantum state vectors applied to LLM transformer layer optimization.',
    content: `# Quantum Neural Attention Networks: Sub-Atomic Parameter Weights in LLMs

## Abstract
By encoding transformer token embeddings into superposed quantum state vectors, neural networks execute multi-head cross attention with exponential parallelism.

\`\`\`python
def quantum_attention_kernel(query_state, key_state):
    # Quantum superposition inner product
    return tensor_dot(query_state, key_state) / math.sqrt(d_model)
\`\`\`

## Empirical Verification
Our multi-agent verification pipeline confirmed 99.1% factual precision across ArXiv quantum physics benchmark papers.`,
    featured_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop',
    category: 'Research Papers',
    tags: ['Quantum AI', 'n8n Ingestion', 'Transformers', 'Physics'],
    reading_time: '6 min read',
    meta_title: 'Quantum Neural Attention Networks | Sarpam AI',
    meta_description: 'n8n automated research draft payload simulation.',
    source_url: 'https://arxiv.org/abs/2402.00099',
    research_sources: [
      {
        title: 'Quantum Superposition in Sequence Modeling',
        publisher: 'MIT Quantum AI Lab',
        url: 'https://arxiv.org/abs/2402.00099'
      }
    ],
    author: 'n8n Autonomous Agent Node #09',
    ai_model: 'DeepSeek-R1 & Claude 3.5 Sonnet',
    content_source: 'n8n',
    status: 'draft',
    published_at: null
  };

  const handleSimulateIngestion = async () => {
    setIngesting(true);
    setSuccessMsg(null);

    const res = await articleService.createArticle(sampleN8nPayload);
    setIngesting(false);

    if (res.success) {
      setSuccessMsg(`Draft "${sampleN8nPayload.title?.slice(0, 35)}..." successfully ingested!`);
      onDraftCreated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#5EEAD4]" />
            <h3 className="text-lg font-display font-bold text-white">
              Ingestion Pipeline Simulator
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#A1A1AA] mt-1">
          Simulates sending a completed AI research draft payload via <code className="text-[#5EEAD4]">POST /functions/v1/import-article</code>.
        </p>

        <div className="p-3 rounded-xl bg-[#09090B] border border-white/10 font-mono text-[11px] text-teal-200/90 overflow-x-auto max-h-[220px]">
          <pre>{JSON.stringify(sampleN8nPayload, null, 2)}</pre>
        </div>

        {successMsg && (
          <div className="p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="pt-2 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#A1A1AA]">
            Close
          </button>
          <button
            onClick={handleSimulateIngestion}
            disabled={ingesting}
            className="px-5 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-mono font-bold hover:bg-[#14B8A6] flex items-center gap-2 shadow-emerald-glow"
          >
            {ingesting ? (
              <span>Ingesting Draft...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Trigger Ingestion POST</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
