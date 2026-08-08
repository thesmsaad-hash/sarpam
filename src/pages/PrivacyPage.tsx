import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0F766E] uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Editorial Policies</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#A1A1AA]">
          Last Updated: February 2026 • Sarpam Research Platform
        </p>
      </div>

      <div className="space-y-6 text-[#CBD5E1] text-sm sm:text-base leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">1. Read-Only Nature of Sarpam</h2>
          <p>
            Sarpam operates strictly as a read-only publication website. We do not collect user credentials, personal profile data, passwords, or payment details, as the website has no user authentication or account creation functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">2. Local Storage & Bookmarks</h2>
          <p>
            When you bookmark an article or save reading preferences, these settings are saved locally in your browser's <code className="text-[#5EEAD4]">localStorage</code>. They are never transmitted to our servers or third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">3. Analytics & Telemetry</h2>
          <p>
            We prioritize reader privacy. Any public article metrics (such as aggregate article view counts) are incremented anonymously at the database layer without tracking individual IP addresses or personal identifiers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">4. External Citations</h2>
          <p>
            Articles published on Sarpam contain links to research repositories such as ArXiv, IEEE, and GitHub. Accessing external citations opens links in a new browser tab subject to the respective external platform's privacy policy.
          </p>
        </section>
      </div>
    </div>
  );
};
