import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '@/components/lain/lain.css';
import '@/components/lain/case-study.css';

const slugs = [
  'aws-security-transformation',
  'aws-cost-optimization',
  'cicd-security-pipeline',
  'ai-agent-platform',
  'compliance-transformation',
] as const;

type CaseStudySlug = (typeof slugs)[number];
type MediaPlacement = 'after-overview' | 'after-solution' | 'after-results';

type CaseStudyMedia = {
  kind: 'image' | 'diagram' | 'chart';
  src: string;
  width: number;
  height: number;
  altKey: string;
  captionKey?: string;
};

type CaseStudyConfig = {
  key: string;
  motif: string;
  mediaPlacement: MediaPlacement;
  media?: CaseStudyMedia;
  tools: readonly string[];
};

// Media remains absent until a real, reviewed asset and its translated alt text exist.
const caseStudies: Record<CaseStudySlug, CaseStudyConfig> = {
  'aws-security-transformation': {
    key: 'aws_security',
    motif: 'security',
    mediaPlacement: 'after-solution',
    tools: [
      'AWS GuardDuty', 'AWS Security Hub', 'IAM', 'KMS', 'Python', 'Boto3',
      'Lambda', 'CloudWatch', 'Burp Suite', 'ModSecurity', 'VPC Flow Logs',
    ],
  },
  'aws-cost-optimization': {
    key: 'aws_cost',
    motif: 'cost',
    mediaPlacement: 'after-results',
    tools: [
      'AWS CDK TypeScript', 'ECS Fargate', 'RDS MySQL', 'ElastiCache',
      'ECR', 'CloudFront',
    ],
  },
  'cicd-security-pipeline': {
    key: 'cicd_security',
    motif: 'pipeline',
    mediaPlacement: 'after-solution',
    tools: [
      'GitHub Actions', 'AWS CDK TypeScript', 'Aurora MySQL Serverless v2',
      'CodeDeploy',
    ],
  },
  'ai-agent-platform': {
    key: 'ai_platform',
    motif: 'platform',
    mediaPlacement: 'after-solution',
    tools: [
      'Pulumi TypeScript', 'AWS EC2', 'Docker', 'AWS EFS', 'AWS SSM',
      'Secrets Manager', 'CloudWatch', 'SNS', 'IAM', 'Python',
    ],
  },
  'compliance-transformation': {
    key: 'compliance',
    motif: 'compliance',
    mediaPlacement: 'after-solution',
    tools: [
      'AWS CDK TypeScript', 'EC2 Windows/IIS', 'RDS SQL Server', 'WAF v2',
      'GuardDuty', 'Security Hub', 'Inspector v2', 'CloudTrail',
      'GitHub Actions OIDC', 'AWS Backup', 'SSM Session Manager',
    ],
  },
};

