'use client';

import { useEffect, useState } from 'react';

interface Props {
  label: string;
  value: number; // 0-100
  unit?: string;
  color?: 'cyan' | 'green';
}

export default function EdexGauge({ label, value, unit = '%', color = 'cyan' }: Props) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      let start = 0;
      const step = () => {
        start += 1;
        setAnimated(start);
        if (start < value) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 400);
    return () => clearTimeout(id);
  }, [value]);

  const segments = 20;
  const filled = Math.round((animated / 100) * segments);

  return (
    <div className="edex-gauge">
      <div className="flex justify-between items-center mb-1">
        <span className="edex-label text-xs tracking-widest">{label}</span>
        <span className={`text-sm font-bold edex-${color}-glow`}>
          {animated}{unit}
        </span>
      </div>
      <div className="flex gap-px">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`edex-gauge-seg ${i < filled ? `edex-gauge-filled edex-gauge-${color}` : 'edex-gauge-empty'}`}
          />
        ))}
      </div>
    </div>
  );
}
