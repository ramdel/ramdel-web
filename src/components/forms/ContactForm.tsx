'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/** Animated inline error beneath a field */
function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="mt-1 text-xs text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-sans';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={inputClass}
          placeholder={t('name_placeholder')}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={inputClass}
          placeholder={t('email_placeholder')}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('subject')}
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className={inputClass}
          placeholder={t('subject_placeholder')}
        />
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`${inputClass} resize-none`}
          placeholder={t('message_placeholder')}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Send button with press feedback */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
        className="w-full flex items-center justify-center px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-800 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
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
        {submitStatus === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-3 text-sm"
          >
            <CheckCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{t('success')}</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-sm"
          >
            <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{t('error')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
