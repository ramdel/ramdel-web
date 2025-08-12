'use client';

import { useState, useEffect } from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';

export default function TerminalWindow() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  
  const lines = [
    '$ whoami',
    'mario@devsecops-engineer',
    '',
    '$ cat /proc/experience',
    '15+ years | DevSecOps Expert',
    'Location: Montreal, QC 🍁',
    'Status: Available for opportunities',
    '',
    '$ ls -la ~/achievements/',
    'drwxr-xr-x  2 mario staff  111+ vulnerabilities_remediated',
    'drwxr-xr-x  2 mario staff   92% compliance_achieved',
    'drwxr-xr-x  2 mario staff 99.9% uptime_maintained',
    '',
    '$ echo $SPECIALTIES',
    'AWS_Security | AI_Automation | Python_Boto3',
    '',
    '$ ./contact_mario.sh',
    'Ready to connect! 🚀'
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        if (currentChar < lines[currentLine].length) {
          setCurrentChar(currentChar + 1);
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }, currentLine === 0 || lines[currentLine].startsWith('$') ? 100 : 30);

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines]);

  return (
    <div className="terminal-window max-w-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-terminal-green/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-terminal-gray">mario@ramdel.dev</span>
        </div>
        <div className="flex items-center space-x-2 text-terminal-gray">
          <Minimize2 className="h-4 w-4 hover:text-terminal-green cursor-pointer" />
          <Maximize2 className="h-4 w-4 hover:text-terminal-green cursor-pointer" />
          <X className="h-4 w-4 hover:text-red-500 cursor-pointer" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="font-mono text-sm space-y-1 min-h-[400px]">
        {lines.slice(0, currentLine + 1).map((line, index) => (
          <div key={index} className="flex">
            {line.startsWith(') ? (
              <span className="text-terminal-cyan">
                {index === currentLine 
                  ? line.substring(0, currentChar)
                  : line
                }
                {index === currentLine && currentChar < line.length && (
                  <span className="animate-pulse">|</span>
                )}
              </span>
            ) : line.includes('drwxr-xr-x') ? (
              <span className="text-terminal-green">
                {index === currentLine 
                  ? line.substring(0, currentChar)
                  : line
                }
              </span>
            ) : line.includes('|') ? (
              <span className="text-terminal-white">
                {index === currentLine 
                  ? line.substring(0, currentChar)
                  : line
                }
              </span>
            ) : (
              <span className="text-terminal-gray">
                {index === currentLine 
                  ? line.substring(0, currentChar)
                  : line
                }
                {index === currentLine && currentChar < line.length && (
                  <span className="animate-pulse text-terminal-green">|</span>
                )}
              </span>
            )}
          </div>
        ))}
        {currentLine >= lines.length && (
          <div className="flex items-center text-terminal-cyan">
            <span>$ </span>
            <span className="animate-pulse ml-1">|</span>
          </div>
        )}
      </div>
    </div>
  );
}