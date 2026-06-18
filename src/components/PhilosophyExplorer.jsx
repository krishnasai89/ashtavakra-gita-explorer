"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import philosophyData from "@/data/philosophy.json";

export default function PhilosophyExplorer() {
  const [selectedConcept, setSelectedConcept] = useState("sakshi");
  const contentWrapperRef = useRef(null);

  const currentConceptData = philosophyData.coreTeachings.find(
    (item) => item.id === selectedConcept,
  );

  // High-performance dynamic blur-fade transition whenever selection changes
  useEffect(() => {
    if (!contentWrapperRef.current) return;

    gsap.fromTo(
      contentWrapperRef.current,
      { opacity: 0, y: 15, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      },
    );
  }, [selectedConcept]);

  return (
    <section
      id="philosophy-section"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-32 border-t border-neutral-900/60 pt-28 relative z-10"
    >
      {/* Structural Ambient Reflection Sphere */}
      <div className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-violet-500/[0.01] blur-[130px] pointer-events-none" />

      {/* Metaphysical Header Block */}
      <div className="mb-16 text-left space-y-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-400/80 px-4 py-1.5 rounded-full border border-violet-500/10 bg-violet-950/10 inline-block">
          METAPHYSICS & COMMENTARY // {philosophyData.philosophicalFramework}
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif">
          The Non-Dual Dialogue
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-sans font-light leading-relaxed">
          The {philosophyData.dialogueStructure.format} between{" "}
          <span className="text-neutral-200 font-medium">
            {philosophyData.dialogueStructure.teacher}
          </span>{" "}
          and{" "}
          <span className="text-neutral-200 font-medium">
            {philosophyData.dialogueStructure.student}
          </span>{" "}
          completely bypasses standard religious dogma to address the nature of
          absolute awareness directly.
        </p>
      </div>

      {/* Master Interactive Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Hand Section Console: Interactive Selection Bar */}
        <div className="lg:col-span-4 flex flex-col gap-2.5 w-full text-left bg-[#090909]/20 border border-white/[0.03] p-4 rounded-2xl backdrop-blur-md shadow-2xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-2 px-2 font-bold block">
            &#47;&#47; SELECT CORE PRINCIPLE
          </span>

          {philosophyData.coreTeachings.map((item) => {
            const isSelected = selectedConcept === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedConcept(item.id)}
                className={`w-full text-left p-4 rounded-xl font-mono text-[11px] tracking-widest uppercase transition-all duration-300 border cursor-pointer relative group overflow-hidden ${
                  isSelected
                    ? "bg-white text-black border-white font-semibold shadow-2xl scale-[1.02]"
                    : "bg-white/[0.01] text-neutral-400 border-white/5 hover:border-white/10 hover:text-neutral-200 hover:bg-white/[0.03]"
                }`}
              >
                {/* Visual hover focus cue inside item row */}
                {!isSelected && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-violet-400 transition-all duration-300 group-hover:h-1/2" />
                )}
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Right Hand Section Console: Dynamic Visualizer Data Windows */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* Active Principle Manifest Display Window */}
          <div className="border border-white/[0.04] bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[280px] relative shadow-2xl overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Dynamic Content Animation Target Wrapper */}
            <div
              ref={contentWrapperRef}
              className="space-y-6 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
                <span className="font-mono text-[10px] text-violet-300 font-medium tracking-[0.3em] uppercase bg-violet-950/30 border border-violet-500/10 px-2.5 py-0.5 rounded">
                  ⚡ {currentConceptData?.concept}
                </span>
                <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase hidden sm:inline-block">
                  STATUS: PURE WITNESS
                </span>
              </div>

              <h3 className="text-2xl font-light text-white font-serif">
                {currentConceptData?.title}
              </h3>

              <p className="text-sm sm:text-base font-sans font-light text-neutral-300 leading-relaxed max-w-3xl">
                {currentConceptData?.description}
              </p>
            </div>

            {/* Micro Execution Footer Spec */}
            <div className="mt-8 text-[11px] text-neutral-500 font-mono tracking-wider border-t border-white/[0.03] pt-4 flex items-center gap-2">
              <span className="text-neutral-700">
                &#47;&#47; OPERATIONAL REALIZATION:
              </span>
              <q className="italic text-neutral-400 font-serif lowercase tracking-normal">
                I am not the instrument; I am the space in which the instrument
                exists.
              </q>
            </div>
          </div>

          {/* Core Master Commentary Insight Block */}
          <div className="border border-white/[0.04] bg-[#090909]/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl text-left relative shadow-2xl overflow-hidden border-t-2 border-t-amber-500/10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.03] pb-4 mb-5">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400 uppercase font-bold block">
                  MASTER COMMENTARY PERSPECTIVE
                </span>
                <h4 className="text-lg font-serif font-light text-neutral-200 tracking-wide">
                  Osho: {philosophyData.oshoCommentary.seriesTitle}
                </h4>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase bg-amber-500/[0.03] border border-amber-500/10 px-3 py-1 rounded-full self-start sm:self-center">
                {philosophyData.oshoCommentary.scope}
              </span>
            </div>

            <div className="text-sm leading-relaxed text-neutral-400 font-sans font-light space-y-4">
              <p>
                {philosophyData.oshoCommentary.coreInsight} In classical
                translation frameworks, this entire non-dual transmission folds
                seamlessly into a single pristine dynamic:
              </p>

              {/* Premium Floating Quote Card */}
              <blockquote className="border-l-2 border-amber-500/40 pl-4 py-2 italic text-amber-200/90 font-serif text-base bg-amber-500/[0.02] p-4 rounded-r-xl leading-relaxed">
                {philosophyData.oshoCommentary.englishSynthesis}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
