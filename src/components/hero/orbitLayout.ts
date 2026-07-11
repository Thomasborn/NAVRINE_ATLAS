export interface OrbitSlot {
  position: [number, number, number];
  rotationY: number;
  rotationZ: number;
  driftPhase: number;
  driftSpeed: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Deterministic ring layout. Cards circle the center (kept clear so the
 * DOM headline stays readable) and sit at staggered depths so scene fog
 * fades the far ones. No randomness: same count, same layout.
 */
export function computeOrbitLayout(count: number): OrbitSlot[] {
  const slots: OrbitSlot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = i * GOLDEN_ANGLE;
    const ring = i % 3;
    const radius = 4.2 + ring * 1.2;
    slots.push({
      position: [
        // biased right so the left copy column stays calm
        Math.cos(angle) * radius + 1.1,
        Math.sin(angle) * 2.1 + ((i % 5) - 2) * 0.3,
        -1.5 - ((i * 7) % 11) * 0.6,
      ],
      rotationY: Math.sin(angle) * 0.35,
      rotationZ: ((i % 7) - 3) * 0.03,
      driftPhase: (i / count) * Math.PI * 2,
      driftSpeed: 0.25 + ((i * 13) % 7) * 0.05,
    });
  }
  return slots;
}
