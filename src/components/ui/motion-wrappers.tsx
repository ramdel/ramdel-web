'use client';

import * as motion from 'motion/react-client';

// ─── Fade-in + slide-up on scroll ──────────────────────────────────────────
interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger parent ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger child ─────────────────────────────────────────────────────────
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle upward lift on hover — useful for clickable cards */
  hover?: boolean;
}

export function StaggerItem({ children, className, hover = false }: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={hover ? { y: -5, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
