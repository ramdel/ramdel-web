'use client';

import Image from 'next/image';
import { animate, createScope, stagger } from 'animejs';
import { useEffect, useId, useRef } from 'react';

const CITY_PATH = 'M0 700h35V595h50v105h53V565h30v135h55V640h68v60h32V530h54v170h45V605h70v95h41V570h68v130h60V535h42v165h75V600h82v100h47V550h47v150h74V610h65v90h46V515h44v185h62V582h68v118h53V640h55v60h50V558h40v142h61V610h42v90h69v200H0z';

type LainVisualProps = {
  /** Use a licensed image path to replace the inline portal artwork. */
  src?: string;
  className?: string;
};

export default function LainVisual({ src = '/lain-portal.svg', className = '' }: LainVisualProps) {
  const root = useRef<HTMLDivElement>(null);
  const idPrefix = useId().replace(/:/g, '');
  const skyId = `${idPrefix}-sky`;
  const glowId = `${idPrefix}-glow`;
  const portalId = `${idPrefix}-portal`;
  const scanId = `${idPrefix}-scan`;

  useEffect(() => {
    if (!root.current) return;

    const scope = createScope({
      root,
      mediaQueries: { reducedMotion: '(prefers-reduced-motion: reduce)' },
    }).add((scope) => {
      if (scope?.matches.reducedMotion) return;

      if (src === '/lain-portal.svg') {
        animate('.lain-portal-city', {
          translateX: [-14, 14],
          duration: 18000,
          alternate: true,
          loop: true,
          ease: 'inOut(2)',
        });
        animate('.lain-portal-node-halo', {
          opacity: [.68, 0],
          scale: [1, 2.7],
          duration: 3700,
          delay: stagger(780),
          loop: true,
          ease: 'out(2)',
        });
        animate('.lain-portal-node', {
          opacity: [.7, 1],
          scale: [1, 1.32],
          duration: 3000,
          delay: stagger(780),
          alternate: true,
          loop: true,
          ease: 'inOut(2)',
        });
        animate('.lain-portal-ring-inner', {
          rotate: '-1turn',
          duration: 94000,
          loop: true,
          ease: 'linear',
        });
        animate('.lain-portal-core-glow', {
          opacity: [.7, 1],
          scale: [1, 1.22],
          duration: 4600,
          alternate: true,
          loop: true,
          ease: 'inOut(2)',
        });
      }
      animate('.lain-signal', {
        opacity: [.5, 1],
        scale: [1, 1.4],
        translateX: [-1.5, 1.5],
        duration: 3600,
        delay: stagger(520),
        alternate: true,
        loop: true,
        ease: 'inOut(2)',
      });
    });

    return () => scope.revert();
  }, [src]);

  return (
    <div ref={root} className={`lain-visual ${className}`} aria-hidden="true">
      {src === '/lain-portal.svg' ? (
        <svg className="lain-artwork" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <linearGradient id={skyId} x2="0" y2="1"><stop stopColor="#d4d0e4" /><stop offset=".52" stopColor="#b9b5d0" /><stop offset="1" stopColor="#706d91" /></linearGradient>
            <radialGradient id={glowId}><stop stopColor="#f2edff" stopOpacity=".96" /><stop offset=".6" stopColor="#b7a9e7" stopOpacity=".42" /><stop offset="1" stopColor="#a097c7" stopOpacity="0" /></radialGradient>
            <linearGradient id={portalId} x2="0" y2="1"><stop stopColor="#8781b1" /><stop offset=".5" stopColor="#4d4b76" /><stop offset="1" stopColor="#212742" /></linearGradient>
            <pattern id={scanId} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 5.5h6" stroke="#272c52" strokeOpacity=".1" /></pattern>
          </defs>
          <path fill={`url(#${skyId})`} d="M0 0h1440v900H0z" />
          <circle cx="1010" cy="365" r="355" fill={`url(#${glowId})`} />
          <g opacity=".33" stroke="#3d4065" strokeWidth="2" fill="none"><path d="M0 640 1440 518M0 715l1440-45M0 790l1440 28M90 900 756 260M300 900l456-640M565 900l191-640M930 900 756 260M1190 900 756 260M1415 900 756 260" /></g>
          <g className="lain-portal-city" fill="#6b6e92" opacity=".44">
            <path d="M-14 700H0V900H-14z" />
            <path d={CITY_PATH} />
          </g>
          <g stroke="#2d3359" fill="none" opacity=".7"><path d="M1050 605V245m-80 82 80-82 80 82M1020 310h60M984 387h132M1027 453h46M970 327l-105 168m265-168 95 165M865 495h360" strokeWidth="3" /><path d="M1050 245v-100m-60 58h120M1017 170h66" strokeWidth="2" /></g>
          <g fill="none" stroke="#5d5390" strokeWidth="2.5"><circle className="lain-portal-node-halo" cx="1050" cy="245" r="14" opacity=".22" /><circle className="lain-portal-node-halo" cx="865" cy="495" r="11" opacity=".22" /><circle className="lain-portal-node-halo" cx="1225" cy="492" r="11" opacity=".22" /></g>
          <g fill="#252b4a" opacity=".55"><circle className="lain-portal-node" cx="1050" cy="245" r="8" /><circle className="lain-portal-node" cx="865" cy="495" r="5" /><circle className="lain-portal-node" cx="1225" cy="492" r="5" /></g>
          <g transform="translate(820 160)">
            <circle cx="195" cy="225" r="215" fill="none" stroke="#f6f0ff" strokeWidth="2" strokeOpacity=".42" />
            <circle className="lain-portal-ring-inner" cx="195" cy="225" r="178" fill="none" stroke="#474367" strokeOpacity=".43" strokeDasharray="5 13" />
            <circle cx="195" cy="225" r="140" fill={`url(#${portalId})`} opacity=".86" />
            <path d="M195 85v280M55 225h280M96 126l198 198m0-198L96 324" stroke="#e5dfff" strokeOpacity=".28" />
            <circle className="lain-portal-core-glow" cx="195" cy="225" r="56" fill={`url(#${glowId})`} />
            <path d="M165 225h60m-30-30v60" stroke="#f8f4ff" strokeWidth="2" strokeOpacity=".7" />
          </g>
          <path fill="#444664" opacity=".56" d="M0 764h1440v136H0z" /><path d="M0 764h1440" stroke="#d8d2ed" strokeOpacity=".45" />
          <path fill={`url(#${scanId})`} d="M0 0h1440v900H0z" />
          <g fontFamily="monospace" fontSize="15" letterSpacing="3" fill="#373754" opacity=".68"><text x="58" y="85">RAMDEL / SIGNAL FIELD 02</text><text x="1060" y="840">PORTAL — 01</text></g>
        </svg>
      ) : (
        <Image src={src} alt="" fill priority className="lain-artwork" sizes="100vw" />
      )}
      <span className="lain-signal lain-signal-one" />
      <span className="lain-signal lain-signal-two" />
      <span className="lain-signal lain-signal-three" />
      <span className="lain-visual-index">01 / SIGNAL</span>
    </div>
  );
}
