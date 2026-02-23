'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import type { Mesh } from 'three';

function HologramSphere() {
  const meshRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.6, 64, 64]}>
      <meshStandardMaterial
        color="#0a0a1a"
        emissive="#67e8f9"
        emissiveIntensity={0.15}
        wireframe
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

function WireframeGlow() {
  const meshRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1.72, 32, 32]}>
      <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.4} />
    </Sphere>
  );
}

export default function HolographicGlobe() {
  return (
    <div className="w-full h-[420px] relative rounded-2xl overflow-hidden border border-[rgba(103,232,249,0.3)] glow-cyan">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#67e8f9" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#c084fc" />
        <HologramSphere />
        <WireframeGlow />
        <Stars radius={200} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.4} enableZoom={true} />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold neon-cyan tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
            OMNIVERSE ACTIVE
          </p>
          <p className="text-sm md:text-base text-[#c084fc]/90 mt-1">Generating 10,000 never-seen futures</p>
        </div>
      </div>
    </div>
  );
}
