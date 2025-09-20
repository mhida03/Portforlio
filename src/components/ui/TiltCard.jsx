import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = '', intensity = 15, ...props }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Enhanced tilt calculation with configurable intensity
    const rotateXValue = (mouseY / rect.height) * -intensity;
    const rotateYValue = (mouseX / rect.width) * intensity;
    
    // Parallax shadow calculation
    const shadowXValue = (mouseX / rect.width) * 20;
    const shadowYValue = (mouseY / rect.height) * 20;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setShadowX(shadowXValue);
    setShadowY(shadowYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShadowX(0);
    setShadowY(0);
  };

  const tiltStyle = prefersReducedMotion ? {} : {
    transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '20px' : '0px'})`,
    transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
  };

  const shadowStyle = {
    boxShadow: isHovered && !prefersReducedMotion
      ? `${shadowX}px ${20 + shadowY}px 40px rgba(0, 0, 0, 0.15), 
         ${shadowX * 0.5}px ${10 + shadowY * 0.5}px 20px rgba(0, 123, 255, 0.1),
         0 0 0 1px rgba(255, 255, 255, 0.1)`
      : '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    transition: 'box-shadow 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card gpu-accelerated ${className}`}
      style={{ 
        ...tiltStyle, 
        ...shadowStyle,
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ 
        duration: 0.3,
        ease: [0.23, 1, 0.320, 1]
      }}
      {...props}
    >
      {/* Gradient overlay for depth */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${135 + rotateY}deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%, 
              rgba(0, 0, 0, 0.05) 100%)`,
            borderRadius: 'inherit',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      
      <div style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
