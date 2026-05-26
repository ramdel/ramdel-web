'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't made a choice yet
    if (!localStorage.getItem('analytics-consent')) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'accepted');
    setVisible(false);
    window.dispatchEvent(new Event('analytics-consent-granted'));
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="fixed bottom-5 left-4 right-4 md:left-auto md:right-6 md:w-[380px] z-50"
          role="dialog"
          aria-label={t('title')}
        >
          <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl p-5 shadow-2xl shadow-black/60">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-zinc-800 rounded-lg">
                <Cookie className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-100">{t('title')}</p>
            </div>

            {/* Message */}
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              {t('message')}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-cyan-400 text-zinc-900 text-xs font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
              >
                {t('accept')}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                {t('decline')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
