'use client';

import { useState, useEffect } from 'react';

interface Props {
  lines: string[];
  className?: string;
  speed?: number;
}

export default function EdexTypewriter({ lines, className = '', speed = 40 }: Props) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) {
      // All lines done – blink cursor
      const id = setInterval(() => setShowCursor(v => !v), 530);
      return () => clearInterval(id);
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const id = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          if (!next[currentLine]) next[currentLine] = '';
          next[currentLine] += line[currentChar];
          return next;
        });
        setCurrentChar(c => c + 1);
      }, speed);
      return () => clearTimeout(id);
    } else {
      // Move to next line after a short pause
      const id = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(id);
    }
  }, [currentLine, currentChar, lines, speed]);

  return (
    <div className={`font-mono ${className}`}>
      {displayed.map((text, i) => (
        <div key={i} className="edex-terminal-line">
          <span className="edex-prompt">{'>'}</span>
          <span className="ml-2">{text}</span>
          {i === currentLine && currentLine < lines.length && (
            <span className={`edex-caret ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
          )}
        </div>
      ))}
      {currentLine >= lines.length && (
        <div className="edex-terminal-line">
          <span className="edex-prompt">{'>'}</span>
          <span className={`ml-2 edex-caret ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
        </div>
      )}
    </div>
  );
}
