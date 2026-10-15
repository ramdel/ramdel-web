'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

type Metric = { value: string; label: string };

export default function LainMetrics({ metrics, description }: { metrics: Metric[]; description: string }) {
  const root = useRef<HTMLDivElement>(null);
  const completed = useRef(false);

  useEffect(() => {
    const section = root.current;
    if (!section || completed.current) return;

    const visibleValues = Array.from(section.querySelectorAll<HTMLElement>('[data-metric-value]'));
    const animations: ReturnType<typeof animate>[] = [];
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        completed.current = true;
        return;
      }

      let remaining = visibleValues.length;
      visibleValues.forEach((element, index) => {
        const finalValue = metrics[index].value;
        const number = Number.parseFloat(finalValue);
        if (!Number.isFinite(number)) {
          remaining -= 1;
          return;
        }

        const decimals = finalValue.includes('.') ? finalValue.split('.')[1].match(/^\d+/)?.[0].length ?? 0 : 0;
        const suffix = finalValue.replace(/^[\d.]+/, '');
        const progress = { value: 0 };
        animations.push(animate(progress, {
          value: number,
          duration: 1300,
          ease: 'out(3)',
          onUpdate: () => {
            element.textContent = `${progress.value.toFixed(decimals)}${suffix}`;
          },
          onComplete: () => {
            element.textContent = finalValue;
            remaining -= 1;
            if (remaining === 0) completed.current = true;
          },
        }));
      });
      if (remaining === 0) completed.current = true;
    }, { threshold: 0.3 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      visibleValues.forEach((element, index) => {
        element.textContent = metrics[index].value;
      });
    };
  }, [metrics]);

  return (
    <div ref={root} className="lain-metrics" aria-label={description}>
      <div className="lain-container lain-metrics-grid">
        {metrics.map(({ value, label }) => (
          <div className="lain-metric" key={label}>
            <strong><span className="sr-only">{value}</span><span aria-hidden="true" data-metric-value>{value}</span></strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
