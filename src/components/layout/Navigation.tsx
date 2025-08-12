'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Monitor, Globe, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('projects'), href: '/projects' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-terminal-black/90 backdrop-blur-md border-b border-terminal-green/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-terminal-green hover:text-terminal-cyan transition-colors"
          >
            <Monitor className="h-6 w-6" />
            <span className="font-bold text-lg glow-text">ramdel.dev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`terminal-prompt text-sm transition-colors hover:text-terminal-cyan ${
                  pathname === item.href ? 'text-terminal-cyan' : 'text-terminal-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-terminal-green hover:text-terminal-cyan transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-terminal-green/30">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`terminal-prompt text-sm transition-colors hover:text-terminal-cyan ${
                    pathname === item.href ? 'text-terminal-cyan' : 'text-terminal-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}