"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const infoBlockRef = useRef(null);

  // High-visibility structural layout map
  const titleAsciiLines = [
    "██████╗ ███████╗██╗  ██╗████████╗██████╗ ██╗   ██╗ █████╗ ██╗  ██╗██████╗  █████╗ ",
    "██╔══██╗██╔════╝██║  ██║╚══██╔══╝██╔══██╗██║   ██║██╔══██╗██║ ██╔╝██╔══██╗██╔══██╗",
    "███████║███████╗███████║   ██║   ███████║██║   ██║███████║█████╔╝ ██████╔╝███████║",
    "██╔══██║╚════██║██╔══██║   ██║   ██╔══██║╚██╗ ██╔╝██╔══██║██╔═██╗ ██╔══██╗██╔══██║",
    "██║  ██║███████║██║  ██║   ██║   ██║  ██║ ╚████╔╝ ██║  ██║██║  ██╗██║  ██║██║  ██║",
    "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝",
    "                                                                              ",
    "                     ██████╗ ██╗████████╗ █████╗                              ",
    "                    ██╔════╝ ██║╚══██╔══╝██╔══██╗                             ",
    "                    ██║  ███╗██║   ██║   ███████║                             ",
    "                    ██║   ██║██║   ██║   ██╔══██║                             ",
    "                    ╚██████╔╝██║   ██║   ██║  ██║                             ",
    "                     ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝                             ",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- 1. GSAP Layout Reveal Timelines ---
    const tl = gsap.timeline();
    tl.fromTo(
      ".ascii-row-node",
      { opacity: 0, y: 20, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
      },
    ).fromTo(
      ".meta-ui-node",
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out", stagger: 0.1 },
      "-=0.6",
    );

    // --- 2. Three.js Fluid Background Wave Particles ---
    const width = canvasRef.current.clientWidth || window.innerWidth;
    const height = canvasRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = window.innerWidth < 768 ? 1000 : 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const generateAsciiGlyphTexture = () => {
      const txtCanvas = document.createElement("canvas");
      txtCanvas.width = 32;
      txtCanvas.height = 32;
      const tCtx = txtCanvas.getContext("2d");
      tCtx.fillStyle = "transparent";
      tCtx.fillRect(0, 0, 32, 32);
      tCtx.font = "bold 24px monospace";
      tCtx.fillStyle = "rgba(167, 139, 250, 0.4)";
      tCtx.textAlign = "center";
      tCtx.textBaseline = "middle";

      const glyphs = ["[", "]", "{", "}", "█", "0", "1", "α", "⌁"];
      const selectedGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      tCtx.fillText(selectedGlyph, 16, 16);

      return new THREE.CanvasTexture(txtCanvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.4,
      map: generateAsciiGlyphTexture(),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color("#a78bfa"),
    });

    const waveMesh = new THREE.Points(geometry, material);
    scene.add(waveMesh);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      pointer.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let frameId;

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      waveMesh.rotation.x = elapsed * 0.01;
      waveMesh.rotation.y = elapsed * 0.02;

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      const posArr = waveMesh.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const xIndex = i * 3;
        const yIndex = i * 3 + 1;
        posArr[yIndex] += Math.sin(elapsed + posArr[xIndex] * 0.2) * 0.003;
      }
      waveMesh.geometry.attributes.position.needsUpdate = true;

      camera.position.x += (pointer.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (pointer.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden"
    >
      {/* Background WebGL Scene */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Meta Indicator Ribbon */}
      <div className="w-full flex justify-between items-center border-b border-white/[0.03] pb-4 font-mono text-[9px] md:text-[11px] tracking-[0.4em] text-neutral-500 uppercase z-10">
        <span className="meta-ui-node">SYSTEM // IDENTITY_CORE</span>
        <span className="meta-ui-node text-violet-400/80 animate-pulse">
          α // WITNESS_MODE ACTIVE
        </span>
      </div>

      {/* Main Center Space: High-Visibility Code-to-Art Canvas */}
      <div className="w-full flex flex-col items-center justify-center my-auto z-10 py-12">
        <div className="w-full max-w-6xl rounded-xl bg-gradient border-cyan-600/20 rounded-2x backdrop-blur-xs p-4 sm:p-6 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative overflow-x-auto scrollbar-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* High-Contrast Core ASCII Block */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center font-mono text-[3px] sm:text-[5px] md:text-[7px] lg:text-[9px] leading-[1.1] text-neutral-300 whitespace-pre tracking-normal text-center select-none">
            {" "}
            {titleAsciiLines.map((line, idx) => (
              <div
                key={idx}
                className="ascii-row-node w-full block font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-violet-200 to-neutral-100 drop-shadow-[0_0_20px_rgba(139,92,246,0.35)] mix-blend-screen"
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Subtext Context Block */}
          <div
            ref={infoBlockRef}
            className="meta-ui-node mt-10 text-center space-y-4"
          >
            <p className="text-xs sm:text-sm tracking-[0.4em] text-neutral-400 uppercase font-sans font-light">
              The Scripture of Absolute Freedom
            </p>
            <div className="flex items-center justify-center gap-4 text-neutral-600 font-mono text-[9px] tracking-widest uppercase">
              <span>NON-DUALITY</span>
              <span>•</span>
              <span>UNCHANGING VIEWERS</span>
              <span>•</span>
              <span>SAMANGA RIVER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Ribbon Bar */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t border-white/[0.03] pt-5 gap-4 font-mono text-[9px] md:text-[11px] tracking-[0.3em] text-neutral-500 uppercase z-10">
        <div className="meta-ui-node flex flex-wrap gap-2 justify-center text-center">
          <span>CONTEXT</span>{" "}
          <span className="text-neutral-800">&#47;&#47;</span>
          <span>HUMAN NATURE</span>{" "}
          <span className="text-neutral-800">&gt;</span>
          <span className="text-violet-400">RESTING IN PURE SOLITUDE</span>
        </div>

        <div
          onClick={() =>
            document
              .getElementById("origin-story-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="meta-ui-node flex items-center gap-2 text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300 underline underline-offset-4 decoration-violet-500/40 hover:decoration-violet-500"
        >
          SCROLL TO AWAKEN ↓
        </div>
      </div>
    </section>
  );
}
