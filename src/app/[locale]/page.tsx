import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Terminal, Shield, Cpu, MapPin } from 'lucide-react';
import TerminalWindow from '@/components/ui/TerminalWindow';
import StatusIndicator from '@/components/ui/StatusIndicator';
import ProgressBar from '@/components/ui/ProgressBar';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-terminal-green glow-text mb-4">
                  {t('title')}
                </h1>
                <p className="text-xl text-terminal-white mb-2">
                  {t('subtitle')}
                </p>
                <div className="flex items-center text-terminal-cyan">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{t('location')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-terminal-gray">
                  {t('tagline')}
                </p>
                
                {/* Status Indicators */}
                <div className="space-y-3">
                  <StatusIndicator 
                    label="System Status" 
                    status="OPERATIONAL" 
                    icon={<Terminal className="h-4 w-4" />}
                  />
                  <StatusIndicator 
                    label="Security Level" 
                    status="MAXIMUM" 
                    icon={<Shield className="h-4 w-4" />}
                  />
                  <StatusIndicator 
                    label="AI Integration" 
                    status="ACTIVE" 
                    icon={<Cpu className="h-4 w-4" />}
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-terminal-green text-terminal-black font-semibold rounded-lg hover:bg-terminal-cyan transition-colors glow-border"
                >
                  {t('cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center px-6 py-3 border border-terminal-green text-terminal-green rounded-lg hover:bg-terminal-green/10 transition-colors"
                >
                  {t('about')}
                </Link>
              </div>
            </div>

            {/* Right Column - Terminal Window */}
            <div className="lg:ml-8">
              <TerminalWindow />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-terminal-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-terminal-cyan mb-4">
              Core Competencies
            </h2>
            <p className="text-terminal-gray max-w-2xl mx-auto">
              Specialized in AI-powered security automation with measurable business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="terminal-window text-center">
              <Shield className="h-12 w-12 text-terminal-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-terminal-white mb-3">DevSecOps</h3>
              <p className="text-terminal-gray mb-4">
                AWS Security • Python/Boto3 • CI/CD Security • Vulnerability Management
              </p>
              <ProgressBar label="Expertise" percentage={95} />
            </div>

            <div className="terminal-window text-center">
              <Cpu className="h-12 w-12 text-terminal-cyan mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-terminal-white mb-3">AI Automation</h3>
              <p className="text-terminal-gray mb-4">
                ML Security • Pattern Recognition • Automated Remediation • Data Analysis
              </p>
              <ProgressBar label="Implementation" percentage={88} />
            </div>

            <div className="terminal-window text-center">
              <Terminal className="h-12 w-12 text-terminal-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-terminal-white mb-3">Technical Leadership</h3>
              <p className="text-terminal-gray mb-4">
                Team Management • Architecture • Legacy Modernization • Mentoring
              </p>
              <ProgressBar label="Experience" percentage={92} />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-terminal-cyan mb-4">
              Recent Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="terminal-window text-center">
              <div className="text-3xl font-bold text-terminal-green mb-2">111+</div>
              <div className="text-sm text-terminal-gray">Vulnerabilities Remediated</div>
            </div>
            <div className="terminal-window text-center">
              <div className="text-3xl font-bold text-terminal-cyan mb-2">92%</div>
              <div className="text-sm text-terminal-gray">Compliance Score Achieved</div>
            </div>
            <div className="terminal-window text-center">
              <div className="text-3xl font-bold text-terminal-green mb-2">99.9%</div>
              <div className="text-sm text-terminal-gray">Uptime Maintained</div>
            </div>
            <div className="terminal-window text-center">
              <div className="text-3xl font-bold text-terminal-cyan mb-2">46%</div>
              <div className="text-sm text-terminal-gray">AWS Cost Reduction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}