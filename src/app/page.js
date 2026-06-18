"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OriginStory from "@/components/OriginStory";
import HistoryExplorer from "@/components/HistoryExplorer";
import PhilosophyExplorer from "@/components/PhilosophyExplorer";
import ChapterGrid from "@/components/ChapterGrid";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [hydratedData, setHydratedData] = useState([]);
  const [errorLog, setErrorLog] = useState(null);
  const [systemRestored, setSystemRestored] = useState(false);
  const [loading, setLoading] = useState(true);

  const restorationZoneRef = useRef(null);
  const flashOverlayRef = useRef(null);

  // 1. Safe Next.js Dynamic Import for JSON Assets
  useEffect(() => {
    import("../data/ashtavakra.json")
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          setHydratedData(data);
        } else if (data && data.chapters) {
          setHydratedData(data.chapters);
        }
      })
      .catch((err) => {
        console.error("Failed to map JSON data asset structure:", err);
        setErrorLog(
          "Could not locate or resolve your data file data/ashtavakra.json",
        );
      });
  }, []);

  // 2. Climax Activation: Dynamic Samanga River Restoration Timeline
  const triggerRestoration = () => {
    if (systemRestored) return;

    const tl = gsap.timeline({
      onStart: () => {
        // Play audio confirmation cues here if desired
      },
    });

    // Blinding white-to-violet liquid light expansion flash
    tl.to(flashOverlayRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.in",
    })
      .call(() => {
        // Toggle state cleanly at peak illumination to prevent visual layout pops
        setSystemRestored(true);
      })
      .to(flashOverlayRef.current, {
        opacity: 0,
        duration: 2.2,
        ease: "power3.out",
      })
      .fromTo(
        ".pulse-ring-node",
        { scale: 0.4, opacity: 0.8 },
        {
          scale: 3.2,
          opacity: 0,
          stagger: 0.25,
          duration: 2.4,
          ease: "power4.out",
        },
        "-=1.8",
      )
      .fromTo(
        ".restoration-card-node",
        { y: 30, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.6",
      );
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className="relative min-h-screen text-neutral-200 font-sans antialiased overflow-x-hidden bg-black/55">
        {/* Blinding Light Overlay Node for Climax Transition Burst */}
        <div
          ref={flashOverlayRef}
          className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-b from-white via-violet-100 to-emerald-50 opacity-0 will-change-opacity"
        />

        <Hero />
        <OriginStory />
        <HistoryExplorer />
        <PhilosophyExplorer />

        {errorLog && (
          <div className="mx-auto max-w-xl text-center p-4 my-8 rounded-xl border border-red-500/20 bg-red-950/10 font-mono text-xs text-red-400 uppercase tracking-widest">
            ⚠️ SYSTEM ERROR: {errorLog}
          </div>
        )}

        {/* Master Index Grid Section */}
        <ChapterGrid chapters={hydratedData} />

        {/* 👑 GRAND FINALE CLIMAX ZONE: The Liberation of Kahola */}
        <section
          ref={restorationZoneRef}
          className="max-w-5xl mx-auto px-4 sm:px-8 py-36 border-t border-white/[0.03] relative min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden"
        >
          {/* Dynamic background atmospheric color shifts */}
          <div
            className={`absolute h-[450px] w-[450px] rounded-full blur-[160px] transition-all duration-[2000ms] ease-in-out pointer-events-none ${
              systemRestored
                ? "bg-emerald-500/[0.04] scale-125 translate-y-10"
                : "bg-violet-600/[0.02] scale-100"
            }`}
          />

          {!systemRestored ? (
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-400 bg-violet-950/20 border border-violet-500/10 px-4 py-1.5 rounded-full inline-block">
                [ THE COURT OF JANAKA // THE DEBATE IS WON ]
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif leading-tight">
                Bandi is Defeated.
                <br />
                The Waters Run Deep.
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans font-light max-w-xl mx-auto">
                With the philosophical debate won, the binding spells fracture.
                Stand with his father, Kahola, at the edge of the sacred river
                to break the water-bound confinement and breathe life back into
                the submerged sages.
              </p>

              <button
                onClick={triggerRestoration}
                className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-xl shadow-violet-500/10 hover:shadow-violet-500/20 hover:scale-105 active:scale-95 cursor-pointer"
              >
                🌊 ENTER THE SAMANGA RIVER
              </button>
            </div>
          ) : (
            <div className="relative z-10 space-y-10 w-full max-w-3xl mx-auto">
              {/* Expansion Wave Shock Rings */}
              <div className="pulse-ring-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full border border-emerald-500/20 pointer-events-none will-change-transform" />
              <div className="pulse-ring-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full border border-violet-500/10 pointer-events-none will-change-transform" />

              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block font-semibold">
                  ✓ THE CURSE IS BROKEN // THE AXIS UNBENDS
                </span>
                <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight font-serif">
                  The Eight Bends Dissolve
                </h2>
              </div>

              {/* Liquid Glass Dynamic Revelation Document */}
              <div className="restoration-card-node p-6 sm:p-10 rounded-2xl border border-white/[0.04] bg-[#090909]/60 max-w-2xl mx-auto backdrop-blur-md relative shadow-2xl text-left">
                <div className="absolute top-0 right-16 h-[1px] w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <q className="text-lg sm:text-xl font-serif text-neutral-100 leading-relaxed mb-6 italic font-light">
                  Stepping into the holy waters, the eight physical deformities
                  vanish instantly from his frame. Beside his liberated father,
                  Ashtavakra stands completely straight, luminous, and
                  whole—ready to transmit the radical truth of absolute,
                  unconditioned freedom to King Janaka.
                </q>

                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 border-t border-white/[0.03] pt-4 flex flex-wrap gap-y-2 justify-between">
                  <span>SAGES LIBERATED // ALL</span>
                  <span>GEOMETRY // PERFECTLY VERTICAL</span>
                </div>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block mx-auto font-mono text-[10px] tracking-[0.3em] text-neutral-400 hover:text-white transition-colors uppercase underline decoration-emerald-500/60 hover:decoration-emerald-400 underline-offset-8 cursor-pointer pt-4"
              >
                &#47;&#47;ASCEND TO THE MASTER ACCORDION MATRIX &#92;&#92;
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
