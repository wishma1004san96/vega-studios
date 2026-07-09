"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type ProximityValuePillProps = {
  label: string;
  radius?: number;
};

export default function ProximityValuePill({
  label,
  radius = 100,
}: ProximityValuePillProps) {
  const pillRef = useRef<HTMLButtonElement>(null);
  const proximity = useMotionValue(0);

  // Smoothed motion to avoid flicker and keep responsive transitions.
  const smooth = useSpring(proximity, {
    stiffness: 230,
    damping: 28,
    mass: 0.45,
  });

  const scale = useTransform(smooth, [0, 1], [1, 1.045]);
  const y = useTransform(smooth, [0, 1], [0, -3.5]);
  const borderColor = useTransform(smooth, [0, 1], [
    "rgba(255, 255, 255, 0.10)",
    "rgba(168, 209, 255, 0.88)",
  ]);
  const backgroundColor = useTransform(smooth, [0, 1], [
    "rgba(93, 95, 104, 0.25)",
    "rgba(74, 120, 206, 0.46)",
  ]);
  const textColor = useTransform(smooth, [0, 1], [
    "rgba(255, 255, 255, 0.90)",
    "rgba(236, 246, 255, 1)",
  ]);
  const boxShadow = useTransform(
    smooth,
    (value) =>
      `0 ${2 + value * 7}px ${8 + value * 22}px rgba(74, 120, 206, ${
        0.05 + value * 0.28
      }), 0 0 ${8 + value * 18}px rgba(120, 175, 255, ${0.04 + value * 0.22})`
  );

  useEffect(() => {
    let rafId = 0;

    const updateByPointer = (clientX: number, clientY: number) => {
      if (!pillRef.current) return;

      const rect = pillRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const nextValue = Math.max(0, 1 - distance / radius);

      proximity.set(nextValue);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateByPointer(event.clientX, event.clientY);
      });
    };

    const reset = () => {
      if (rafId) cancelAnimationFrame(rafId);
      proximity.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", reset, { passive: true });
    window.addEventListener("blur", reset);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [proximity, radius]);

  return (
    <motion.button
      ref={pillRef}
      type="button"
      className="core-value-pill"
      style={{
        scale,
        y,
        borderColor,
        backgroundColor,
        boxShadow,
        willChange: "transform, box-shadow",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.span style={{ color: textColor }}>{label}</motion.span>
    </motion.button>
  );
}
