import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrappers';
import LainExperienceMotion from '@/components/lain/LainExperienceMotion';

export default function AboutSection({ sectionLabel, variant = 'default' }: { sectionLabel?: string; variant?: 'default' | 'lain' } = {}) {
  const t = useTranslations('About');
  const isLain = variant === 'lain';

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
    <section id="about" className={isLain ? 'lain-about' : 'py-24 border-t border-zinc-800/60'}>
      <div className={isLain ? 'lain-container' : 'max-w-6xl mx-auto px-6'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Bio + highlights */}
          <div>
            <FadeInUp>
              <p className={isLain ? 'lain-kicker' : 'section-label mb-4'}>{sectionLabel ?? t('section_label')}</p>
              <h2 className={isLain ? 'lain-about-heading' : 'text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-6'}>
                {t('title')}
              </h2>
              <p className={isLain ? 'lain-about-bio' : 'text-zinc-400 leading-relaxed mb-8 text-[0.9375rem]'}>
                {t('bio')}
              </p>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {highlights.map((h) => (
                <StaggerItem key={h.title} className="flex gap-3">
                  <CheckCircle2 className={isLain ? 'lain-highlight-icon h-5 w-5 shrink-0 mt-0.5' : 'h-5 w-5 text-cyan-400 shrink-0 mt-0.5'} />
                  <div>
                    <div className={isLain ? 'lain-highlight-title' : 'text-sm font-medium text-zinc-200'}>{h.title}</div>
                    <div className={isLain ? 'lain-highlight-copy' : 'text-sm text-zinc-500 leading-snug mt-0.5'}>{h.desc}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Experience timeline */}
          <div>
            <FadeInUp>
              <p className={isLain ? 'lain-kicker lain-experience-label' : 'section-label mb-6'}>{t('exp_label')}</p>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {experience.map((role, i) => {
                const content = <>
                  {role.current && (
                    <div className={isLain ? 'lain-experience-current' : 'flex items-center gap-1.5 mb-3'}>
                      <span className={isLain ? 'lain-experience-dot' : 'relative flex h-2 w-2'}>
                        {!isLain && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>}
                        {!isLain && <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>}
                      </span>
                      <span className={isLain ? 'lain-experience-status' : 'text-xs text-cyan-400 font-medium uppercase tracking-wider'}>Current</span>
                    </div>
                  )}
                  <div className={isLain ? 'lain-experience-top' : 'flex items-start justify-between gap-4 mb-2'}>
                    <div>
                      <div className={isLain ? 'lain-experience-title' : 'text-sm font-semibold text-zinc-100'}>{role.title}</div>
                      <div className={isLain ? 'lain-experience-company' : 'text-sm text-cyan-400'}>{role.company}</div>
                    </div>
                    <div className={isLain ? 'lain-experience-period' : 'text-xs text-zinc-500 font-mono shrink-0 mt-0.5'}>{role.period}</div>
                  </div>
                  <p className={isLain ? 'lain-experience-description' : 'text-sm text-zinc-500 leading-relaxed'}>{role.desc}</p>
                </>;

                return (
                  <StaggerItem
                    key={i}
                    hover={!isLain}
                    className={isLain ? undefined : `bg-card border rounded-2xl p-5 card-glow ${role.current ? 'border-cyan-400/40' : 'border-zinc-800'}`}
                  >
                    {isLain ? <LainExperienceMotion current={role.current}>{content}</LainExperienceMotion> : content}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
