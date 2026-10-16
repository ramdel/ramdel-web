'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { animate, createScope } from 'animejs';

export default function LainExperienceMotion({ children, current }: { children: ReactNode; current: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scope: ReturnType<typeof createScope> | null = null;

    const updateMotion = () => {
      scope?.revert();
      card.style.removeProperty('transform');
      if (motionPreference.matches) return;

      scope = createScope({ root: card }).add(() => {
        const square = card.querySelector<HTMLElement>('.lain-experience-dot');
        if (current && square) {
          animate(square, {
            opacity: [1, 0.65],
            scale: [1, 1.12],
            duration: 1200,
            ease: 'inOut(2)',
            loop: true,
            alternate: true,
          });
        }

        let hoverAnimation: ReturnType<typeof animate> | null = null;
        const moveTo = (y: number) => {
          hoverAnimation?.cancel();
          hoverAnimation = animate(card, { y, duration: 220, ease: 'out(3)' });
        };
        const onEnter = () => moveTo(-4);
        const onLeave = () => moveTo(0);

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);

        return () => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
          hoverAnimation?.revert();
        };
      });
    };

    updateMotion();
    motionPreference.addEventListener('change', updateMotion);

    return () => {
      motionPreference.removeEventListener('change', updateMotion);
      scope?.revert();
      card.style.removeProperty('transform');
    };
  }, [current]);

  return (
    <div ref={cardRef} className={`lain-experience-card${current ? ' lain-experience-card-current' : ''}`}>
      {children}
    </div>
  );
}
