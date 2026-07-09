"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type ProximityButtonProps = {
  label: string;
  radius?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ProximityButton({
  label,
  radius = 120,
}: ProximityButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef(0);
  const latestPointerRef = useRef({ x: -9999, y: -9999 });

  const proximityRaw = useMotionValue(0);
  const pointerLocalX = useMotionValue(88);
  const pointerLocalY = useMotionValue(22);

  // 250-350ms-ish easing behavior via spring for smooth, no-flicker transitions.
  const proximity = useSpring(proximityRaw, {
    stiffness: 240,
    damping: 30,
    mass: 0.42,
  });
  const localX = useSpring(pointerLocalX, { stiffness: 300, damping: 34, mass: 0.36 });
  const localY = useSpring(pointerLocalY, { stiffness: 300, damping: 34, mass: 0.36 });

  const scale = useTransform(proximity, [0, 1], [1, 1.045]);
  const y = useTransform(proximity, [0, 1], [0, -3.2]);
  const borderColor = useTransform(proximity, [0, 1], [
    "rgba(255, 255, 255, 0.10)",
    "rgba(171, 217, 255, 0.92)",
  ]);
  const backgroundColor = useTransform(proximity, [0, 1], [
    "rgba(93, 95, 104, 0.25)",
    "rgba(65, 119, 223, 0.44)",
  ]);
  const textColor = useTransform(proximity, [0, 1], [
    "rgba(255, 255, 255, 0.90)",
    "rgba(240, 249, 255, 1)",
  ]);

  const glowShadow = useTransform(
    proximity,
    (value) =>
      `0 ${2 + value * 6}px ${8 + value * 18}px rgba(66, 133, 255, ${
        0.04 + value * 0.24
      }), 0 0 ${8 + value * 20}px rgba(110, 177, 255, ${0.03 + value * 0.23})`
  );

  const lightAlpha = useTransform(proximity, [0, 1], [0, 0.5]);
  const lightGradient = useMotionTemplate`radial-gradient(140px circle at ${localX}px ${localY}px, rgba(131, 194, 255, ${lightAlpha}), rgba(131, 194, 255, 0) 70%)`;

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const pointerX = latestPointerRef.current.x;
      const pointerY = latestPointerRef.current.y;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = pointerX - centerX;
      const dy = pointerY - centerY;
      const distance = Math.hypot(dx, dy);
      const normalized = clamp(1 - distance / radius, 0, 1);

      proximityRaw.set(normalized);
      pointerLocalX.set(clamp(pointerX - rect.left, 0, rect.width));
      pointerLocalY.set(clamp(pointerY - rect.top, 0, rect.height));
    };

    const onPointerMove = (event: PointerEvent) => {
      latestPointerRef.current.x = event.clientX;
      latestPointerRef.current.y = event.clientY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const onPointerLeave = () => {
      proximityRaw.set(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, [pointerLocalX, pointerLocalY, proximityRaw, radius]);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className="core-value-pill"
      style={{
        scale,
        y,
        borderColor,
        backgroundColor,
        boxShadow: glowShadow,
        willChange: "transform, box-shadow, border-color, background-color",
      }}
    >
      <motion.span
        className="core-value-light"
        style={{ backgroundImage: lightGradient }}
        aria-hidden="true"
      />
      <motion.span className="core-value-label" style={{ color: textColor }}>
        {label}
      </motion.span>
    </motion.button>
  );
}
