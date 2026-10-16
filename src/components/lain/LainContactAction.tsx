'use client';

import { ArrowRight } from 'lucide-react';
import { openContactFromSection } from '@/lib/contactEvents';

export default function LainContactAction({ label }: { label: string }) {
  return (
    <button type="button" className="lain-contact-action" data-contact-source="contact_section" onClick={openContactFromSection}>
      <span>{label}</span>
      <ArrowRight size={20} aria-hidden="true" />
    </button>
  );
}
