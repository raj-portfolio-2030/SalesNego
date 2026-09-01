import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E1E1E1] relative text-[#191919]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#606060] hover:text-[#000229] hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-[#000229]">
              SalesNego Privacy Policy
            </h2>
            <p className="text-xs text-[#808080] font-mono">Last updated: September 2026</p>
            <div className="space-y-3 text-sm text-[#606060] leading-relaxed">
              <p>
                SalesNego (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website https://salesnego.com/. We are committed to safeguarding and respecting your business data and personal privacy.
              </p>
              <h3 className="text-base font-bold text-[#000229]">Information We Collect</h3>
              <p>
                When you inquire about commercial execution partnerships, we collect contact information including your name, corporate business email, company details, product information, and growth objectives.
              </p>
              <h3 className="text-base font-bold text-[#000229]">How We Use Your Information</h3>
              <p>
                Information provided is strictly used to evaluate commercial partnership feasibility, prepare consultative discovery briefings, and communicate directly regarding commercial services.
              </p>
              <h3 className="text-base font-bold text-[#000229]">Data Confidentiality</h3>
              <p>
                We do not sell, rent, or trade your commercial inquiries or contact data to third parties. All discussions can be governed by mutual Non-Disclosure Agreements (NDA) upon request.
              </p>
              <p>
                For questions regarding data practices, contact us at{' '}
                <a href="mailto:sales@salesnego.com" className="text-[#103CE7] font-semibold underline">
                  sales@salesnego.com
                </a>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-[#000229]">
              SalesNego Terms of Engagement
            </h2>
            <p className="text-xs text-[#808080] font-mono">Last updated: September 2026</p>
            <div className="space-y-3 text-sm text-[#606060] leading-relaxed">
              <p>
                Welcome to SalesNego. By accessing https://salesnego.com/ or engaging with our commercial team, you agree to the following terms and guidelines.
              </p>
              <h3 className="text-base font-bold text-[#000229]">Commercial Advisory & Execution Scope</h3>
              <p>
                SalesNego provides founder-led commercial strategy, Revenue Operations infrastructure, and commercial execution. Engagement scopes, milestones, retainers, and performance agreements are formally defined within individual Statements of Work (SOW).
              </p>
              <h3 className="text-base font-bold text-[#000229]">Intellectual Property</h3>
              <p>
                All brand marks, proprietary methodology frameworks, visual workflows, and website content are the property of SalesNego. Client data, CRM assets, and strategic playbooks created during client engagements remain the property of the respective client as specified in their commercial agreement.
              </p>
              <h3 className="text-base font-bold text-[#000229]">Inquiries</h3>
              <p>
                For formal contractual queries, please contact{' '}
                <a href="mailto:sales@salesnego.com" className="text-[#103CE7] font-semibold underline">
                  sales@salesnego.com
                </a>.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#E1E1E1] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#000229] text-white text-xs font-bold hover:bg-[#103CE7] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
