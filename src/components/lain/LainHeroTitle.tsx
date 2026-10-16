'use client';

import { animate, createScope, scrambleText } from 'animejs';
import { useEffect, useRef } from 'react';

type LainHeroTitleProps = {
  line1: string;
  line2: string;
  line3: string;
};

export default function LainHeroTitle({ line1, line2, line3 }: LainHeroTitleProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  const animatedLines = useRef<Array<HTMLSpanElement | null>>([]);
  const lines = [line1, line2, line3];

  useEffect(() => {
    if (!heading.current) return;

    const mode = new URLSearchParams(window.location.search).get('heroScramble') === 'block'
      ? 'block'
      : 'lines';
    const duration = mode === 'block' ? 950 : 1500;
    const startInterval = mode === 'block' ? 1030 : 220;

    const scope = createScope({
      root: heading,
      mediaQueries: { reducedMotion: '(prefers-reduced-motion: reduce)' },
    }).add((scope) => {
      if (scope?.matches.reducedMotion) return;

      [line1, line2, line3].forEach((line, index) => {
        const target = animatedLines.current[index];
        if (!target) return;

        animate(target, {
          innerHTML: scrambleText({
            text: line,
            chars: 'uppercase',
            cursor: '_',
            duration,
            delay: index * startInterval,
          }),
        });
      });
    });

    return () => scope.revert();
  }, [line1, line2, line3]);

  return (
    <h1 ref={heading} aria-label={lines.join(' ')}>
      {lines.map((line, index) => (
        <span className={`lain-hero-title-line${index === 2 ? ' lain-accent' : ''}`} aria-hidden="true" key={index}>
          <span className="lain-hero-title-measure">{line}</span>
          <span className="lain-hero-title-animated" ref={(element) => { animatedLines.current[index] = element; }}>{line}</span>
        </span>
      ))}
    </h1>
  );
}
