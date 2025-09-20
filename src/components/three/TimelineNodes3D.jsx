import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Individual 3D Timeline Node
const TimelineNode = ({ position, item, index, isHovered, onHover, onLeave, theme }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
    
    // Emissive pulse on hover
    if (hovered || isHovered) {
      const pulse = Math.sin(time * 3) * 0.3 + 0.7;
      meshRef.current.material.emissiveIntensity = pulse;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    } else {
      meshRef.current.material.emissiveIntensity = 0.2;
      meshRef.current.scale.setScalar(1);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(index);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onLeave();
    document.body.style.cursor = 'default';
  };

  // Material properties based on theme
  const materialProps = {
    color: theme === 'dark' ? '#ffffff' : '#007bff',
    emissive: theme === 'dark' ? '#4a90e2' : '#0056b3',
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.8,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  };

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.15, 16, 16]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshPhysicalMaterial {...materialProps} />
      </Sphere>
      
      {/* Outer glow ring */}
      <Sphere args={[0.25, 16, 16]}>
        <meshBasicMaterial
          color={theme === 'dark' ? '#4a90e2' : '#007bff'}
          transparent
          opacity={hovered ? 0.2 : 0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Tooltip */}
      {(hovered || isHovered) && (
        <Html
          position={[0.5, 0, 0]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="timeline-tooltip glass-card p-3 max-w-xs">
            <h6 className="font-semibold text-sm mb-1">{item.title}</h6>
            <p className="text-xs text-gray-600 mb-2">{item.company || item.title}</p>
            <p className="text-xs font-medium text-blue-600">{item.period}</p>
            {item.highlights && (
              <ul className="text-xs mt-2 space-y-1">
                {item.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="text-gray-700">• {highlight}</li>
                ))}
              </ul>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// Main Timeline 3D Component
const Timeline3DScene = ({ items, theme, hoveredIndex, onNodeHover, onNodeLeave }) => {
  const groupRef = useRef();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    // Subtle group rotation
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Directional light for better material definition */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color={theme === 'dark' ? '#ffffff' : '#ffeaa7'}
      />
      
      {/* Point light for dramatic effect */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.5}
        color={theme === 'dark' ? '#74b9ff' : '#0984e3'}
      />

      {/* Timeline nodes */}
      {items.map((item, index) => (
        <TimelineNode
          key={index}
          position={[0, (items.length - 1 - index) * 1.5 - (items.length - 1) * 0.75, 0]}
          item={item}
          index={index}
          isHovered={hoveredIndex === index}
          onHover={onNodeHover}
          onLeave={onNodeLeave}
          theme={theme}
        />
      ))}
    </group>
  );
};

// Loading component
const Timeline3DLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  </div>
);

// Main component
const TimelineNodes3D = ({ items = [], theme = 'light', className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleNodeHover = (index) => {
    setHoveredIndex(index);
  };

  const handleNodeLeave = () => {
    setHoveredIndex(null);
  };

  // Fallback for no WebGL or reduced motion
  if (!webGLSupported || prefersReducedMotion) {
    return (
      <div className={`timeline-3d-fallback ${className}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="timeline-node-fallback"
            style={{
              position: 'absolute',
              left: '-12px',
              top: `${index * 60}px`,
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme === 'dark' ? '#4a90e2' : '#007bff'}, ${theme === 'dark' ? '#74b9ff' : '#0984e3'})`,
              boxShadow: `0 4px 12px rgba(0, 123, 255, 0.3)`,
              border: '3px solid white',
              zIndex: 10,
            }}
            title={`${item.title} - ${item.period}`}
          />
        ))}
      </div>
    );
  }

  if (!items.length) return null;

  const canvasHeight = Math.max(items.length * 100, 300);

  return (
    <div 
      className={`timeline-3d-container ${className}`}
      style={{ 
        position: 'absolute',
        left: '-50px',
        top: '0',
        width: '100px',
        height: `${canvasHeight}px`,
        zIndex: 5,
      }}
    >
      <Suspense fallback={<Timeline3DLoader />}>
        <Canvas
          camera={{ 
            position: [2, 0, 3], 
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
          <Timeline3DScene
            items={items}
            theme={theme}
            hoveredIndex={hoveredIndex}
            onNodeHover={handleNodeHover}
            onNodeLeave={handleNodeLeave}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default TimelineNodes3D;
