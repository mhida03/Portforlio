import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Individual orbiting skill badge
const SkillBadge = ({ 
  skill, 
  index, 
  total, 
  radius, 
  isHighlighted, 
  theme,
  onHover,
  onLeave 
}) => {
  const groupRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Calculate orbital position
  const angle = (index / total) * Math.PI * 2;
  const orbitSpeed = 0.3 + (index % 3) * 0.1; // Varied speeds for organic feel

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const currentAngle = angle + time * orbitSpeed;
    
    // Orbital motion with slight vertical variation
    groupRef.current.position.x = Math.cos(currentAngle) * radius;
    groupRef.current.position.z = Math.sin(currentAngle) * radius;
    groupRef.current.position.y = Math.sin(time + index) * 0.2;
    
    // Scale and glow effects
    const targetScale = (isHighlighted || hovered) ? 1.3 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Billboard rotation to always face camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(skill);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onLeave();
    document.body.style.cursor = 'default';
  };

  const badgeColor = isHighlighted || hovered 
    ? (theme === 'dark' ? '#74b9ff' : '#0984e3')
    : (theme === 'dark' ? '#4a90e2' : '#007bff');

  const textColor = theme === 'dark' ? '#ffffff' : '#ffffff';

  return (
    <group ref={groupRef}>
      {/* Background sphere */}
      <Sphere
        args={[0.8, 16, 16]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshPhysicalMaterial
          color={badgeColor}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={badgeColor}
          emissiveIntensity={isHighlighted || hovered ? 0.3 : 0.1}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.1, 16, 16]}>
        <meshBasicMaterial
          color={badgeColor}
          transparent
          opacity={isHighlighted || hovered ? 0.2 : 0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Text label */}
      <Billboard ref={textRef}>
        <Text
          fontSize={0.3}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
          maxWidth={2}
          textAlign="center"
        >
          {skill}
        </Text>
      </Billboard>
    </group>
  );
};

// Central hub
const CentralHub = ({ theme, isActive }) => {
  const hubRef = useRef();

  useFrame((state) => {
    if (!hubRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    hubRef.current.rotation.y = time * 0.2;
    
    // Pulsing effect when active
    if (isActive) {
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      hubRef.current.scale.setScalar(pulse);
    } else {
      hubRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const hubColor = theme === 'dark' ? '#ffffff' : '#007bff';

  return (
    <group ref={hubRef}>
      {/* Main hub sphere */}
      <Sphere args={[0.5, 20, 20]}>
        <meshPhysicalMaterial
          color={hubColor}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={hubColor}
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Inner core */}
      <Sphere args={[0.3, 16, 16]}>
        <meshBasicMaterial
          color={hubColor}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Connecting lines to badges */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, x, 0, z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={hubColor}
              transparent
              opacity={0.3}
            />
          </line>
        );
      })}
    </group>
  );
};

// Main constellation scene
const ConstellationScene = ({ skills, highlightedSkill, theme, onSkillHover, onSkillLeave }) => {
  const sceneRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useFrame((state) => {
    if (!sceneRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle scene rotation
    sceneRef.current.rotation.y = time * 0.05;
    
    // Check if any skill is highlighted
    setIsActive(!!highlightedSkill);
  });

  // Flatten skills array for constellation
  const skillsList = useMemo(() => {
    const allSkills = [];
    Object.entries(skills).forEach(([category, skillArray]) => {
      allSkills.push(...skillArray.slice(0, 2)); // Limit to prevent overcrowding
    });
    return allSkills.slice(0, 8); // Max 8 skills for clean constellation
  }, [skills]);

  return (
    <group ref={sceneRef}>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight
        position={[0, 5, 5]}
        intensity={0.6}
        color={theme === 'dark' ? '#74b9ff' : '#0984e3'}
      />
      <pointLight
        position={[0, -5, -5]}
        intensity={0.3}
        color={theme === 'dark' ? '#fd79a8' : '#e84393'}
      />
      
      {/* Central hub */}
      <CentralHub theme={theme} isActive={isActive} />
      
      {/* Orbiting skill badges */}
      {skillsList.map((skill, index) => (
        <SkillBadge
          key={skill}
          skill={skill}
          index={index}
          total={skillsList.length}
          radius={3}
          isHighlighted={highlightedSkill === skill}
          theme={theme}
          onHover={onSkillHover}
          onLeave={onSkillLeave}
        />
      ))}
    </group>
  );
};

// Loading component
const ConstellationLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  </div>
);

// Main component
const SkillConstellation = ({ 
  skills = {}, 
  highlightedSkill = null, 
  theme = 'light',
  onSkillHover = () => {},
  onSkillLeave = () => {},
  className = ''
}) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Check for mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    checkMobile();
    checkReducedMotion();
    
    window.addEventListener('resize', checkMobile);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Don't render on mobile or if WebGL not supported or reduced motion preferred
  if (isMobile || !webGLSupported || prefersReducedMotion || !Object.keys(skills).length) {
    return null;
  }

  return (
    <div 
      className={`skill-constellation ${className}`}
      style={{
        position: 'sticky',
        top: '50%',
        right: '2rem',
        width: '300px',
        height: '300px',
        zIndex: 10,
        pointerEvents: 'auto',
      }}
    >
      <Suspense fallback={<ConstellationLoader />}>
        <Canvas
          camera={{ 
            position: [0, 0, 8], 
            fov: 50,
            near: 0.1,
            far: 100
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ConstellationScene
            skills={skills}
            highlightedSkill={highlightedSkill}
            theme={theme}
            onSkillHover={onSkillHover}
            onSkillLeave={onSkillLeave}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SkillConstellation;
