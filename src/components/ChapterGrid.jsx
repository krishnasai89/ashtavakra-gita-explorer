"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ChapterGrid({ chapters }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!chapters || chapters.length === 0) return;

    const ctx = gsap.context(() => {
      // Hardware-accelerated fluid text expansion on viewport intersection
      gsap.fromTo(
        ".chapter-card-node",
        { opacity: 0, y: 35, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".grid-index-mesh",
            start: "top 85%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [chapters]);

  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-32 font-mono text-xs text-neutral-500 tracking-[0.4em] uppercase animate-pulse">
        &#47;&#47; INITIALIZING TEXT INDEX MATRIX SYSTEM...
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      id="chapter-grid-section"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-32 pt-28 relative z-10"
    >
      {/* Structural Title Header Block */}
      <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
        <div className="space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-400/80 px-4 py-1.5 rounded-full border border-violet-500/10 bg-violet-950/10 inline-block">
            STRUCTURAL NAVIGATION INDEX
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
            The 20 Chapters of Awareness
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase border border-white/5 bg-white/[0.01] px-4 py-2 rounded-xl h-fit">
          COUNT // {chapters.length} SECTIONS DISSOLVED
        </span>
      </div>

      {/* Asymmetric Bento Grid Layout Mesh */}
      <div className="grid-index-mesh grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {chapters.map((ch) => {
          // Assign strategic emphasis to anchor chapters by expanding their grid footprint
          const isFeaturedChapter =
            ch.chapter === 1 || ch.chapter === 2 || ch.chapter === 20;

          // Secure layout tracking string to completely bypass index formatting overflows
          const formattedIndex =
            ch.chapter < 10 ? `0${ch.chapter}` : ch.chapter;

          return (
            <Link
              href={`/chapter/${ch.chapter}`}
              key={ch.chapter}
              className={`chapter-card-node group relative block p-6 sm:p-8 rounded-2xl border border-white/[0.04] bg-[#090909]/30 backdrop-blur-md transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.02] hover:-translate-y-1 text-left flex flex-col justify-between overflow-hidden shadow-2xl ${
                isFeaturedChapter
                  ? "md:col-span-2 lg:col-span-2 border-t-2 border-t-violet-500/20"
                  : ""
              }`}
            >
              {/* Specular Liquid Glass Angle Flare Overlay */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-violet-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

              <div>
                {/* Micro Meta Header Bar */}
                <div className="flex items-center justify-between mb-6 border-b border-white/[0.03] pb-4">
                  <span className="font-mono text-[11px] font-bold text-violet-300 bg-violet-950/40 px-3 py-1 rounded-full border border-violet-500/10 shadow-inner">
                    {formattedIndex}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 group-hover:text-neutral-300 transition-colors flex items-center gap-1.5">
                    EXPLORE VERSES{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>

                {/* Typography Container Area */}
                <div className="space-y-2">
                  <h3
                    className={`font-serif font-light text-neutral-200 group-hover:text-white transition-colors tracking-wide ${
                      isFeaturedChapter ? "text-xl sm:text-2xl" : "text-lg"
                    }`}
                  >
                    {ch.title}
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase leading-relaxed max-w-2xl">
                    {ch.description}
                  </p>
                </div>
              </div>

              {/* Metric Verification Base Info */}
              <div className="mt-8 pt-4 border-t border-white/[0.03] flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-600">
                <span>TOTAL_VERSES // {ch.verses?.length || 0}</span>
                <span className="opacity-0 group-hover:opacity-100 text-violet-400 font-bold transition-all duration-500 scale-95 group-hover:scale-100 tracking-[0.2em]">
                  WITNESS NOW
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
