import type { ContactSource } from './analytics';

export const OPEN_CONTACT_EVENT = 'lain-open-contact';

export function openContactFromSection() {
  window.dispatchEvent(new CustomEvent<ContactSource>(OPEN_CONTACT_EVENT, {
    detail: 'contact_section',
  }));
}
