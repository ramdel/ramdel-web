import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrappers';

export default function CaseStudiesSection() {
  const t = useTranslations('CaseStudies');
  const locale = useLocale();

  const caseStudies = [
    {
      slug: 'aws-security-transformation',
      category: t('cs1_category'),
      title: t('cs1_title'),
      subtitle: t('cs1_subtitle'),
      desc: t('cs1_desc'),
      metrics: [
        { value: t('cs1_m1_value'), label: t('cs1_m1_label') },
        { value: t('cs1_m2_value'), label: t('cs1_m2_label') },
        { value: t('cs1_m3_value'), label: t('cs1_m3_label') },
      ],
    },
    {
      slug: 'aws-cost-optimization',
      category: t('cs2_category'),
      title: t('cs2_title'),
      subtitle: t('cs2_subtitle'),
      desc: t('cs2_desc'),
      metrics: [
        { value: t('cs2_m1_value'), label: t('cs2_m1_label') },
        { value: t('cs2_m2_value'), label: t('cs2_m2_label') },
        { value: t('cs2_m3_value'), label: t('cs2_m3_label') },
      ],
    },
    {
      slug: 'cicd-security-pipeline',
      category: t('cs3_category'),
      title: t('cs3_title'),
      subtitle: t('cs3_subtitle'),
      desc: t('cs3_desc'),
      metrics: [
        { value: t('cs3_m1_value'), label: t('cs3_m1_label') },
        { value: t('cs3_m2_value'), label: t('cs3_m2_label') },
        { value: t('cs3_m3_value'), label: t('cs3_m3_label') },
      ],
    },
    {
      slug: 'ai-agent-platform',
      category: t('cs4_category'),
      title: t('cs4_title'),
      subtitle: t('cs4_subtitle'),
      desc: t('cs4_desc'),
      metrics: [
        { value: t('cs4_m1_value'), label: t('cs4_m1_label') },
        { value: t('cs4_m2_value'), label: t('cs4_m2_label') },
        { value: t('cs4_m3_value'), label: t('cs4_m3_label') },
      ],
    },
    {
      slug: 'compliance-transformation',
      category: t('cs5_category'),
      title: t('cs5_title'),
      subtitle: t('cs5_subtitle'),
      desc: t('cs5_desc'),
      metrics: [
        { value: t('cs5_m1_value'), label: t('cs5_m1_label') },
        { value: t('cs5_m2_value'), label: t('cs5_m2_label') },
        { value: t('cs5_m3_value'), label: t('cs5_m3_label') },
      ],
    },
  ];

  return (
    <section id="case-studies" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInUp>
          <p className="section-label mb-4">{t('section_label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
            {t('title')}
          </h2>
          <p className="text-zinc-500 text-[0.9375rem] mb-12 max-w-2xl">
            {t('subtitle')}
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs) => (
            <StaggerItem
              key={cs.slug}
              hover
              className="bg-card border border-zinc-800 rounded-2xl p-6 flex flex-col card-glow"
            >
              {/* Category */}
              <p className="section-label mb-3">{cs.category}</p>

              {/* Title & subtitle */}
              <h3 className="text-base font-semibold text-zinc-100 mb-1 leading-snug">
                {cs.title}
              </h3>
              <p className="text-xs text-cyan-400 mb-3">{cs.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-zinc-500 leading-relaxed mb-5 flex-1">
                {cs.desc}
              </p>

              {/* Metrics */}
              <div className="flex items-start divide-x divide-zinc-800 border-y border-zinc-800 py-4 mb-5">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="flex-1 px-3 first:pl-0 last:pr-0 text-center">
                    <div
                      className="font-bold font-mono text-cyan-400 leading-tight"
                      style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1.25rem)' }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[0.65rem] text-zinc-600 leading-snug mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Link */}
              <Link
                href={`/${locale}/case-studies/${cs.slug}`}
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                {t('read_more')}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
