'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import ContactDrawer from '@/components/ui/ContactDrawer';
import ContactForm from '@/components/forms/ContactForm';

function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'fr', name: 'FR', flag: '🇨🇦' },
    { code: 'es', name: 'ES', flag: '🇲🇽' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors text-sm">
        <Globe className="h-3.5 w-3.5" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      <div className="absolute right-0 top-7 w-28 bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 shadow-xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 transition-colors hover:bg-zinc-800 ${
              locale === lang.code ? 'text-cyan-400' : 'text-zinc-300'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);         // desktop drawer only
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false); // mobile inline form
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('about'), href: `/${locale}/#about` },
    { name: t('skills'), href: `/${locale}/#skills` },
    { name: t('work'), href: `/${locale}/#case-studies` },
  ];

  // Desktop: toggles the floating drawer
  const handleSayHello = () => {
    setIsDrawerOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  // Mobile: toggles the inline form — completely independent from the desktop drawer
  // so ContactDrawer never receives isOpen=true on mobile and never registers its
  // document-level mousedown listener against the mobile form's inputs.
  const handleSayHelloMobile = () => {
    setIsMobileFormOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0a0a]'
      } border-b border-zinc-800/60`}
    >
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}/`}
            className="text-zinc-100 font-semibold text-base hover:text-cyan-400 transition-colors"
          >
            ramdel<span className="text-cyan-400">.dev</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side: lang + say hello (with drawer anchored here) */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSelector />

            {/* Say Hello button + panel anchored to this wrapper */}
            <div className="relative">
              <button
                onClick={handleSayHello}
                data-contact-trigger
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-none border-b-2 ${
                  isDrawerOpen
                    ? 'text-zinc-900 bg-zinc-100 border-zinc-100'
                    : 'text-zinc-100 bg-zinc-900 border-zinc-700 hover:border-cyan-400 hover:text-cyan-400'
                }`}
              >
                {t('say_hello')}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isDrawerOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Panel anchored to right edge of button */}
              <ContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsMobileFormOpen(false);
              }}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-2 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleSayHelloMobile}
              className="w-full mt-2 text-left px-2 py-2.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {t('say_hello')} ↓
            </button>
          </div>
        )}
      </nav>

      {/* Mobile contact form — inline below mobile menu */}
      {isMobileFormOpen && (
        <div className="md:hidden border-t border-zinc-800 px-6 py-6">
          <p className="text-sm font-medium text-zinc-200 mb-4">
            {t('say_hello')}
          </p>
          <ContactForm />
        </div>
      )}
    </header>
  );
}
