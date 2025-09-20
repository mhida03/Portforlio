import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Particle system component
const ParticleSystem = ({ theme, count, isVisible }) => {
  const pointsRef = useRef();
  const [positions, setPositions] = useState(null);
  const velocities = useRef(new Float32Array(count * 3));

  // Generate particle positions and velocities
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread particles across a larger area
      positions[i * 3] = (Math.random() - 0.5) * 12;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;  // z
      
      // Random velocities for organic movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, [count]);

  useEffect(() => {
    setPositions(particleData.positions);
    velocities.current = particleData.velocities;
  }, [particleData]);

  // Enhanced animation loop
  useFrame((state) => {
    if (!pointsRef.current || !isVisible) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Gentle rotation
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    pointsRef.current.rotation.y = time * 0.05;
    
    // Organic floating motion with boundaries
    for (let i = 0; i < positions.length; i += 3) {
      const x = i;
      const y = i + 1;
      const z = i + 2;
      
      // Apply velocities
      positions[x] += velocities.current[x];
      positions[y] += velocities.current[y] + Math.sin(time + positions[x]) * 0.001;
      positions[z] += velocities.current[z];
      
      // Boundary checking and bouncing
      if (Math.abs(positions[x]) > 6) velocities.current[x] *= -0.8;
      if (Math.abs(positions[y]) > 5) velocities.current[y] *= -0.8;
      if (Math.abs(positions[z]) > 3) velocities.current[z] *= -0.8;
      
      // Add some randomness to prevent predictable patterns
      if (Math.random() < 0.001) {
        velocities.current[x] += (Math.random() - 0.5) * 0.001;
        velocities.current[y] += (Math.random() - 0.5) * 0.001;
        velocities.current[z] += (Math.random() - 0.5) * 0.001;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!positions) return null;

  const particleColor = theme === 'dark' ? '#ffffff' : '#007bff';

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Enhanced SVG Fallback component
const SVGFallback = ({ theme, count }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.4,
      animationDelay: Math.random() * 6,
    }));
  }, [count]);

  const particleColor = theme === 'dark' ? '#ffffff' : '#007bff';

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {particles.map((particle) => (
        <circle
          key={particle.id}
          cx={`${particle.x}%`}
          cy={`${particle.y}%`}
          r={particle.size}
          fill={particleColor}
          opacity={particle.opacity}
          filter="url(#glow)"
          style={{
            animation: `float ${6 + particle.animationDelay}s ease-in-out infinite`,
            animationDelay: `${particle.animationDelay}s`
          }}
        />
      ))}
    </svg>
  );
};

// Loading fallback
const ParticleLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin opacity-50" />
  </div>
);

const SectionParticles = ({ theme = 'light' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef();

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        // Additional WebGL capability checks
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        
        // Avoid software rendering
        if (renderer.toLowerCase().includes('software') || 
            renderer.toLowerCase().includes('llvmpipe')) {
          setWebGLSupported(false);
        } else {
          setWebGLSupported(true);
        }
      } else {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Check for mobile device and reduced motion
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

  // Enhanced Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Determine particle count based on device and performance
  const getParticleCount = () => {
    if (isMobile) return 15;
    
    // Check for high-end devices
    const isHighEnd = navigator.hardwareConcurrency >= 8 && 
                     window.devicePixelRatio <= 2;
    
    return isHighEnd ? 40 : 25;
  };

  const particleCount = getParticleCount();

  if (prefersReducedMotion || !webGLSupported) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <SVGFallback theme={theme} count={Math.min(particleCount, 20)} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <Suspense fallback={<ParticleLoader />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
          performance={{ min: 0.5 }}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ParticleSystem 
            theme={theme} 
            count={particleCount} 
            isVisible={isVisible}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SectionParticles;
