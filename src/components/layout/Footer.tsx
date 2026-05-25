import { Github, Linkedin, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import LanguageSelector from './LanguageSelector';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-zinc-800/60 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Left: brand + location */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-semibold text-zinc-300">
              ramdel<span className="text-cyan-400">.dev</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-600">
              <MapPin className="h-3 w-3" />
              {t('location')}
            </span>
          </div>

          {/* Center: socials + upwork */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/ramdel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ramdel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~ramdel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              {t('upwork')}
            </a>
          </div>

          {/* Right: lang selector + copyright */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <LanguageSelector />
            <span className="text-xs text-zinc-700">
              © {currentYear} {t('copyright')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
