'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
      // Simulated form submission - replace with actual API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-terminal-white mb-2">
          {t('name')} *
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-3 py-2 bg-terminal-black border border-terminal-green/30 rounded-md text-terminal-white placeholder-terminal-gray focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-terminal-white mb-2">
          {t('email')} *
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full px-3 py-2 bg-terminal-black border border-terminal-green/30 rounded-md text-terminal-white placeholder-terminal-gray focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-terminal-white mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className="w-full px-3 py-2 bg-terminal-black border border-terminal-green/30 rounded-md text-terminal-white placeholder-terminal-gray focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          placeholder="DevSecOps opportunity, collaboration, etc."
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-terminal-white mb-2">
          {t('message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full px-3 py-2 bg-terminal-black border border-terminal-green/30 rounded-md text-terminal-white placeholder-terminal-gray focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green resize-vertical"
          placeholder="Tell me about the opportunity, project, or how we can collaborate..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-4 py-3 bg-terminal-green text-terminal-black font-semibold rounded-md hover:bg-terminal-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-terminal-black mr-2"></div>
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            {t('send')}
          </>
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="flex items-center text-terminal-green bg-terminal-green/10 border border-terminal-green/30 rounded-md p-3">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{t('success')}</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center text-red-400 bg-red-400/10 border border-red-400/30 rounded-md p-3">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{t('error')}</span>
        </div>
      )}
    </form>
  );
}