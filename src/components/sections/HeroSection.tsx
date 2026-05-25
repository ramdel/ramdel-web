import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Github, Linkedin, MapPin } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrappers';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  const metrics = [
    { value: t('metric1_value'), label: t('metric1_label') },
    { value: t('metric2_value'), label: t('metric2_label') },
    { value: t('metric3_value'), label: t('metric3_label') },
    { value: t('metric4_value'), label: t('metric4_label') },
  ];

  return (
    <section id="hero" className="grid-bg min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        {/* Available badge */}
        <FadeInUp>
          <div className="flex items-center gap-2 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-zinc-400">{t('available')}</span>
            <span className="text-zinc-700 mx-1">·</span>
            <span className="flex items-center gap-1 text-sm text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              {t('location')}
            </span>
          </div>
        </FadeInUp>

        {/* Name */}
        <FadeInUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-5">
            <span className="gradient-text">Mario</span>{' '}
            <span className="text-zinc-100">de Jesus</span>
          </h1>
        </FadeInUp>

        {/* Tagline */}
        <FadeInUp delay={0.2}>
          <p className="text-lg md:text-xl text-zinc-400 font-mono mb-6 tracking-wide">
            {t('tagline')}
          </p>
        </FadeInUp>

        {/* Description */}
        <FadeInUp delay={0.3}>
          <p className="max-w-xl text-zinc-500 text-base leading-relaxed mb-10">
            {t('description')}
          </p>
        </FadeInUp>

        {/* CTAs */}
        <FadeInUp delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href={`/${locale}/#case-studies`}
              className="px-6 py-3 bg-cyan-400 text-zinc-900 font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors"
            >
              {t('cta_work')}
            </a>
            <a
              href="https://github.com/ramdel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ramdel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </FadeInUp>

        {/* Metrics grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <StaggerItem key={metric.label} hover className="bg-card border border-zinc-800 rounded-2xl p-5 card-glow">
              <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400 mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-zinc-500 leading-snug">{metric.label}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
