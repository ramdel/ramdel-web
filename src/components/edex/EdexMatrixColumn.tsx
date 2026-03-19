'use client';

import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEF';

interface Props {
  width?: number;
  height?: number;
}

export default function EdexMatrixCanvas({ width = 120, height = 400 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const fontSize = 12;
    const cols = Math.floor(width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        // Head character brighter
        const headY = drops[i] * fontSize;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, i * fontSize, headY);

        // Trail character
        ctx.fillStyle = '#00ffff';
        const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        if (headY - fontSize > 0) {
          ctx.fillText(trailChar, i * fontSize, headY - fontSize);
        }

        ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
        const trailChar2 = CHARS[Math.floor(Math.random() * CHARS.length)];
        if (headY - fontSize * 2 > 0) {
          ctx.fillText(trailChar2, i * fontSize, headY - fontSize * 2);
        }

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="opacity-20 pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
