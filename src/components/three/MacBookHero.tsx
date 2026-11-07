"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";

const SUPRA_SCREEN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <defs>
    <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0d0d" />
      <stop offset="100%" stop-color="#090a0a" />
    </linearGradient>
  </defs>
  <rect width="800" height="520" fill="url(#screenGrad)" />
  <rect x="40" y="34" width="132" height="22" rx="3" fill="#161919" />
  <text x="48" y="51" fill="#c6ff4d" font-family="Inter, sans-serif" font-size="14" font-weight="800" letter-spacing="0.05em">SUPRA</text>
  <text x="760" y="49" fill="#929795" font-family="Inter, sans-serif" font-size="12" text-anchor="end" letter-spacing="0.02em">Menu · Reservations</text>
  <text x="40" y="172" fill="#f3f3ef" font-family="Inter, sans-serif" font-size="40" font-weight="800" letter-spacing="-0.02em">Georgian</text>
  <text x="40" y="218" fill="#f3f3ef" font-family="Inter, sans-serif" font-size="40" font-weight="800" letter-spacing="-0.02em">hospitality.</text>
  <rect x="40" y="278" width="340" height="190" rx="14" fill="#121515" />
  <rect x="400" y="278" width="360" height="190" rx="14" fill="#121515" />
  <rect x="520" y="320" width="110" height="110" rx="16" fill="#1a1d1d" />
  <circle cx="575" cy="375" r="22" fill="#c6ff4d" opacity="0.15" />
  <rect x="40" y="492" width="220" height="10" rx="5" fill="#c6ff4d" opacity="0.9" />
  <text x="40" y="508" fill="#929795" font-family="Inter, sans-serif" font-size="12" letter-spacing="0.04em" text-transform="uppercase">Table for two · 20:30</text>
</svg>
`;

const SCREEN_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(SUPRA_SCREEN_SVG)}`;

function MacBookScene({ screenTexture }: { screenTexture: THREE.Texture | null }) {
  const groupRef = React.useRef<THREE.Group | undefined>(undefined);
  const screenRef = React.useRef<THREE.Mesh | undefined>(undefined);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mesh = groupRef.current;
    if (!mesh) return;

    const float = Math.sin(time * 0.7) * 0.06;
    const sway = Math.cos(time * 0.5) * 0.015;

    mesh.position.y = float;
    mesh.position.z = sway;

    const targetRx = -0.14 + mouse.y * 0.12;
    const targetRy = 0.28 + mouse.x * 0.25;
    mesh.rotation.x += (targetRx - mesh.rotation.x) * 0.08;
    mesh.rotation.y += (targetRy - mesh.rotation.y) * 0.08;
    mesh.rotation.z = Math.sin(time * 0.4) * 0.012;

    const screen = screenRef.current;
    if (screen) {
      screen.rotation.z = Math.sin(time * 0.6 + 1) * 0.008;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 10, 8]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera={{
          left: -8,
          right: 8,
          top: 8,
          bottom: -8,
          near: 0.1,
          far: 50,
        }}
      />
      <spotLight
        position={[-5, 6, 5]}
        intensity={2}
        color="#c6ff4d"
        penumbra={0.8}
        distance={18}
        angle={0.5}
        decay={1.5}
      />
      <pointLight color="#c6ff4d" position={[0, 1, 3]} intensity={3} distance={10} decay={1.5} />
      <pointLight color="#ffffff" position={[8, -2, 4]} intensity={0.8} distance={14} decay={1.5} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        receiveShadow
      >
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color={0x090a0a} />
      </mesh>

      <group
        ref={groupRef}
        rotation={[-0.14, 0.28, 0.03]}
        position={[0, -0.95, 0]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 0.18, 2.5]} />
          <meshStandardMaterial
            color={0x161818}
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, 0.092, -1.26]}>
          <boxGeometry args={[3.5, 0.018, 0.06]} />
          <meshStandardMaterial
            color={0xc6ff4d}
            emissive={0xc6ff4d}
            emissiveIntensity={2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, -0.08]} castShadow>
          <boxGeometry args={[3.3, 2.05, 0.14]} />
          <meshStandardMaterial
            color={0x0c0e0e}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>
        <mesh ref={screenRef} position={[0, 0, 0.01]}>
          <planeGeometry args={[3.14, 1.96]} />
          <meshStandardMaterial
            map={screenTexture ?? undefined}
            color={0xffffff}
          />
        </mesh>
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[3.18, 2.02]} />
          <meshStandardMaterial
            color={0x060808}
            metalness={1}
            roughness={0.1}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh position={[0, -1.08, -0.22]} rotation={[0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.26, 0.35]} />
          <meshStandardMaterial
            color={0x161818}
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>
      </group>
    </>
  );
}

export default function MacBookHero({
  className,
  height = "90vh",
}: { className?: string; height?: string }) {
  const [screenTexture, setScreenTexture] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    new THREE.TextureLoader().load(SCREEN_DATA_URL, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setScreenTexture(tex);
    });
  }, []);

  return (
    <section
      className={cn(
        "relative w-full min-h-[600px] overflow-hidden bg-background",
        className,
      )}
      style={{ height }}
    >
      <Canvas
        className="absolute inset-0 w-full h-full z-0"
        camera={{ position: [0, 0, 6.4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <MacBookScene screenTexture={screenTexture} />
      </Canvas>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/95 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
