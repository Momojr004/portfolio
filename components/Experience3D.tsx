
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import {
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  Sphere,
  Environment,
  ContactShadows,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';

// Détection mobile (mémoïsée une seule fois)
const IS_MOBILE = typeof window !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
);

// Fix: Correctly define the Three.js elements in the React JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ThreeElements['mesh'];
      circleGeometry: ThreeElements['circleGeometry'];
      meshBasicMaterial: ThreeElements['meshBasicMaterial'];
      group: ThreeElements['group'];
      ambientLight: ThreeElements['ambientLight'];
      pointLight: ThreeElements['pointLight'];
    }
  }
}

// Additional fix for React 18+ type definitions if needed
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ThreeElements['mesh'];
      circleGeometry: ThreeElements['circleGeometry'];
      meshBasicMaterial: ThreeElements['meshBasicMaterial'];
      group: ThreeElements['group'];
      ambientLight: ThreeElements['ambientLight'];
      pointLight: ThreeElements['pointLight'];
    }
  }
}

const InnerPortrait = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Utilise la vraie photo de Mouhamed depuis le dossier gallerie
  const texture = useTexture('/gallerie/photos/profil.webp');

  useFrame((state) => {
    if (meshRef.current) {
      const { x, y } = state.mouse;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.1, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.1, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <circleGeometry args={[1.3, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={1}
        toneMapped={false}
      />
    </mesh>
  );
};

const VisionarySphere = () => {
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        <Suspense fallback={null}>
          <InnerPortrait />
        </Suspense>

        <Sphere ref={shellRef} args={[1.9, IS_MOBILE ? 32 : 64, IS_MOBILE ? 32 : 64]}>
          <MeshTransmissionMaterial
            backside
            samples={IS_MOBILE ? 4 : 16}
            resolution={IS_MOBILE ? 256 : 512}
            transmission={1.0}
            roughness={0.0}
            thickness={2.0}
            ior={1.1}
            chromaticAberration={IS_MOBILE ? 0.01 : 0.03}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.0}
            color="#ffffff"
            attenuationDistance={2}
            attenuationColor="#ffffff"
            transparent
          />
        </Sphere>
      </group>
    </Float>
  );
};

export const Experience3D: React.FC = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={IS_MOBILE ? [1, 1.5] : [1, 2]} gl={{ alpha: true, antialias: !IS_MOBILE, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#CCFF00" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

          <VisionarySphere />
          <Environment preset="studio" />

          <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={10} blur={3} far={4} />

          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
