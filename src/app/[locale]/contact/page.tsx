import { useTranslations } from 'next-intl';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, MapPin, Linkedin, Github, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Contact - Mario de Jesus',
  description: 'Get in touch for DevSecOps opportunities, AI security projects, or collaboration in Montreal.',
};

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-terminal-green glow-text mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-terminal-gray max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="terminal-window">
              <h2 className="text-xl font-semibold text-terminal-cyan mb-6">
                Connection Methods
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 border border-terminal-green/20 rounded">
                  <Mail className="h-5 w-5 text-terminal-green" />
                  <div>
                    <div className="text-terminal-white font-medium">Email</div>
                    <div className="text-terminal-gray text-sm">contacto@ramdel.dev</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-terminal-green/20 rounded">
                  <MapPin className="h-5 w-5 text-terminal-cyan" />
                  <div>
                    <div className="text-terminal-white font-medium">Location</div>
                    <div className="text-terminal-gray text-sm">Montreal, QC 🍁</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-terminal-green/20 rounded">
                  <Linkedin className="h-5 w-5 text-terminal-green" />
                  <div>
                    <div className="text-terminal-white font-medium">LinkedIn</div>
                    <a 
                      href="https://linkedin.com/in/ramdel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-terminal-cyan text-sm hover:text-terminal-green transition-colors"
                    >
                      linkedin.com/in/ramdel
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-terminal-green/20 rounded">
                  <Github className="h-5 w-5 text-terminal-cyan" />
                  <div>
                    <div className="text-terminal-white font-medium">GitHub</div>
                    <a 
                      href="https://github.com/ramdel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-terminal-cyan text-sm hover:text-terminal-green transition-colors"
                    >
                      github.com/ramdel
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="terminal-window">
              <h3 className="text-lg font-semibold text-terminal-cyan mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-terminal-white">Availability</span>
                  <span className="text-terminal-green flex items-center">
                    <div className="w-2 h-2 bg-terminal-green rounded-full mr-2 animate-pulse"></div>
                    OPEN TO OPPORTUNITIES
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-terminal-white">Response Time</span>
                  <span className="text-terminal-cyan">< 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-terminal-white">Preferred Meeting</span>
                  <span className="text-terminal-gray">Virtual or Montreal</span>
                </div>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="terminal-window">
              <h3 className="text-lg font-semibold text-terminal-cyan mb-4">Let's Talk About</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="terminal-prompt text-terminal-green">DevSecOps roles</div>
                <div className="terminal-prompt text-terminal-green">AI security projects</div>
                <div className="terminal-prompt text-terminal-green">AWS optimization</div>
                <div className="terminal-prompt text-terminal-green">Technical leadership</div>
                <div className="terminal-prompt text-terminal-green">Montreal tech scene</div>
                <div className="terminal-prompt text-terminal-green">Collaboration ideas</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="terminal-window">
            <h2 className="text-xl font-semibold text-terminal-cyan mb-6">
              Send Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}