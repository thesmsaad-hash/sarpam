import React, { useState } from 'react';
import { Save, Clock, CheckCircle2, XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { ArticleRenderer } from '../components/ArticleRenderer';

interface Props {
  article: Partial<BlogPost>;
  onSaveDraft: (article: Partial<BlogPost>) => void;
  onMoveToReview: (articleId: string) => void;
  onReject: (articleId: string, reason: string) => void;
  onApproveAndPublish: (articleId: string) => void;
  onBackToEdit: () => void;
}

export const AdminPreview: React.FC<Props> = ({
  article,
  onSaveDraft,
  onMoveToReview,
  onReject,
  onApproveAndPublish,
  onBackToEdit
}) => {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [confirmPublishModal, setConfirmPublishModal] = useState(false);

  const handleConfirmReject = () => {
    if (article.id && reason) {
      onReject(article.id, reason);
      setRejecting(false);
    }
  };

  const handleConfirmPublish = () => {
    if (article.id) {
      onApproveAndPublish(article.id);
      setConfirmPublishModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      
      {/* Editorial Control Toolbar Header */}
      <div className="sticky top-20 z-30 glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <button
          onClick={onBackToEdit}
          className="text-xs font-mono text-[#A1A1AA] hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Form Editor</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => onSaveDraft(article)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
          >
            Save Draft
          </button>

          {article.status !== 'review' && article.status !== 'published' && (
            <button
              onClick={() => article.id && onMoveToReview(article.id)}
              className="px-4 py-2 rounded-xl bg-[#5EEAD4]/20 border border-[#5EEAD4]/40 text-[#5EEAD4] hover:bg-[#5EEAD4]/30 transition-colors"
            >
              Move to Review
            </button>
          )}

          <button
            onClick={() => setRejecting(true)}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Reject Paper
          </button>

          <button
            onClick={() => setConfirmPublishModal(true)}
            className="px-6 py-2 rounded-xl bg-[#0F766E] text-white font-semibold hover:bg-[#14B8A6] transition-colors shadow-emerald-glow flex items-center gap-1.5 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Approve & Publish</span>
          </button>
        </div>
      </div>

      {/* Reject Reason Prompt */}
      {rejecting && (
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3 font-mono">
          <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Provide Rejection Reason</span>
          </h4>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Factual inconsistency in equation (3), insufficient ArXiv sources..."
            className="w-full p-3 rounded-xl bg-[#09090B] border border-white/10 text-xs text-white focus:outline-none"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setRejecting(false)} className="px-3 py-1.5 rounded bg-white/5 text-xs text-[#A1A1AA]">
              Cancel
            </button>
            <button onClick={handleConfirmReject} className="px-4 py-1.5 rounded bg-red-500 text-white text-xs font-bold">
              Confirm Rejection
            </button>
          </div>
        </div>
      )}

      {/* Publish Confirmation Modal */}
      {confirmPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-[#0F766E]/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E]/20 text-[#5EEAD4] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">Confirm Article Publication</h3>
                <p className="text-xs font-mono text-[#A1A1AA]">Executes approve_and_publish_article RPC</p>
              </div>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              This will set <code className="text-[#5EEAD4]">status = 'published'</code> and update <code className="text-[#D4AF37]">published_at = NOW()</code>. The article will instantly become visible on the public Sarpam website.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setConfirmPublishModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-[#A1A1AA]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPublish}
                className="px-6 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-mono font-bold hover:bg-[#14B8A6] shadow-emerald-glow"
              >
                Approve & Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Visual Article Renderer */}
      <ArticleRenderer article={article as BlogPost} isPreview={true} />

    </div>
  );
};
