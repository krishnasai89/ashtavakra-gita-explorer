"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function OriginStory() {
  const [activeTab, setActiveTab] = useState("curse");
  const contentBodyRef = useRef(null);

  const storyPhases = {
    curse: {
      title: "The Unborn Correction",
      subtitle: "THE EIGHT BENDS // PRE-BIRTH AXIS",
      text: "While still in his mother's womb, Ashtavakra noticed his father, Sage Kahola, reciting the Vedas incorrectly. When the child corrected him from inside the womb, the proud father grew angry and cursed his unborn son to be born with eight physical deformities.",
      insight:
        "True knowledge is entirely independent of the biological vessel.",
    },
    defeat: {
      title: "The Father's Fate",
      subtitle: "THE COURT OF JANAKA // WATER CONFINEMENT",
      text: "Seeking wealth to sustain his family, Kahola traveled to King Janaka's court to debate the legendary scholar Vandi. Kahola lost the high-stakes debate, where the penalty for failure was being bound and submerged in the deep river.",
      insight:
        "The stakes: Ultimate intellectual dominance or complete structural erasure.",
    },
    redemption: {
      title: "The 12-Year-Old Master",
      subtitle: "CONQUERING VANDI // THE SACRED DISSOLUTION",
      text: "At just twelve years old, having discovered his father's fate, Ashtavakra entered King Janaka's palace. The court laughed at his limping gait, but Ashtavakra silenced them, defeated Vandi in philosophical debate, and won back his father's freedom.",
      insight:
        "Vandi was actually Varuna's son, sending scholars to a celestial ritual realm, not an execution.",
    },
  };

  // Soft text layer change transition using a micro blur-fade timeline
  useEffect(() => {
    if (!contentBodyRef.current) return;

    gsap.fromTo(
      contentBodyRef.current,
      { opacity: 0, y: 10, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, [activeTab]);

  return (
    <section
      id="origin-story-section"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-32 border-t border-neutral-900/60 pt-28 relative z-10"
    >
      {/* Background Refraction Light Dust */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-violet-500/[0.01] blur-[120px] pointer-events-none" />

      {/* Main Structural Header Axis */}
      <div className="mb-16 text-left">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-400/80 px-4 py-1.5 rounded-full border border-violet-500/10 bg-violet-950/10 inline-block">
          THE BACKSTORY // THE UNBENDING AXIS
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-light tracking-tight text-white font-serif leading-tight">
          The Journey of Ashtavakra
        </h2>
      </div>

      {/* High-Contrast Bento Layout Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Interactive Chronicle Console Block */}
        <div className="lg:col-span-8 border border-white/[0.04] bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[420px] relative shadow-[0_24px_50px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div>
            {/* Custom Interactive Mode Navigation Ribbon */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-3 border-b border-white/[0.03] scrollbar-none">
              {Object.keys(storyPhases).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
                    activeTab === key
                      ? "bg-white text-black border-white font-semibold shadow-lg scale-105"
                      : "text-neutral-500 border-white/5 bg-white/[0.01] hover:text-neutral-300 hover:border-white/10"
                  }`}
                >
                  {storyPhases[key].title}
                </button>
              ))}
            </div>

            {/* Dynamic Content Panel Layer */}
            <div
              ref={contentBodyRef}
              className="space-y-4 text-left will-change-transform"
            >
              <span className="text-[10px] font-mono text-violet-400/80 uppercase tracking-[0.3em] bg-violet-950/20 border border-violet-500/10 px-2.5 py-0.5 rounded">
                {storyPhases[activeTab].subtitle}
              </span>
              <p className="text-lg sm:text-xl font-sans font-light leading-relaxed text-neutral-200 pt-2 max-w-3xl">
                {storyPhases[activeTab].text}
              </p>
            </div>
          </div>

          {/* Liquid Glass Bottom Metric Insight Bar */}
          <div className="mt-12 border-t border-white/[0.04] pt-5 font-mono text-[10px] tracking-widest text-neutral-400 flex items-start gap-3 bg-white/[0.01] -mx-8 -mb-8 p-6 rounded-b-2xl">
            <span className="text-violet-400 text-xs select-none">⚡</span>
            <p className="uppercase leading-normal text-left">
              <span className="text-neutral-600 font-bold">
                METAPHORICAL PARAMETER //
              </span>{" "}
              {storyPhases[activeTab].insight}
            </p>
          </div>
        </div>

        {/* Right Aspect Side Block: The Historic Cobbler Judgment Artifact */}
        <div className="lg:col-span-4 border border-white/[0.04] backdrop-blur-xs bg-gradient-to-br from-white/[0.02] to-transparent p-8 rounded-2xl flex flex-col justify-between relative shadow-2xl overflow-hidden text-left border-t-2 border-t-violet-500/20 group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          <div className="space-y-6">
            <h3 className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
              THE PREMISE OF FORM
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400 font-sans font-light">
              When entering the court, the assembled scholars laughed aloud at
              his crooked frame. Ashtavakra paused, then laughed louder. Shaken,
              King Janaka demanded an explanation. The twelve-year-old sage
              responded:
            </p>

            {/* Immersive Typographic Quote Block */}
            <blockquote className="border-l-2 border-violet-500/40 pl-4 py-1 italic text-neutral-100 font-serif text-base leading-relaxed bg-white/[0.01] p-3 rounded-r-xl">
              <q>
                I thought I was passing into a majestic assembly of enlightened
                minds, but I see I have entered a gathering of cobblers who only
                judge the quality of leather.
              </q>
            </blockquote>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.03] text-[9px] text-neutral-500 font-mono tracking-wider uppercase leading-relaxed">
            This strike broke the monarch's pride—instantly shifting King Janaka
            from a critic into a silent, humble seeker.
          </div>
        </div>
      </div>
    </section>
  );
}
