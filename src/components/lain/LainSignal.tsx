'use client';

import { animate, createScope, scrambleText } from 'animejs';
import { useEffect, useRef } from 'react';

const SIGNAL_TEXT = 'SIGNAL: CONNECTED / 01';

export default function LainSignal() {
  const root = useRef<HTMLSpanElement>(null);
  const animatedText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!root.current || !animatedText.current) return;

    const scope = createScope({
      root,
      mediaQueries: { reducedMotion: '(prefers-reduced-motion: reduce)' },
    }).add((scope) => {
      if (scope?.matches.reducedMotion || !animatedText.current) return;

      animate(animatedText.current, {
        innerHTML: scrambleText({
          text: SIGNAL_TEXT,
          chars: 'blocks',
          duration: 2300,
        }),
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <span className="lain-hero-signal" ref={root}>
      <span className="lain-hero-signal-measure" aria-hidden="true">{SIGNAL_TEXT}</span>
      <span className="lain-hero-signal-animated" aria-hidden="true" ref={animatedText}>{SIGNAL_TEXT}</span>
      <span className="sr-only">{SIGNAL_TEXT}</span>
    </span>
  );
}
