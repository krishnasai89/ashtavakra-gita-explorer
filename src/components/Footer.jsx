"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Footer() {
  const footerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = (e) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.8,
      ease: "power4.inOut",
    });
  };

  // Cross-route safety mechanism for footer navigation nodes
  const handleNavigation = (e, targetId) => {
    e.preventDefault();

    if (pathname === "/") {
      // If on home, execute premium fluid scroll
      const target = document.getElementById(targetId);
      if (!target) return;
      gsap.to(window, {
        scrollTo: { y: target, autoKill: false, offsetY: 70 },
        duration: 1.5,
        ease: "power4.inOut",
      });
    } else {
      // If inside a sub-route directory, fallback to home with string parameter parameters
      router.push(`/#${targetId}`);
    }
  };

  return (
    <>
      {/* 🔮 The Liquid Basin Refraction Filter */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="liquid-basin-refraction">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
            <feGaussianBlur in="displacement" stdDeviation="2" result="blur" />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>
      </svg>

      {/* Main Fluid Footer Shield */}
      <footer
        ref={footerRef}
        style={{ filter: "url(#liquid-basin-refraction)" }}
        className="w-full bg-gradient-to-t from-white/[0.03] via-white/[0.01] to-transparent backdrop-blur-2xl border-t border-white/[0.05] pt-24 pb-12 mt-32 relative overflow-hidden"
      >
        {/* Subtle Specular Highlights Layer */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-48 w-full max-w-4xl bg-violet-500/[0.01] blur-[120px] pointer-events-none" />

        {/* Fully Responsive Grid Container Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 border-b border-white/[0.04] pb-16 relative z-10">
          {/* Column 1: Core Metaphor (Spans 5 Columns on desktop) */}
          <div className="space-y-4 text-left sm:col-span-2 md:col-span-5">
            <h3 className="font-serif text-base sm:text-lg tracking-[0.2em] text-neutral-200">
              अष्टावक्र गीता
            </h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-sm uppercase tracking-wider font-light">
              The world is a temporary reflection occurring inside the flawless,
              continuous mirror of your boundless consciousness.
            </p>
          </div>

          {/* Column 2: Structural Navigation Channels (Spans 3 Columns on desktop) */}
          <div className="flex flex-col space-y-3 font-mono text-[10px] tracking-[0.2em] uppercase text-left md:col-span-3 md:items-center">
            <div className="space-y-3 md:text-left w-full sm:max-w-[140px]">
              <p className="text-neutral-600 font-bold mb-4 text-[9px]">
                // PATHWAYS
              </p>

              <a
                href="#"
                onClick={scrollToTop}
                className="block text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                AWARENESS
              </a>

              <Link
                href="/#origin-story-section"
                onClick={(e) => handleNavigation(e, "origin-story-section")}
                className="block text-neutral-400 hover:text-white transition-colors duration-300"
              >
                ORIGIN TEXT
              </Link>

              <Link
                href="/#chapter-grid-section"
                onClick={(e) => handleNavigation(e, "chapter-grid-section")}
                className="block text-neutral-400 hover:text-white transition-colors duration-300"
              >
                INDEX MATRIX
              </Link>
            </div>
          </div>

          {/* Column 3: Status Tracking Parameters (Spans 4 Columns on desktop) */}
          <div className="space-y-4 text-left sm:col-span-2 md:col-span-4 md:text-right flex flex-col md:items-end justify-between min-h-[100px] md:min-h-0">
            <div className="space-y-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-emerald-400/90 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1 rounded-full inline-block font-semibold">
                STATUS // UNCONDITIONED
              </span>
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest pt-1">
                FORMLESS MATRIX V.2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 font-mono text-[9px] tracking-[0.3em] text-neutral-600 uppercase">
          <div className="text-center sm:text-left">
            © 2026 ASHTAVAKRA CORE // CODE TO ART
          </div>
          <button
            onClick={scrollToTop}
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer text-[10px]"
          >
            ASCEND TO SOURCE CORES{" "}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 text-xs">
              ↑
            </span>
          </button>
        </div>
      </footer>
    </>
  );
}
