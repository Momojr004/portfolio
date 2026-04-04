
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Sphere,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';

// Détection mobile (mémoïsée une seule fois)
const IS_MOBILE = typeof window !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
);

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

        <Sphere ref={shellRef} args={[1.9, IS_MOBILE ? 24 : 48, IS_MOBILE ? 24 : 48]}>
          <meshPhysicalMaterial
            transmission={1}
            roughness={0.05}
            thickness={1.5}
            ior={1.1}
            envMapIntensity={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.3}
            color="#ffffff"
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </Float>
  );
};

export const Experience3D: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={IS_MOBILE ? [1, 1] : [1, 1.5]} gl={{ alpha: true, antialias: !IS_MOBILE, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#F5B731" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

          <VisionarySphere />

          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
