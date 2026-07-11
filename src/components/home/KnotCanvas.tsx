'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

function Knot() {
  const mesh = useRef<Mesh>(null!);
  useFrame((_, delta) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    mesh.current.rotation.x += delta * 0.1;
    mesh.current.rotation.y += delta * 0.15;
  });
  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.32, 300, 64]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default function KnotCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Knot />
    </Canvas>
  );
}
