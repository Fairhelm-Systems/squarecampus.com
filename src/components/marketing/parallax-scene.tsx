"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Trail } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { easing } from "maath";

// Morphing central blob using MeshDistortMaterial
function MorphingBlob({ intensity = 1 }: { intensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#6366f1"
        emissive="#8b5cf6"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
        distort={0.4 * intensity}
        speed={2}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

// Orbiting particles with trails
function OrbitingParticles({ count = 50, radius = 3 }: { count?: number; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.3,
      orbitRadius: radius + (Math.random() - 0.5) * 1.5,
      yOffset: (Math.random() - 0.5) * 2,
      size: 0.02 + Math.random() * 0.03,
      color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6),
    }));
  }, [count, radius]);

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <OrbitingParticle key={p.id} {...p} />
      ))}
    </group>
  );
}

function OrbitingParticle({
  angle,
  speed,
  orbitRadius,
  yOffset,
  size,
  color,
}: {
  angle: number;
  speed: number;
  orbitRadius: number;
  yOffset: number;
  size: number;
  color: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + angle;
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.z = Math.sin(t) * orbitRadius;
    meshRef.current.position.y = yOffset + Math.sin(t * 2) * 0.3;
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// Floating crystalline shapes
function FloatingCrystals({ count = 8 }: { count?: number }) {
  const crystals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2,
      rotationSpeed: 0.5 + Math.random(),
      color: new THREE.Color().setHSL(0.6 + Math.random() * 0.15, 0.7, 0.5),
    }));
  }, [count]);

  return (
    <>
      {crystals.map((crystal) => (
        <Crystal key={crystal.id} {...crystal} />
      ))}
    </>
  );
}

function Crystal({
  position,
  scale,
  rotationSpeed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
  color: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003 * rotationSpeed;
    meshRef.current.rotation.y += 0.005 * rotationSpeed;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Interactive particle field with mouse attraction
function ReactiveParticleField({ count = 1000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  const [positions, originalPositions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 2;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      origPos[i3] = x;
      origPos[i3 + 1] = y;
      origPos[i3 + 2] = z;

      vel[i3] = 0;
      vel[i3 + 1] = 0;
      vel[i3 + 2] = 0;

      // Gradient colors
      const hue = 0.6 + Math.random() * 0.2;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return [pos, origPos, vel, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute("position");
    const posArray = posAttr.array as Float32Array;

    const mouseX = pointer.x * viewport.width * 0.5;
    const mouseY = pointer.y * viewport.height * 0.5;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distance to mouse
      const dx = mouseX - posArray[i3];
      const dy = mouseY - posArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Mouse influence - attraction within range
      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5;
        velocities[i3] += dx * force * 0.002;
        velocities[i3 + 1] += dy * force * 0.002;
      }

      // Return to original position
      const returnForce = 0.01;
      velocities[i3] += (originalPositions[i3] - posArray[i3]) * returnForce;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * returnForce;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * returnForce;

      // Add subtle wave motion
      velocities[i3 + 1] += Math.sin(time + posArray[i3] * 0.5) * 0.0005;

      // Apply velocity with damping
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;
    }

    posAttr.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Animated energy rings
function EnergyRings({ count = 3 }: { count?: number }) {
  const rings = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: `ring-${i}`,
      radius: 1.8 + i * 0.6,
      thickness: 0.02,
      speed: 0.3 - i * 0.05,
      color: new THREE.Color().setHSL(0.6 + i * 0.05, 0.8, 0.5),
      offset: i * 0.5,
    })),
    [count]
  );

  return (
    <>
      {rings.map((ring) => (
        <EnergyRing key={ring.id} {...ring} />
      ))}
    </>
  );
}

