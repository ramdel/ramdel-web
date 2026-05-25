import { useTranslations } from 'next-intl';
import { Cloud, GitBranch, Shield, Code2 } from 'lucide-react';

const skillGroups = [
  {
    icon: Cloud,
    nameKey: 'group1_name',
    skills: ['AWS EC2', 'AWS RDS', 'AWS Lambda', 'AWS ECS/ECR', 'AWS S3', 'CloudFront', 'Route53', 'WAF', 'GuardDuty', 'Security Hub', 'CloudWatch', 'KMS'],
  },
  {
    icon: GitBranch,
    nameKey: 'group2_name',
    skills: ['GitHub Actions', 'Azure DevOps', 'Docker', 'Terraform', 'Blue/Green Deploy', 'SAST/DAST', 'Trivy', 'Semgrep', 'SonarQube', 'OWASP Dep-Check'],
  },
  {
    icon: Shield,
    nameKey: 'group3_name',
    skills: ['CIS Benchmarks', 'SOC2 Prep', 'IAM / Zero Trust', 'VPC Architecture', 'ModSecurity', 'Burp Suite', 'Metasploit', 'Pen Testing', 'Incident Response', 'OWASP Top 10'],
  },
  {
    icon: Code2,
    nameKey: 'group4_name',
    skills: ['Python', 'Boto3', 'TypeScript', 'Node.js', 'PHP', 'Bash', 'Elasticsearch', 'scikit-learn', 'pandas', 'Firebase'],
  },
];

export default function SkillsSection() {
  const t = useTranslations('Skills');

  return (
    <section id="skills" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <p className="section-label mb-4">{t('section_label')}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-12">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.nameKey}
                className="bg-card border border-zinc-800 rounded-2xl p-6 card-glow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200">{t(group.nameKey)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
