"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const lensRef = useRef(null);

  useEffect(() => {
    // Disable completely on mobile touch devices where hovering doesn't exist
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lens = lensRef.current;

    // Initialize the lens at zero scale so it is perfectly hidden on load
    gsap.set(lens, { xPercent: -50, yPercent: -50, scale: 0 });

    const trackMovement = (e) => {
      // The lens follows the coordinates with a soft, natural, unhurried lag
      gsap.to(lens, {
        x: e.clientX,
        y: e.clientY,
        scale: 1, // Becomes visible only when moving
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const hideLensOnStill = () => {
      // When the mouse stops moving, the lens gently fades back into the background space
      gsap.to(lens, {
        scale: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    // Simple debounce to track when the user stops physical movement
    let movementTimer;
    const handleMouseMove = (e) => {
      trackMovement(e);
      clearTimeout(movementTimer);
      movementTimer = setTimeout(hideLensOnStill, 150);
    };

    // Hovering over interactive chapters expands the consciousness field
    const onHoverEnter = () => {
      gsap.to(lens, {
        width: "250px",
        height: "250px",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onHoverLeave = () => {
      gsap.to(lens, {
        width: "120px",
        height: "120px",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic attachment to chapter cards and action points
    const elements = document.querySelectorAll("a, button, .chapter-card");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(movementTimer);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Liquid SVG distortion filter to give the light lens an organic, water-like edge */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lens-liquid-bleed">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -12"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* The Background Witness Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-difference">
        <div
          ref={lensRef}
          style={{ filter: "url(#lens-liquid-bleed)" }}
          className="fixed top-0 left-0 w-[120px] h-[120px] rounded-full bg-gradient-to-b from-white via-neutral-200 to-violet-300 pointer-events-none will-change-transform opacity-90 blur-[2px]"
        />
      </div>
    </>
  );
}
