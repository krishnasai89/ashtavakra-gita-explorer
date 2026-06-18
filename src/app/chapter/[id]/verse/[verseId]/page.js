"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

export default function VersePage() {
  const params = useParams();
  const [verseData, setVerseData] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);

  useEffect(() => {
    import("../../../../../data/ashtavakra.json")
      .then((module) => {
        const data = module.default;
        const chaptersList = Array.isArray(data) ? data : data.chapters || [];

        const currentChapter = chaptersList.find(
          (c) => String(c.chapter) === String(params.id),
        );
        if (currentChapter) {
          setChapterTitle(currentChapter.title);
          const foundVerse = currentChapter.verses?.find((v, index) => {
            const currentVerseNum = v.id
              ? v.id.split(".")[1]
              : String(index + 1);
            return String(currentVerseNum) === String(params.verseId);
          });
          setVerseData(foundVerse);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to map target shloka stream context:", err);
        setLoading(false);
      });
  }, [params.id, params.verseId]);

  useEffect(() => {
    if (loading || !verseData) return;

    const ctx = gsap.context(() => {
      // Smooth fluid scaling entrance matching the platform core language
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.99, filter: "blur(4px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".animate-up",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.15,
        },
      );
    }, stageRef);

    return () => ctx.revert();
  }, [loading, verseData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030303] font-mono text-[10px] tracking-[0.4em] text-neutral-500 uppercase animate-pulse">
        &#47;&#47; RESOLVING SHLOKA MATRIX COORDINATES...
      </div>
    );
  }

  if (!verseData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030303] text-center p-6 space-y-4">
        <p className="font-mono text-xs text-red-400 uppercase tracking-[0.3em]">
          ⚠️ Shloka Configuration Not Registered
        </p>
        <Link
          href={`/chapter/${params.id}`}
          className="text-[10px] text-neutral-400 border border-white/5 bg-white/[0.01] px-5 py-2.5 rounded-full font-mono tracking-widest uppercase hover:text-white hover:border-white/10 transition-colors"
        >
          RETURN TO CHAPTER AXIS
        </Link>
      </div>
    );
  }

  // Safe numerical string generation logic bypassing index overflows
  const formattedChapterIndex =
    Number(params.id) < 10 ? `0${params.id}` : params.id;

  return (
    <main className="min-h-screen text-neutral-200 flex flex-col justify-center py-32 px-4 sm:px-8 relative overflow-hidden select-text">
      {/* Background Refraction Light Dust */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/[0.01] blur-[160px] pointer-events-none" />

      <div
        ref={stageRef}
        className="max-w-3xl mx-auto w-full opacity-0 space-y-8 relative z-10"
      >
        {/* Navigation Axis Link */}
        <div className="text-left">
          <Link
            href={`/chapter/${params.id}`}
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neutral-500 hover:text-white uppercase transition-colors"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>RETURN TO CHAPTER {formattedChapterIndex} INDEX</span>
          </Link>
        </div>

        {/* Main Isolated Verse Presentation Node */}
        <div className="p-6 sm:p-12 rounded-2xl border border-white/[0.04] bg-[#090909]/40 backdrop-blur-md shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 h-[2px] w-32 bg-gradient-to-r from-violet-500/30 to-transparent" />

          {/* Metadata Ribbon Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.03] pb-6 text-left">
            <div className="space-y-1">
              <span className="font-mono text-[11px] text-violet-300 font-bold uppercase tracking-[0.25em]">
                SHLOKA // {params.id}.{params.verseId}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono block uppercase tracking-wider">
                CHAPTER TEXT // {chapterTitle}
              </span>
            </div>
            <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase hidden sm:inline-block">
              ISOLATION_FRAME // ENERGETIC
            </span>
          </div>

          {/* Sanskrit Text & Transliteration Area */}
          <div className="animate-up text-center space-y-6 py-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-wide leading-normal sm:leading-loose whitespace-pre-line text-purple-50/90 font-medium">
              {verseData.sanskrit}
            </h2>
            {verseData.transliteration && (
              <p className="font-mono text-xs text-neutral-500 tracking-wider italic max-w-2xl mx-auto border-t border-b border-white/[0.02] py-3">
                {verseData.transliteration}
              </p>
            )}
          </div>

          {/* English Translation Panel */}
          <div className="animate-up pt-6 border-t border-white/[0.03] text-left space-y-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neutral-600 font-bold block">
              TRANSLATION // ENGLISH EXPLORATION
            </span>
            <blockquote className="text-neutral-300 italic text-base sm:text-lg font-sans font-light leading-relaxed pl-4 border-l-2 border-violet-500/30">
              {verseData.english || "No translation text configured."}
            </blockquote>
          </div>

          {/* Commentary Field */}
          {verseData.commentary && (
            <div className="animate-up pt-6 border-t border-white/[0.03] text-left space-y-2.5">
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neutral-600 font-bold block">
                METAPHYSICAL COMMENTARY
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light">
                {verseData.commentary}
              </p>
            </div>
          )}

          {/* New Interpretation Blocks Split System */}
          {verseData.understand && (
            <div className="animate-up grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/[0.03] text-left">
              {verseData.understand.common_misconception && (
                <div className="p-5 rounded-xl border border-red-500/10 bg-red-950/[0.15] space-y-2">
                  <h5 className="font-mono text-[9px] text-red-400/90 uppercase tracking-[0.25em] font-bold">
                    ⚡ What People Think
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    {verseData.understand.common_misconception}
                  </p>
                </div>
              )}
              {verseData.understand.attainment_meaning && (
                <div className="p-5 rounded-xl border border-emerald-500/10 bg-emerald-950/[0.15] space-y-2">
                  <h5 className="font-mono text-[9px] text-emerald-400/90 uppercase tracking-[0.25em] font-bold">
                    👁️ True Realization
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    {verseData.understand.attainment_meaning}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Core Non-Dual Philosophy Node */}
          {verseData.philosophy && (
            <div className="animate-up pt-6 border-t border-white/[0.03] text-left space-y-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-violet-400 font-bold block">
                ADVAITA PHILOSOPHY PRINCIPLE
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-light">
                {verseData.philosophy}
              </p>
            </div>
          )}
        </div>

        {/* Global Return System Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="font-mono text-[9px] tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors uppercase underline underline-offset-4 decoration-white/5"
          >
            TERMINATE TRACKING ENVIRONMENT AND BACK TO ROOT //
          </Link>
        </div>
      </div>
    </main>
  );
}
