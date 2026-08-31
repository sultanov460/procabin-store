"use client";

import { useEffect, useRef, useState } from "react";

// A small, dependency-free stand-in for the "MotionReveal" component the
// brief asked for. `motion` isn't installed and this sandbox has no
// network access to add it — this delivers the same visible behavior
// (gentle opacity/translateY reveal, once, respecting reduced-motion)
// using IntersectionObserver + CSS transitions instead of a library.
// Animates only opacity/transform, so it's cheap and doesn't affect layout.
export function MotionReveal({
  children,
  className = "",
  delayMs = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: show immediately, no transition.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // once: true
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[600ms] ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
