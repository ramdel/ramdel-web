'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'fr', name: 'FR', flag: '🇨🇦' },
    { code: 'es', name: 'ES', flag: '🇲🇽' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-terminal-green hover:text-terminal-cyan transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 top-8 w-32 bg-terminal-dark border border-terminal-green/30 rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-terminal-green/10 transition-colors flex items-center space-x-2 ${
              locale === lang.code ? 'text-terminal-cyan' : 'text-terminal-white'
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