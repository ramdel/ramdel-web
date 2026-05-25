'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
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
      <button className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors text-xs">
        <Globe className="h-3.5 w-3.5" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      <div className="absolute right-0 bottom-full mb-1 w-28 bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 shadow-xl z-50">
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
