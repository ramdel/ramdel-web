'use client';

import Image from 'next/image';
import { animate, createScope, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

type LainVisualProps = {
  /** Replace this path with a licensed visual without changing the layout or animation. */
  src?: string;
  className?: string;
};

export default function LainVisual({ src = '/lain-portal.svg', className = '' }: LainVisualProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const scope = createScope({
      root,
      mediaQueries: { reducedMotion: '(prefers-reduced-motion: reduce)' },
    }).add((scope) => {
      if (scope?.matches.reducedMotion) return;

      animate('.lain-signal', {
        opacity: [0, 1],
        translateX: ['-20px', '0px'],
        duration: 900,
        delay: stagger(170),
        ease: 'out(3)',
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={root} className={`lain-visual ${className}`} aria-hidden="true">
      <Image src={src} alt="" fill priority className="lain-artwork" sizes="(max-width: 768px) 100vw, 48vw" />
      <span className="lain-signal lain-signal-one" />
      <span className="lain-signal lain-signal-two" />
      <span className="lain-signal lain-signal-three" />
      <span className="lain-visual-index">01 / SIGNAL</span>
    </div>
  );
}
