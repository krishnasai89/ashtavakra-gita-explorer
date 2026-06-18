"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Navbar() {
  const navRef = useRef(null);
  const filterTurbulenceRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [activeState, setActiveState] = useState("AWARENESS");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Elegant entrance reveal matching the Hero timeline parameters
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.2 },
    );

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;

      // Fully accurate spatial coordinate tracking across all layout segments
      if (scrollPos < windowHeight * 0.7) {
        setActiveState("AWARENESS");
      } else if (scrollPos < windowHeight * 1.8) {
        setActiveState("ORIGIN // PREMISE");
      } else if (scrollPos < windowHeight * 3.2) {
        setActiveState("HISTORY // CHRONICLE");
      } else if (scrollPos < windowHeight * 4.8) {
        setActiveState("PHILOSOPHY // DIALOGUE");
      } else {
        setActiveState("WITNESS // INDEX");
      }

      // 🌀 Dynamic liquid texture distortion updates based on scroll speed
      const velocity = Math.min(Math.abs(scrollPos - lastScrollY) || 2, 10);
      lastScrollY = scrollPos;

      gsap.to(filterTurbulenceRef.current, {
        attr: { baseFrequency: `0.01 ${0.02 + velocity * 0.005}` },
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Morphing clip-path timeline for the mobile glass panel overlay
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      gsap
        .timeline()
        .set(mobileMenuRef.current, { display: "flex" })
        .fromTo(
          mobileMenuRef.current,
          { clipPath: "circle(0% at 90% 4%)", opacity: 0 },
          {
            clipPath: "circle(150% at 90% 4%)",
            opacity: 1,
            duration: 0.75,
            ease: "power4.inOut",
          },
        )
        .fromTo(
          ".mobile-link-node",
          { y: 25, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4",
        );
      document.body.style.overflow = "hidden";
    } else {
      gsap
        .timeline()
        .to(".mobile-link-node", {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.03,
        })
        .to(
          mobileMenuRef.current,
          {
            clipPath: "circle(0% at 90% 4%)",
            opacity: 0,
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () =>
              gsap.set(mobileMenuRef.current, { display: "none" }),
          },
          "-=0.1",
        );
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Secure cross-layout scroll interpolation targeting with offset padding variables
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (sectionId === "hero") {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1.5,
        ease: "power4.inOut",
      });
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, autoKill: false, offsetY: 70 }, // 70px offset protects it from hiding behind the glass ribbon
      duration: 1.5,
      ease: "power4.inOut",
    });
  };

  return (
    <>
      {/* 🔮 The Liquid Glass Refraction Engine */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="liquid-glass-refraction">
            <feTurbulence
              ref={filterTurbulenceRef}
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
            <feGaussianBlur in="displacement" stdDeviation="4" result="blur" />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>
      </svg>

      {/* Main Glass Ribbon Axis */}
      <nav
        ref={navRef}
        style={{ filter: "url(#liquid-glass-refraction)" }}
        className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border-b border-white/[0.05] will-change-transform shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Core Brand Matrix Indicator */}
          <div className="flex items-center space-x-3 sm:space-x-4 z-50">
            <a
              href="#"
              onClick={(e) => scrollToSection(e, "hero")}
              className="font-serif text-sm tracking-[0.2em] text-neutral-100 hover:text-white transition-colors cursor-pointer"
            >
              अष्टावक्र
            </a>
            <span className="text-neutral-800 text-xs font-mono select-none">
              |
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-violet-400 font-semibold uppercase hidden xs:inline-block">
              {activeState}
            </span>
          </div>

          {/* DESKTOP CHANNEL GRID LINKS */}
          <div className="hidden md:flex items-center space-x-8 font-mono text-[10px] tracking-[0.2em] uppercase">
            <a
              href="#origin"
              onClick={(e) => scrollToSection(e, "origin-story-section")}
              className="text-neutral-400 hover:text-neutral-200 transition-colors duration-300 relative group py-2"
            >
              ORIGIN
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#history"
              onClick={(e) => scrollToSection(e, "history-section")}
              className="text-neutral-400 hover:text-neutral-200 transition-colors duration-300 relative group py-2"
            >
              HISTORY
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#philosophy"
              onClick={(e) => scrollToSection(e, "philosophy-section")}
              className="text-neutral-400 hover:text-neutral-200 transition-colors duration-300 relative group py-2"
            >
              PHILOSOPHY
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#chapters"
              onClick={(e) => scrollToSection(e, "chapter-grid-section")}
              className="text-neutral-200 hover:text-white transition-all duration-300 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/[0.08] hover:scale-105 active:scale-95 cursor-pointer"
            >
              INDEX
            </a>
          </div>

          {/* MOBILE TOGGLE MECHANISM */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle structural layout tracking vector"
          >
            <span
              className={`block w-5 h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-[1px] bg-white transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* 🌊 LIQUID RIPPLE MOBILE PANEL OVERLAY OVERLAY */}
      <div
        ref={mobileMenuRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-40 bg-[#030303]/98 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 font-mono text-xs tracking-[0.3em] uppercase"
      >
        <div className="absolute w-72 h-72 rounded-full bg-violet-500/[0.02] blur-[100px] pointer-events-none" />

        <a
          href="#origin"
          onClick={(e) => scrollToSection(e, "origin-story-section")}
          className="mobile-link-node text-neutral-400 hover:text-white transition-colors duration-300 py-2 border-b border-white/5 w-48 text-center"
        >
          ORIGIN
        </a>

        <a
          href="#history"
          onClick={(e) => scrollToSection(e, "history-section")}
          className="mobile-link-node text-neutral-400 hover:text-white transition-colors duration-300 py-2 border-b border-white/5 w-48 text-center"
        >
          HISTORY
        </a>

        <a
          href="#philosophy"
          onClick={(e) => scrollToSection(e, "philosophy-section")}
          className="mobile-link-node text-neutral-400 hover:text-white transition-colors duration-300 py-2 border-b border-white/5 w-48 text-center"
        >
          PHILOSOPHY
        </a>

        <a
          href="#chapters"
          onClick={(e) => scrollToSection(e, "chapter-grid-section")}
          className="mobile-link-node text-neutral-200 hover:text-white bg-white/[0.03] border border-white/10 px-8 py-3 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-300 active:scale-95 text-center w-48"
        >
          INDEX MATRIX
        </a>

        <div className="absolute bottom-8 text-[8px] tracking-[0.5em] text-neutral-600">
          / SYS.MODE // MOBILE_WITNESS_AXIS /
        </div>
      </div>
    </>
  );
}
