'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import ContactForm from '@/components/forms/ContactForm';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const t = useTranslations('Contact');
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside (excluding the trigger button via data-contact-trigger)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !target.closest('[data-contact-trigger]')
      ) {
        onClose();
      }
    };
    if (isOpen) {
      const timer = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    /*
     * fixed positioning avoids backdrop-filter containing-block issues.
     * top-16 = nav height (h-16). right-6 matches the nav's px-6 padding.
     */
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="absolute top-[calc(100%+14px)] right-0 z-50 w-[380px] bg-[#0f0f0f] border border-zinc-800 rounded-xl shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Title bar */}
          <div className="px-6 pt-6 pb-4 border-b border-zinc-800/60">
            <p className="text-sm font-medium text-zinc-200">{t('drawer_title')}</p>
          </div>

          {/* Form */}
          <div className="px-6 py-5">
            <ContactForm />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
