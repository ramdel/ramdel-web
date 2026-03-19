'use client';

import { useState, useEffect } from 'react';

export default function EdexClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
      const d = now.toISOString().split('T')[0];
      setDate(d);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="edex-clock flex flex-col items-end">
      <span className="text-xl font-bold tracking-widest edex-cyan-glow">{time}</span>
      <span className="text-xs tracking-widest edex-label">{date}</span>
    </div>
  );
}
