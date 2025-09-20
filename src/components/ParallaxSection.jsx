import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  className = '', 
  parallaxStrength = 0.5,
  ...props 
}) => {
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Limit parallax movement to ±20px to avoid motion sickness
  const maxOffset = 20;
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [maxOffset * parallaxStrength, -maxOffset * parallaxStrength]
  );

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Disable parallax if user prefers reduced motion
  const parallaxStyle = prefersReducedMotion ? {} : { y };

  return (
    <motion.section
      ref={sectionRef}
      className={`parallax-section ${className}`}
      style={parallaxStyle}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default ParallaxSection;
