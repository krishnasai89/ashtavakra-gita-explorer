"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const asciiRef = useRef(null);
  const phraseRef = useRef(null);
  const filterBlurRef = useRef(null);
  const filterMatrixRef = useRef(null);

  // Absolute Sanskrit ASCII Art for "साक्षी" (The Witness Core)
  const sanskritAscii = [
    "    ███████╗  █████╗  ██╗  ██╗ ██████╗██╗",
    "    ██╔════╝ ██╔══██╗ ╚██╗██╔╝██╔════╝██║",
    "    ███████╗ ███████║  ╚███╔╝ ██║     ██║",
    "    ╚════██║ ██╔══██║  ██╔██╗ ██║     ██║",
    "    ███████║ ██║  ██║ ██╔╝ ██╗╚██████╗██║",
    "    ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═════╝╚═╝",
  ].join("\n");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Initial Still Presentation Node
      tl.fromTo(
        [asciiRef.current, phraseRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 },
      )

        // 2. The Dissolution: Liquid Goo Filter Morphing
        // The sharp borders of the human construct melt into fluid formless space
        .to("#liquid-blur-core stdDeviation", {
          attr: { stdDeviation: "35" },
          duration: 1.6,
          ease: "power2.in",
          delay: 0.5,
        })
        .to(
          "#liquid-matrix-core",
          {
            attr: { values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -12" },
            duration: 1.6,
            ease: "power2.in",
          },
          "<",
        )

        // Softly dim the melting form
        .to(
          asciiRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 1.4,
            ease: "power2.in",
          },
          "<",
        )

        // 3. Absolute Clarity Exit
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.2",
        );

      // Soft, organic ambient pulsing representing an unhurried, resting breath
      gsap.to(".ambient-glow-source", {
        scale: 1.3,
        opacity: 0.08,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-neutral-100 select-none overflow-hidden"
    >
      {/* Liquid Color Matrix Layer Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="preloader-dissolve-filter">
            <feGaussianBlur
              ref={filterBlurRef}
              id="liquid-blur-core"
              in="SourceGraphic"
              stdDeviation="0.1"
              result="blur"
            />
            <feColorMatrix
              ref={filterMatrixRef}
              id="liquid-matrix-core"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Ambient Pulsing Light Layer: The Inner Space */}
      <div className="ambient-glow-source absolute h-[450px] w-[450px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Main Execution Container */}
      <div
        style={{ filter: "url(#preloader-dissolve-filter)" }}
        className="flex flex-col items-center justify-center space-y-10 text-center px-4"
      >
        {/* Shimmering ASCII Expression of "साक्षी" */}
        <pre
          ref={asciiRef}
          className="font-mono text-[9px] sm:text-xs md:text-sm leading-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 via-violet-300 to-neutral-500 select-none whitespace-pre tracking-widest"
        >
          {sanskritAscii}
        </pre>

        {/* Narrative Indication Frame */}
        <div ref={phraseRef} className="space-y-3">
          <q className="font-serif text-lg md:text-xl font-light text-neutral-200 tracking-wide italic max-w-sm mx-auto">
            You are the unattached, unconditioned observer of all changing
            things.
          </q>
          <div className="flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-600">
            <span>HUMAN NATURE</span>
            <span className="text-neutral-800">•</span>
            <span>DISSOLVING TO WITNESS</span>
          </div>
        </div>
      </div>

      {/* Crystalline Status Axis Indicator */}
      <div className="absolute bottom-12 font-mono text-[9px] tracking-[0.5em] text-neutral-700 uppercase">
        &#47; &#47; RESTING IN TRUE SELF-AWARENESS &#92; &#92;
      </div>
    </div>
  );
}
