'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { trackContactEvent, type ContactSource } from '@/lib/analytics';

type ContactFormData = { name: string; email: string; subject: string; message: string };

/** Animated inline error beneath a field */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          id={id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="contact-field-error mt-1 text-xs text-red-400"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm({ source = 'menu' }: { source?: ContactSource }) {
  const t = useTranslations('Contact');
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'local' | 'error'>('idle');

  const contactSchema = z.object({
    name: z.string().min(2, t('name_error')),
    email: z.string().email(t('email_error')),
    subject: z.string().min(5, t('subject_error')),
    message: z.string().min(10, t('message_error')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result: { delivered?: boolean } = await response.json();
        const outcome = result.delivered === true ? 'sent' : 'local_only';
        setSubmitStatus(result.delivered === true ? 'success' : 'local');
        trackContactEvent('contact_submit', source, outcome);
        reset();
      } else {
        setSubmitStatus('error');
        trackContactEvent('contact_submit', source, 'failed');
      }
    } catch {
      setSubmitStatus('error');
      trackContactEvent('contact_submit', source, 'failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-sans';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form space-y-4">
      <div>
        <label htmlFor={`${formId}-name`} className="contact-label block text-sm font-medium text-zinc-300 mb-1.5">
          {t('name')}
        </label>
        <input
          type="text"
          id={`${formId}-name`}
          {...register('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={`contact-field ${inputClass}`}
          placeholder={t('name_placeholder')}
        />
        <FieldError id={`${formId}-name-error`} message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="contact-label block text-sm font-medium text-zinc-300 mb-1.5">
          {t('email')}
        </label>
        <input
          type="email"
          id={`${formId}-email`}
          {...register('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={`contact-field ${inputClass}`}
          placeholder={t('email_placeholder')}
        />
        <FieldError id={`${formId}-email-error`} message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor={`${formId}-subject`} className="contact-label block text-sm font-medium text-zinc-300 mb-1.5">
          {t('subject')}
        </label>
        <input
          type="text"
          id={`${formId}-subject`}
          {...register('subject')}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
          className={`contact-field ${inputClass}`}
          placeholder={t('subject_placeholder')}
        />
        <FieldError id={`${formId}-subject-error`} message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="contact-label block text-sm font-medium text-zinc-300 mb-1.5">
          {t('message')}
        </label>
        <textarea
          id={`${formId}-message`}
          rows={4}
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={`contact-field ${inputClass} resize-none`}
          placeholder={t('message_placeholder')}
        />
        <FieldError id={`${formId}-message-error`} message={errors.message?.message} />
      </div>

      {/* Send button with press feedback */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
        className="contact-submit w-full flex items-center justify-center px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-800 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            {t('send')}
          </>
        )}
      </motion.button>

      {/* Submit status banners */}
      <AnimatePresence>
        {(submitStatus === 'success' || submitStatus === 'local') && (
          <motion.div
            key={submitStatus}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="contact-status contact-status-success flex items-center text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-3 text-sm"
            role="status"
          >
            <CheckCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{t(submitStatus === 'local' ? 'local_success' : 'success')}</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="contact-status contact-status-error flex items-center text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-sm"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{t('error')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
