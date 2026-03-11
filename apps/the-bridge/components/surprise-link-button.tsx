"use client";

import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";

type Burst = { id: number; vectors: Array<{ dx: number; dy: number; emoji: string }> };

export function SurpriseLinkButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const emojis = useMemo(() => ["💥", "✨", "⚡", "🪐", "🌟"], []);

  function triggerBurst() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const vectors = Array.from({ length: 10 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.35;
      const radius = 24 + Math.random() * 32;
      return {
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });

    setBursts((prev) => [...prev, { id, vectors }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 700);
  }

  return (
    <span className="relative inline-flex">
      <Link href={href} onClick={triggerBurst} className={className}>
        {children}
      </Link>

      {bursts.map((burst) => (
        <span key={burst.id} className="pointer-events-none absolute left-1/2 top-1/2 z-20">
          {burst.vectors.map((v, idx) => (
            <span
              key={`${burst.id}-${idx}`}
              className="particle"
              style={{
                ["--dx" as string]: `${v.dx}px`,
                ["--dy" as string]: `${v.dy}px`,
              }}
            >
              {v.emoji}
            </span>
          ))}
        </span>
      ))}

      <style jsx>{`
        .particle {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: particle-burst 680ms ease-out forwards;
          font-size: 12px;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
        }

        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.05);
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
