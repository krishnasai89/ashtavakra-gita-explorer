"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import historyData from "@/data/history.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HistoryExplorer() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bento Grid Reveal Elements
      gsap.from(".bento-element", {
        opacity: 1,
        y: 40,
        // filter: "blur(8px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".bento-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 2. Timeline Grid Stagger Trigger
      gsap.from(".timeline-card", {
        opacity: 1,
        y: 30,
        // filter: "blur(6px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const {
    bookTitle,
    geographicalSetting,
    historicalIdentities,
    scholarlyDatingDebate,
  } = historyData;

  return (
    <section
      ref={sectionRef}
      id="history-section"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-32 border-t border-neutral-900/60 pt-28 relative z-10 overflow-hidden"
    >
      {/* Background Refraction Glow Filter Ambient Sphere */}
      <div className="absolute top-1/2 right-10 h-96 w-96 rounded-full bg-violet-600/[0.01] blur-[150px] pointer-events-none" />

      {/* Header Framework Area */}
      <header className="mb-20 border-b border-white/[0.03] pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-400/80 px-4 py-1.5 rounded-full border border-violet-500/10 bg-violet-950/10 inline-block">
              {bookTitle.iast} &#47;&#47; {bookTitle.meaning}
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif">
              {bookTitle.english}
            </h2>
          </div>
          <span className="font-serif text-3xl sm:text-5xl text-neutral-600 tracking-widest md:text-right font-normal">
            {bookTitle.sanskrit}
          </span>
        </div>
      </header>

      {/* Asymmetric Bento Matrix Layout */}
      <div className="bento-container grid grid-cols-1 md:grid-cols-12 gap-6 mb-28">
        {/* Core Block: The Sage Profile Frame */}
        <div className="bento-element lg:col-span-8 md:col-span-7 border border-white/[0.04] bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[300px] relative shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="text-left space-y-4">
            <span className="font-mono text-[9px] tracking-[0.3em] text-violet-400 uppercase bg-violet-950/20 border border-violet-500/10 px-2.5 py-0.5 rounded">
              THE SAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-neutral-100 font-serif">
              Ashtavakra
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400 font-sans font-light max-w-2xl pt-2">
              {historicalIdentities.ashtavakra.profile}
            </p>
          </div>
          <div className="mt-8 font-mono text-[9px] tracking-[0.2em] text-neutral-600 border-t border-white/[0.03] pt-4 text-left">
            IDENTITY CONTEXT // EPIC MAHABHARATA REFERENCE HOOK
          </div>
        </div>

        {/* Anchor Block: Sovereign Realm Specifications Grid Node */}
        <div className="bento-element lg:col-span-4 md:col-span-5 border border-white/[0.04] bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[300px] relative shadow-2xl overflow-hidden text-left border-t-2 border-t-violet-500/10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
              GEOGRAPHICAL SETTING
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-neutral-200 font-light tracking-wide">
              {geographicalSetting.kingdom}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light pt-1">
              Governed during this historic non-dual philosophical debate axis
              by ruler:{" "}
              <span className="text-neutral-200 font-mono font-medium underline underline-offset-4 decoration-white/10">
                {geographicalSetting.rulerAtTime}
              </span>
              .
            </p>
          </div>
          <div className="h-[1px] bg-white/[0.03] w-full my-4" />
          <span className="text-[10px] font-mono tracking-widest text-violet-400/80 uppercase">
            SOVEREIGN REALM OF PERFECTION
          </span>
        </div>

        {/* Lower Banner Block: The Seeker Row Box */}
        <div className="bento-element lg:col-span-12 md:col-span-12 border border-white/[0.04] bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/[0.04] pb-4 md:pb-0 md:pr-6 text-left space-y-1">
            <span className="font-mono text-[9px] tracking-[0.3em] text-violet-400 uppercase">
              THE SEEKER
            </span>
            <h3 className="text-2xl font-light text-neutral-100 font-serif">
              King Janaka
            </h3>
          </div>
          <div className="md:col-span-9 text-left">
            <p className="text-sm leading-relaxed text-neutral-400 font-sans font-light max-w-4xl">
              {historicalIdentities.janaka.profile}
            </p>
          </div>
        </div>
      </div>

      {/* Historiography Timeline Section Container */}
      <div className="timeline-container border-t border-white/[0.03] pt-20">
        <div className="mb-14 text-left space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            CHRONOLOGICAL HISTORIOGRAPHY
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-white font-serif tracking-tight">
            The Scholarly Dating Debate
          </h3>
        </div>

        {/* Dynamic Multi-Column Chronicle Grid Array */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {scholarlyDatingDebate.map((item, idx) => (
            <div
              key={idx}
              className="timeline-card border border-white/[0.04] bg-[#090909]/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative shadow-xl transition-all duration-300 hover:border-white/10 group"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/[0.02] border border-white/10 text-violet-300 font-mono text-[10px] tracking-widest uppercase">
                    {item.estimatedTimeline}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-700 tracking-widest group-hover:text-violet-500/60 transition-colors">
                    &#47;&#47; 0{idx + 1}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-serif font-light text-neutral-200 tracking-wide">
                    {item.scholar}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                    {item.designation}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-neutral-400 font-sans font-light border-t border-white/[0.03] pt-4">
                  {item.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