function EnergyRing({
  radius,
  thickness,
  speed,
  color,
  offset,
}: {
  id?: string;
  radius: number;
  thickness: number;
  speed: number;
  color: THREE.Color;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed + offset) * 0.3 + 0.5;
    meshRef.current.rotation.y += speed * 0.01;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.5 + offset) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// DNA Helix structure
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 40;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
  });

  const helixPoints = useMemo(() => {
    const points: Array<{ id: string; pos1: [number, number, number]; pos2: [number, number, number]; y: number; showBar: boolean }> = [];
    for (let i = 0; i < count; i++) {
      const y = (i / count) * 6 - 3;
      const angle = (i / count) * Math.PI * 4;
      const radius = 1;
      points.push({
        id: `helix-${i}`,
        pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
        y,
        showBar: i % 4 === 0,
      });
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      {helixPoints.map((point) => (
        <group key={point.id}>
          {/* Spheres on helix */}
          <mesh position={point.pos1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#6366f1"
              emissive="#6366f1"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={point.pos2}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Connecting bar */}
          {point.showBar && (
            <mesh position={[0, point.y, 0]} rotation={[0, Math.atan2(point.pos1[2], point.pos1[0]), Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Nebula cloud effect
function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime = { value: state.clock.elapsedTime };
  });

  return (
    <Sphere ref={meshRef} args={[5, 64, 64]} position={[0, 0, -5]}>
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.15}
      />
    </Sphere>
  );
}

// Wormhole tunnel effect
function WormholeTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 20;

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const z = ((state.clock.elapsedTime * 2 + i * 0.5) % 10) - 5;
      child.position.z = z;
      const scale = 1 - Math.abs(z) / 8;
      child.scale.setScalar(Math.max(0.1, scale));
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = scale * 0.3;
      }
    });
  });

  const tunnelRings = useMemo(() =>
    Array.from({ length: ringCount }, (_, i) => ({
      id: `tunnel-ring-${i}`,
      position: [0, 0, i * 0.5 - 5] as [number, number, number],
      color: new THREE.Color().setHSL(0.6 + i * 0.02, 0.8, 0.5),
    })),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {tunnelRings.map((ring) => (
        <mesh key={ring.id} position={ring.position}>
          <torusGeometry args={[2, 0.02, 16, 64]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller with smooth follow
function CameraController() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    easing.damp3(
      camera.position,
      [pointer.x * 0.5, pointer.y * 0.3, 5],
      0.5,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Scene variants
function NetworkScene() {
  return (
    <>
      <MorphingBlob intensity={0.8} />
      <OrbitingParticles count={40} radius={2.5} />
      <EnergyRings count={3} />
      <ReactiveParticleField count={600} />
      <FloatingCrystals count={6} />
    </>
  );
}

function ShapesScene() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshWobbleMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
            wireframe
            factor={0.5}
            speed={2}
          />
        </mesh>
      </Float>
      <FloatingCrystals count={12} />
      <OrbitingParticles count={30} radius={3} />
      <ReactiveParticleField count={400} />
    </>
  );
}

function ParticlesScene() {
  return (
    <>
      <DNAHelix />
      <ReactiveParticleField count={800} />
      <OrbitingParticles count={25} radius={4} />
    </>
  );
}

function CosmicScene() {
  return (
    <>
      <WormholeTunnel />
      <NebulaCloud />
      <MorphingBlob intensity={1.2} />
      <ReactiveParticleField count={500} />
      <FloatingCrystals count={8} />
    </>
  );
}

// Main scene with post-processing
function Scene({ variant = "network" }: { variant?: "network" | "shapes" | "particles" | "cosmic" }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#06b6d4" />

      {/* Camera controller */}
      <CameraController />

      {/* Scene content based on variant */}
      {variant === "network" && <NetworkScene />}
      {variant === "shapes" && <ShapesScene />}
      {variant === "particles" && <ParticlesScene />}
      {variant === "cosmic" && <CosmicScene />}

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.002, 0.002)}
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// Check if device is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const lowPerf = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;
      setIsMobile(mobile || lowPerf);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Mobile fallback with CSS animations
function MobileFallback({ height, className }: { height: string; className: string }) {
  return (
    <div className={`${height} relative w-full overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute left-1/4 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
          style={{ animation: "pulse 5s ease-in-out infinite 0.5s" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => `mobile-particle-${i}`).map((id, i) => (
          <div
            key={id}
            className="absolute h-1 w-1 rounded-full bg-indigo-400/40"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.2) % 3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export type ParallaxVariant = "particles" | "shapes" | "network" | "cosmic";

interface ParallaxSceneProps {
  variant?: ParallaxVariant;
  className?: string;
  height?: string;
}

export function ParallaxScene({
  variant = "network",
  className = "",
  height = "h-32 md:h-48 lg:h-64"
}: ParallaxSceneProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${height} w-full bg-black ${className}`} />;
  }

  if (isMobile) {
    return <MobileFallback height={height} className={className} />;
  }

  return (
    <div className={`${height} relative w-full overflow-hidden bg-black ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ background: "transparent" }}
      >
        <Scene variant={variant} />
      </Canvas>

      {/* Gradient overlays for smooth blending */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