function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return Object.prototype.hasOwnProperty.call(caseStudies, slug);
}

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();

  const config = caseStudies[slug];
  const index = slugs.indexOf(slug) + 1;
  const t = await getTranslations({ locale, namespace: 'CaseStudyPages' });
  const portfolioHref = `/${locale}/`;
  const studiesHref = `/${locale}/#case-studies`;
  const metrics = [1, 2, 3, 4].map((number) => ({
    value: t(`${config.key}.m${number}_value`),
    label: t(`${config.key}.m${number}_label`),
  }));
  const sections = [
    { id: 'overview', number: '01', label: t('overview_label'), body: t(`${config.key}.overview`), mediaPlacement: 'after-overview' },
    { id: 'problem', number: '02', label: t('problem_label'), body: t(`${config.key}.problem`), mediaPlacement: null },
    { id: 'solution', number: '03', label: t('solution_label'), body: t(`${config.key}.solution`), mediaPlacement: 'after-solution' },
    { id: 'results', number: '04', label: t('results_label'), body: t(`${config.key}.results`), mediaPlacement: 'after-results' },
  ] as const;

  const renderMedia = (placement: MediaPlacement) => {
    const media = config.media;
    if (!media || config.mediaPlacement !== placement) return null;

    return (
      <figure className="case-media" data-kind={media.kind}>
        <Image
          src={media.src}
          alt={t(`${config.key}.${media.altKey}`)}
          width={media.width}
          height={media.height}
          sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1200px) 75vw, 840px"
          className="case-media-image"
        />
        {media.captionKey && <figcaption>{t(`${config.key}.${media.captionKey}`)}</figcaption>}
      </figure>
    );
  };

  return (
    <div className="lain-page lain-case-page">
      <section className={`case-hero case-motif-${config.motif}`} aria-labelledby="case-title">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="lain-container case-hero-inner">
          <div className="case-breadcrumbs">
            <Link href={portfolioHref}><ArrowLeft size={14} aria-hidden="true" />{t('back')}</Link>
            <span aria-hidden="true">/</span>
            <Link href={studiesHref}>{t('all_case_studies')}</Link>
          </div>

          <div className="case-hero-layout">
            <div className="case-hero-copy">
              <div className="case-hero-topline">
                <span className="lain-kicker">{t(`${config.key}.category`)}</span>
                <span>{String(index).padStart(2, '0')} / {String(slugs.length).padStart(2, '0')}</span>
              </div>
              <h1 id="case-title">{t(`${config.key}.title`)}</h1>
              <p className="case-hero-subtitle">{t(`${config.key}.subtitle`)}</p>
            </div>
            <div className="case-hero-art" aria-hidden="true">
              <span className="case-art-orbit" />
              <span className="case-art-axis" />
              <span className="case-art-node case-art-node-one" />
              <span className="case-art-node case-art-node-two" />
              <span className="case-art-index">{String(index).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="case-proof" aria-label={t('results_label')}>
        <div className="lain-container case-proof-grid">
          {metrics.map(({ value, label }) => (
            <div className="case-proof-item" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="lain-container case-content">
        <div className="case-story-layout">
          <div className="case-story-rail" aria-hidden="true">
            <span>{String(index).padStart(2, '0')} / {String(slugs.length).padStart(2, '0')}</span>
            <span className="case-story-rail-line" />
          </div>

          <div className="case-story">
            {sections.map((section) => (
              <div className="case-story-unit" key={section.id}>
                <section className="case-story-section" id={`case-${section.id}`} aria-labelledby={`case-${section.id}-title`}>
                  <div className="case-story-heading">
                    <span className="case-story-number" aria-hidden="true">{section.number} /</span>
                    <h2 id={`case-${section.id}-title`}>{section.label}</h2>
                  </div>
                  <p>{section.body}</p>
                </section>
                {section.mediaPlacement && renderMedia(section.mediaPlacement)}
              </div>
            ))}

            <section className="case-story-section case-takeaways" id="case-takeaways" aria-labelledby="case-takeaways-title">
              <div className="case-story-heading">
                <span className="case-story-number" aria-hidden="true">05 /</span>
                <h2 id="case-takeaways-title">{t('takeaways_label')}</h2>
              </div>
              <ol>
                {[1, 2, 3, 4].map((number) => (
                  <li key={number}>
                    <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
                    <p>{t(`${config.key}.takeaway${number}`)}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="case-story-section case-tools" id="case-tools" aria-labelledby="case-tools-title">
              <div className="case-story-heading">
                <span className="case-story-number" aria-hidden="true">06 /</span>
                <h2 id="case-tools-title">{t('tools_label')}</h2>
              </div>
              <ul>
                {config.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <section className="case-next" aria-label={t('hire_cta')}>
        <div className="lain-container case-next-inner">
          <div>
            <p className="lain-kicker">{String(index).padStart(2, '0')} / {String(slugs.length).padStart(2, '0')}</p>
            <h2>{t('hire_cta')}</h2>
          </div>
          <div className="case-next-actions">
            <Link href={portfolioHref}><ArrowLeft size={16} aria-hidden="true" /> {t('back')}</Link>
            <Link href={studiesHref}>{t('all_case_studies')} <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
