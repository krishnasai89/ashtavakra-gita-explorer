"use client";

// FIXED: Added useEffect explicitly to the React import destructuring array
import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SanskritTextCloud() {
  const meshRef = useRef();
  const materialRef = useRef();

  // Explicit tracking for pointer coordinates and fluid lag interpolation
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Core configuration: Render actual Sanskrit characters into the 3D scene
  const particleCount = 400;
  const glyphs = [
    "अ",
    "श",
    "्व",
    "त",
    "त्",
    "व",
    "क",
    "्",
    "र",
    "श",
    "ि",
    "्",
    "ष",
    "्",
    "य",
    "०",
    "१",
  ];

  // 1. Programmatically compile a dynamic ASCII canvas texture map containing sacred indices
  const textureAtlas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid generation layout definitions
    const gridSize = 4; // 16 discrete panels
    const step = canvas.width / gridSize;

    ctx.font = "bold 130px monospace, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    let glyphIndex = 0;
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const char = glyphs[glyphIndex % glyphs.length];
        const posX = x * step + step / 2;
        const posY = y * step + step / 2;
        ctx.fillText(char, posX, posY);
        glyphIndex++;
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // 2. Build the vertical pillar axis coordinates matrix instead of flat fields or space grids
  const [instancedPositions, randomOffsets] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const offsets = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Structure points into a tight vertical column core tracking the central axis
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 1.5; // Cylindrical thickness limits

      pos[i * 3] = Math.cos(theta) * radius; // X configuration
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14; // Extended Y vertical core height
      pos[i * 3 + 2] = Math.sin(theta) * radius; // Z depth index

      // Distinct micro kinetic displacement speeds assigned to each glyph node
      offsets[i * 3] = Math.random() * 10;
      offsets[i * 3 + 1] = 0.2 + Math.random() * 0.8;
      offsets[i * 3 + 2] = Math.random() * Math.PI;
    }
    return [pos, offsets];
  }, []);

  // Listen to the client interaction paths securely on window mount thresholds
  useEffect(() => {
    const updateMouseCoords = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", updateMouseCoords, { passive: true });
    return () => window.removeEventListener("mousemove", updateMouseCoords);
  }, []);

  // 3. Custom Shaders injected into PointsMaterial for deep layout dissolution effects
  const customShaderMaterial = useMemo(() => {
    const mat = new THREE.PointsMaterial({
      size: 0.65,
      map: textureAtlas,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color("#c084fc"), // Premium violet glow index
    });

    // Intercept standard compiling pipeline to construct custom morph maps
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uMouse = { value: new THREE.Vector2(0, 0) };

      // Inject variables into vertex pipeline layout
      shader.vertexShader =
        `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute vec3 aRandomOffset;
        varying vec2 vTextureOffset;
      ` + shader.vertexShader;

      // Transform particle behaviors right inside the GPU compilation frame
      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `
        #include <begin_vertex>
        
        // Generate continuous vertical drift cycles matching runtime clocks
        transformed.y += mod(uTime * aRandomOffset.y + aRandomOffset.x, 14.0) - 7.0;
        
        // Form an organic undulating twist matrix matching the central line parameters
        float twist = sin(transformed.y * 0.5 + uTime) * 0.4;
        float cosT = cos(twist);
        float sinT = sin(twist);
        mat2 rotationMatrix = mat2(cosT, -sinT, sinT, cosT);
        transformed.xz = rotationMatrix * transformed.xz;

        // Apply interactive vector distortion when mouse tracks close to coordinates
        vec2 targetWorldMouse = uMouse * vec2(6.0, 4.0);
        float distToCursor = distance(transformed.xz, targetWorldMouse);
        if (distToCursor < 3.0) {
          float force = (1.0 - (distToCursor / 3.0)) * 0.8;
          transformed.x += sin(uTime * 5.0 + transformed.y) * force;
          transformed.z += cos(uTime * 5.0 + transformed.y) * force;
        }
        `,
      );

      // Distribute distinct characters cleanly across point fragments inside texture space
      shader.vertexShader = shader.vertexShader.replace(
        `gl_PointSize = size;`,
        `
        gl_PointSize = size * (1.0 + sin(uTime + aRandomOffset.x) * 0.2);
        
        // Slice atlas grid math parameters (4x4 matrix index)
        float instanceID = floor(mod(aRandomOffset.x * 7.0, 16.0));
        float colX = mod(instanceID, 4.0);
        float rowY = floor(instanceID / 4.0);
        vTextureOffset = vec2(colX, rowY) * 0.25;
        `,
      );

      // Re-map texture coordinates inside fragment shader execution strings
      shader.fragmentShader =
        `
        varying vec2 vTextureOffset;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        `vec4 diffuseColor = texture2D( map, gl_PointCoord );`,
        `
        vec2 customUV = gl_PointCoord * 0.25 + vTextureOffset;
        vec4 diffuseColor = texture2D( map, customUV );
        
        // Mute edge parameters softly to blend characters into absolute black void space
        float edgeDamp = smoothstep(0.0, 0.2, gl_PointCoord.x) * smoothstep(1.0, 0.8, gl_PointCoord.x) *
                         smoothstep(0.0, 0.2, gl_PointCoord.y) * smoothstep(1.0, 0.8, gl_PointCoord.y);
        diffuseColor.a *= edgeDamp;
        `,
      );

      materialRef.current = shader;
    };

    return mat;
  }, [textureAtlas]);

  // Frame processing ticking loop updates uniforms dynamically
  useFrame((state) => {
    if (materialRef.current) {
      const mouse = mouseRef.current;
      const elapsedTime = state.clock.getElapsedTime();

      // Interpolate tracking lag metrics smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }

    // Slow, unmoving axial rotation of entire cloud column
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={meshRef} material={customShaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[instancedPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomOffset"
          args={[randomOffsets, 3]}
        />
      </bufferGeometry>
    </points>
  );
}

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <SanskritTextCloud />
      </Canvas>
    </div>
  );
}
