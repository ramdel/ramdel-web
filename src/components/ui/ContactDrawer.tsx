'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import ContactForm from '@/components/forms/ContactForm';
import type { ContactSource } from '@/lib/analytics';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  source: ContactSource;
  placement?: 'navigation' | 'button';
}

export default function ContactDrawer({ isOpen, onClose, source, placement = 'navigation' }: ContactDrawerProps) {
  const t = useTranslations('Contact');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) panelRef.current?.querySelector('input')?.focus();
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        const trigger = Array.from(document.querySelectorAll<HTMLElement>(`[data-contact-source="${source}"]`))
          .find((element) => element.getClientRects().length > 0);
        trigger?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, source]);

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
    /* The single panel is anchored to the sticky header on both viewports. */
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="contact-panel"
          role="dialog"
          aria-label={t('drawer_title')}
          ref={panelRef}
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className={`contact-drawer absolute top-[calc(100%+14px)] z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto bg-[#0f0f0f] border border-zinc-800 rounded-xl shadow-2xl shadow-black/60 ${placement === 'button' ? 'right-0 w-[380px]' : 'right-6 w-[min(380px,calc(100vw-2rem))]'}`}
        >
          {/* Title bar */}
          <div className="contact-drawer-heading px-6 pt-6 pb-4 border-b border-zinc-800/60">
            <p className="text-sm font-medium text-zinc-200">{t('drawer_title')}</p>
          </div>

          {/* Form */}
          <div className="px-6 py-5">
            <ContactForm source={source} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
