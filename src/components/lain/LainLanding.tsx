import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, ArrowRight, Cloud, GitBranch, ShieldCheck, Terminal } from 'lucide-react';
import AboutSection from '@/components/sections/AboutSection';
import ContactForm from '@/components/forms/ContactForm';
import LainVisual from './LainVisual';
import './lain.css';

const studySlugs = [
  'aws-security-transformation',
  'aws-cost-optimization',
  'cicd-security-pipeline',
  'ai-agent-platform',
  'compliance-transformation',
];

export default function LainLanding() {
  const locale = useLocale();
  const t = useTranslations('Lain');
  const hero = useTranslations('Hero');
  const skills = useTranslations('Skills');
  const studies = useTranslations('CaseStudies');

  const services = [Cloud, GitBranch, ShieldCheck, Terminal].map((Icon, index) => ({
    Icon,
    title: skills(`group${index + 1}_name`),
    description: t(`service${index + 1}_desc`),
  }));
  const metrics = [1, 2, 3, 4].map((number) => ({
    value: hero(`metric${number}_value`),
    label: hero(`metric${number}_label`),
  }));

  return (
    <div className="lain-page lain-hybrid">
      <section id="hero" className="lain-hero">
        <LainVisual className="lain-hero-visual" />
        <div className="lain-hero-shade" aria-hidden="true" />
        <div className="lain-hero-grid" aria-hidden="true" />
        <div className="lain-container lain-hero-content">
          <div className="lain-hero-topline">
            <span>[ RAMDEL / SYSTEMS ]</span>
            <span>{t('eyebrow')}</span>
          </div>
          <div className="lain-hero-copy">
            <p className="lain-coordinate">MARIO DE JESUS / {hero('location')}</p>
            <h1><span>{t('hero_line1')}</span><span>{t('hero_line2')}</span><span className="lain-accent">{t('hero_line3')}</span></h1>
            <p className="lain-lede">{hero('description')}</p>
            <div className="lain-actions">
              <a className="lain-button" href={`/${locale}/#skills`}><span aria-hidden="true" className="lain-button-square" /> {skills('section_label')} <ArrowRight size={17} aria-hidden="true" /></a>
              <a className="lain-text-link" href={`/${locale}/#case-studies`}>{hero('cta_work')} <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="lain-hero-bottom"><a href={`/${locale}/#skills`}>{t('scroll')} <ArrowDown size={16} aria-hidden="true" /></a><span>SIGNAL: CONNECTED / 01</span></div>
        </div>
        <div className="lain-side-rail" aria-hidden="true">RAMDEL.DEV — HUMAN SYSTEMS / DIGITAL WORLDS</div>
      </section>

      <div className="lain-metrics" aria-label={hero('tagline')}>
        <div className="lain-container lain-metrics-grid">
          {metrics.map(({ value, label }) => <div className="lain-metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </div>

      <section id="skills" className="lain-section lain-services">
        <div className="lain-container">
          <div className="lain-section-heading"><div><p className="lain-kicker">{t('services_label')}</p><h2>{t('services_title')}</h2></div><p>{t('services_intro')}</p></div>
          <div className="lain-service-grid">
            {services.map(({ Icon, title, description }, index) => <article className="lain-service-card" key={title}>
              <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
              <span className="lain-card-index">[{String(index + 1).padStart(2, '0')}]</span>
              <h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <div className="lain-manifesto"><div className="lain-container"><span>&gt; ramdel@systems:~$</span><p>{t('hero_note')}</p><span className="lain-manifesto-mark" aria-hidden="true">◇</span></div></div>

      <section id="case-studies" className="lain-section lain-work">
        <div className="lain-container">
          <div className="lain-section-heading"><div><p className="lain-kicker">{t('work_label')}</p><h2>{studies('title')}</h2></div><p>{t('work_intro')}</p></div>
          <div className="lain-work-grid">
            {studySlugs.map((slug, index) => <Link className="lain-work-card" href={`/${locale}/case-studies/${slug}`} key={slug}>
              <span className="lain-work-top"><span>{studies(`cs${index + 1}_category`)}</span><span>{String(index + 1).padStart(2, '0')} / 05</span></span>
              <span className="lain-work-figure" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></span>
              <strong>{studies(`cs${index + 1}_title`)}</strong>
              <span className="lain-work-subtitle">{studies(`cs${index + 1}_subtitle`)}</span>
              <span className="lain-work-link">{studies('read_more')} <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>)}
          </div>
        </div>
      </section>

      <AboutSection />

      <section id="contact" className="lain-section lain-contact">
        <div className="lain-container lain-contact-grid">
          <div className="lain-contact-copy"><p className="lain-kicker">[ {t('contact_label')} ]</p><h2>{t('contact_title')}</h2><p>{t('contact_intro')}</p><div className="lain-contact-portal" aria-hidden="true"><span>CONNECTION READY</span><span>◇</span></div></div>
          <div className="lain-contact-form"><ContactForm /></div>
        </div>
      </section>
    </div>
  );
}
