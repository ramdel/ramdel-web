import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-terminal-green/30 bg-terminal-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-terminal-cyan font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm text-terminal-gray">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Montreal, QC 🍁</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contacto@ramdel.dev</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-terminal-cyan font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/ramdel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-cyan transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/ramdel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-cyan transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <div className="text-sm text-terminal-gray">
              <p className="terminal-prompt">
                Built with Next.js & Vercel
              </p>
              <p className="mt-2">
                © {currentYear} Mario de Jesus. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}