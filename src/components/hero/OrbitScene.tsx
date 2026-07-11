'use client';
import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { computeOrbitLayout, type OrbitSlot } from './orbitLayout';
import { makeCardTexture, makeGlowTexture, type OrbitCardData } from './cardTexture';

const CARD_W = 2.1;
const CARD_H = 2.62;
const CAM_Z = 9;

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    const heroH = Math.max(window.innerHeight, 1);
    const scroll = Math.min(window.scrollY / heroH, 1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.45, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, CAM_Z - scroll * 3.2, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function GlowSprite({ color, position, scale }: {
  color: string;
  position: [number, number, number];
  scale: number;
}) {
  const texture = useMemo(() => makeGlowTexture(color), [color]);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </sprite>
  );
}

function OrbitCard({ card, slot, interactive }: {
  card: OrbitCardData;
  slot: OrbitSlot;
  interactive: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makeCardTexture(card), [card]);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = slot.position[1] + Math.sin(t * slot.driftSpeed + slot.driftPhase) * 0.28;
    m.rotation.y = slot.rotationY + Math.sin(t * slot.driftSpeed * 0.6 + slot.driftPhase) * 0.06;
    const s = hovered ? 1.09 : 1;
    m.scale.lerp(targetScale.set(s, s, 1), 0.12);
    if (mat.current) {
      mat.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat.current.emissiveIntensity,
        hovered ? 1.4 : 0.9,
        0.1,
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      position={slot.position}
      rotation={[0, slot.rotationY, slot.rotationZ]}
      onPointerOver={interactive ? (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      } : undefined}
      onPointerOut={interactive ? () => {
        setHovered(false);
        document.body.style.cursor = '';
      } : undefined}
    >
      <planeGeometry args={[CARD_W, CARD_H]} />
      <meshStandardMaterial
        ref={mat}
        map={texture}
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={0.9}
        transparent
        opacity={0.94}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function OrbitScene({ cards, isMobile }: {
  cards: OrbitCardData[];
  isMobile: boolean;
}) {
  const shown = isMobile ? cards.slice(0, 8) : cards;
  const slots = useMemo(() => computeOrbitLayout(shown.length), [shown.length]);

  return (
    <Canvas
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, CAM_Z], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      <fog attach="fog" args={['#070708', 11, 23]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#4d8dff" />
      <pointLight position={[-6, -3, 4]} intensity={30} color="#ff4fd8" />
      <CameraRig />
      <GlowSprite color="#4d8dff" position={[3.5, 1.5, -6]} scale={11} />
      <GlowSprite color="#ff4fd8" position={[-4, -2, -7]} scale={10} />
      {shown.map((card, i) => (
        <OrbitCard key={card.id} card={card} slot={slots[i]} interactive={!isMobile} />
      ))}
    </Canvas>
  );
}
