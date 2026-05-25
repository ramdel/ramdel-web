import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const slugToKey: Record<string, string> = {
  'aws-security-transformation': 'aws_security',
  'aws-cost-optimization': 'aws_cost',
  'cicd-security-pipeline': 'cicd_security',
  'ai-agent-platform': 'ai_platform',
  'compliance-transformation': 'compliance',
};

const caseStudyTools: Record<string, string[]> = {
  'aws-security-transformation': [
    'AWS GuardDuty', 'AWS Security Hub', 'IAM', 'KMS', 'Python', 'Boto3',
    'Lambda', 'CloudWatch', 'Burp Suite', 'ModSecurity', 'VPC Flow Logs',
  ],
  'aws-cost-optimization': [
    'Python', 'Boto3', 'AWS Cost Explorer', 'EC2', 'EBS', 'S3',
    'Route53', 'CloudWatch', 'Lambda', 'AWS Budgets',
  ],
  'cicd-security-pipeline': [
    'GitHub Actions', 'Docker', 'AWS ECR', 'AWS ECS', 'Terraform',
    'Semgrep', 'SonarQube', 'Trivy', 'OWASP Dependency-Check', 'Blue/Green Deploy',
  ],
  'ai-agent-platform': [
    'Pulumi TypeScript', 'AWS EC2', 'Docker', 'AWS EFS', 'AWS SSM',
    'Secrets Manager', 'CloudWatch', 'SNS', 'IAM', 'Python',
  ],
  'compliance-transformation': [
    'AWS CDK TypeScript', 'EC2 Windows/IIS', 'RDS SQL Server', 'WAF v2',
    'GuardDuty', 'Security Hub', 'Inspector v2', 'CloudTrail',
    'GitHub Actions OIDC', 'AWS Backup', 'SSM Session Manager',
  ],
};

export async function generateStaticParams() {
  return [
    { slug: 'aws-security-transformation' },
    { slug: 'aws-cost-optimization' },
    { slug: 'cicd-security-pipeline' },
    { slug: 'ai-agent-platform' },
    { slug: 'compliance-transformation' },
  ];
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const key = slugToKey[slug];
  if (!key) notFound();

  const t = await getTranslations({ locale, namespace: 'CaseStudyPages' });
  const tools = caseStudyTools[slug] ?? [];

  const metrics = [
    { value: t(`${key}.m1_value`), label: t(`${key}.m1_label`) },
    { value: t(`${key}.m2_value`), label: t(`${key}.m2_label`) },
    { value: t(`${key}.m3_value`), label: t(`${key}.m3_label`) },
    { value: t(`${key}.m4_value`), label: t(`${key}.m4_label`) },
  ];

  const takeaways = [
    t(`${key}.takeaway1`),
    t(`${key}.takeaway2`),
    t(`${key}.takeaway3`),
    t(`${key}.takeaway4`),
  ];

  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <div className="border-b border-zinc-800/60 bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link
            href={`/${locale}/`}
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href={`/${locale}/#case-studies`}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {t('all_case_studies')}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-4">{t(`${key}.category`)}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
            {t(`${key}.title`)}
          </h1>
          <p className="text-lg text-cyan-400">{t(`${key}.subtitle`)}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-card border border-zinc-800 rounded-2xl p-5 text-center card-glow"
            >
              <div className="text-2xl font-bold font-mono text-cyan-400 mb-1">{m.value}</div>
              <div className="text-xs text-zinc-500 leading-snug">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <div className="space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {t('overview_label')}
            </h2>
            <p className="text-zinc-300 leading-relaxed">{t(`${key}.overview`)}</p>
          </section>

          <hr className="border-zinc-800" />

          {/* Problem */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {t('problem_label')}
            </h2>
            <p className="text-zinc-300 leading-relaxed">{t(`${key}.problem`)}</p>
          </section>

          <hr className="border-zinc-800" />

          {/* Solution */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {t('solution_label')}
            </h2>
            <p className="text-zinc-300 leading-relaxed">{t(`${key}.solution`)}</p>
          </section>

          <hr className="border-zinc-800" />

          {/* Results */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {t('results_label')}
            </h2>
            <p className="text-zinc-300 leading-relaxed">{t(`${key}.results`)}</p>
          </section>

          <hr className="border-zinc-800" />

          {/* Key Takeaways */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              {t('takeaways_label')}
            </h2>
            <ul className="space-y-3">
              {takeaways.map((tw, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">→</span>
                  <span className="text-zinc-300 text-sm leading-relaxed">{tw}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-zinc-800" />

          {/* Tools */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              {t('tools_label')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="skill-tag">
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm mb-4">{t('hire_cta')}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href={`/${locale}/`}
              className="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              {t('back')}
            </Link>
            <Link
              href={`/${locale}/#case-studies`}
              className="px-5 py-2.5 bg-cyan-400 text-zinc-900 font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors"
            >
              {t('all_case_studies')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
