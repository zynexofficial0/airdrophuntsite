'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TiltCard({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTransform(`perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    setTransform('perspective(1000px) rotateY(0deg) rotateX(0deg)');
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative rounded-xl glass overflow-hidden transition-shadow',
        glow && 'hover:glow-green',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(142 70% 45% / 0.15), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
