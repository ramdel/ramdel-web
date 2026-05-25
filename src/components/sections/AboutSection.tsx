import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrappers';

export default function AboutSection() {
  const t = useTranslations('About');

  const highlights = [
    { title: t('highlight1_title'), desc: t('highlight1_desc') },
    { title: t('highlight2_title'), desc: t('highlight2_desc') },
    { title: t('highlight3_title'), desc: t('highlight3_desc') },
    { title: t('highlight4_title'), desc: t('highlight4_desc') },
  ];

  const experience = [
    {
      title: t('role1_title'),
      company: t('role1_company'),
      period: t('role1_period'),
      desc: t('role1_desc'),
      current: true,
    },
    {
      title: t('role2_title'),
      company: t('role2_company'),
      period: t('role2_period'),
      desc: t('role2_desc'),
      current: false,
    },
    {
      title: t('role3_title'),
      company: t('role3_company'),
      period: t('role3_period'),
      desc: t('role3_desc'),
      current: false,
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Bio + highlights */}
          <div>
            <FadeInUp>
              <p className="section-label mb-4">{t('section_label')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-6">
                {t('title')}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[0.9375rem]">
                {t('bio')}
              </p>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {highlights.map((h) => (
                <StaggerItem key={h.title} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{h.title}</div>
                    <div className="text-sm text-zinc-500 leading-snug mt-0.5">{h.desc}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Experience timeline */}
          <div>
            <FadeInUp>
              <p className="section-label mb-6">{t('exp_label')}</p>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {experience.map((role, i) => (
                <StaggerItem
                  key={i}
                  hover
                  className={`bg-card border rounded-2xl p-5 card-glow ${
                    role.current ? 'border-cyan-400/40' : 'border-zinc-800'
                  }`}
                >
                  {role.current && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                      </span>
                      <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">Current</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">{role.title}</div>
                      <div className="text-sm text-cyan-400">{role.company}</div>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono shrink-0 mt-0.5">{role.period}</div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{role.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
