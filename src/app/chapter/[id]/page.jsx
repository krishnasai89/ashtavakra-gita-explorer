"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    import("../../../data/ashtavakra.json")
      .then((module) => {
        const data = module.default;
        const chaptersList = Array.isArray(data) ? data : data.chapters || [];
        const found = chaptersList.find(
          (c) => String(c.chapter) === String(params.id),
        );
        setChapter(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load chapter context matrix:", err);
        setLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    if (loading || !chapter) return;

    const ctx = gsap.context(() => {
      // Hardware-accelerated fluid lens blur reveal on entry trigger
      gsap.fromTo(
        ".verse-card-detail",
        { opacity: 0, y: 25, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
    }, cardsContainerRef);

    return () => ctx.revert();
  }, [loading, chapter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030303] font-mono text-[10px] tracking-[0.4em] text-neutral-500 uppercase animate-pulse">
        &#47;&#47; DETECTING ENTRANCE MATRIX COORDINATES...
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030303] text-center p-6 space-y-4">
        <p className="font-mono text-xs text-red-400 uppercase tracking-[0.3em]">
          ⚠️ Chapter Matrix Corrupted or Non-Existent
        </p>
        <Link
          href="/"
          className="text-[10px] text-neutral-400 border border-white/5 bg-white/[0.01] px-5 py-2.5 rounded-full font-mono tracking-widest uppercase hover:text-white hover:border-white/10 transition-colors"
        >
          RETURN TO SOURCE CANVAS
        </Link>
      </div>
    );
  }

  // Safe numerical string generation block to bypass index formatting overflows
  const formattedChapterIndex =
    chapter.chapter < 10 ? `0${chapter.chapter}` : chapter.chapter;

  return (
    <main className="min-h-screen text-neutral-200 py-32 px-4 sm:px-8 relative overflow-hidden select-text">
      {/* Background Refraction Light Dust */}
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Navigation Breadcrumb ribbon trail */}
        <div className="text-left">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neutral-500 hover:text-white uppercase transition-colors"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>BACK TO ARCHIVE CORE</span>
          </Link>
        </div>

        {/* Chapter Summary Header Framework */}
        <header className="border-b border-white/[0.03] pb-12 text-left space-y-6">
          <div>
            <span className="font-mono text-[10px] text-violet-300 font-bold uppercase tracking-[0.4em] bg-violet-950/30 border border-violet-500/10 px-4 py-1.5 rounded-full inline-block">
              CHAPTER INTEGRATION // {formattedChapterIndex}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
            {chapter.title}
          </h1>

          <p className="text-sm sm:text-base font-sans font-light text-neutral-400 leading-relaxed max-w-3xl">
            {chapter.description ||
              "Direct exposition regarding the absolute nature of unconditioned reality."}
          </p>

          {chapter.text && (
            <p className="text-lg font-serif italic leading-relaxed text-neutral-300 border-l border-white/5 pl-6 py-1 bg-white/[0.01] rounded-r-xl p-4 mt-4">
              {chapter.text}
            </p>
          )}
        </header>

        {/* Verses Stack Grid Arena */}
        <div ref={cardsContainerRef} className="space-y-10">
          <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
            <h3 className="font-mono text-[10px] uppercase text-neutral-500 tracking-[0.3em] font-bold">
              &#47;&#47; INDEXED VERSES ({chapter.verses?.length || 0})
            </h3>
            <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
              GRID // STABLE
            </span>
          </div>

          {chapter.verses?.map((v, index) => {
            const verseNumber = v.id ? v.id.split(".")[1] : index + 1;
            const fullVerseId = v.id || `${chapter.chapter}.${verseNumber}`;

            return (
              <div
                key={index}
                className="verse-card-detail block p-6 sm:p-8 rounded-2xl border border-white/[0.04] bg-[#090909]/30 backdrop-blur-md shadow-2xl relative overflow-hidden group"
              >
                {/* Specular Edge Line Overlays */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Structural Verse Header Strip */}
                <div className="flex justify-between items-center mb-6 border-b border-white/[0.03] pb-4">
                  <span className="font-mono text-[10px] text-violet-300 font-bold tracking-[0.2em] uppercase">
                    VERSE // {fullVerseId}
                  </span>
                  <Link
                    href={`/chapter/${chapter.chapter}/verse/${verseNumber}`}
                    className="font-mono text-[9px] tracking-widest text-neutral-500 hover:text-white uppercase transition-colors flex items-center gap-1"
                  >
                    ISOLATE FRAME{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-1px] group-hover:translate-x-[1px]">
                      ↗
                    </span>
                  </Link>
                </div>

                {/* Script Grid Manifest Body */}
                <div className="space-y-6 text-left">
                  {/* Sanskrit Text: Large, Elegant, Weighted Accent */}
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-100 leading-normal tracking-wide whitespace-pre-line font-medium text-purple-100/90">
                    {v.sanskrit}
                  </p>

                  {/* Transliteration Script: Muted Monospace tracking axis */}
                  {v.transliteration && (
                    <p className="text-xs sm:text-sm font-mono text-neutral-500 tracking-wider leading-relaxed border-t border-b border-white/[0.02] py-3 italic">
                      {v.transliteration}
                    </p>
                  )}

                  {/* English Translation Output Panel */}
                  {v.english && (
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neutral-600 font-bold block">
                        TRANSLATION // ENGLISH
                      </span>
                      <blockquote className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed pl-4 border-l-2 border-violet-500/30">
                        {v.english}
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
