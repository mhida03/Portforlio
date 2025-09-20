import React from 'react';
import { motion } from 'framer-motion';
import profileData from '../data/profile.json';

const Hero3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="hero-photo-container d-flex justify-content-center align-items-center"
    >
      <div className="photo-frame">
        <div className="photo-frame-inner">
          <div className="photo-frame-border">
            <img 
              src={profileData.photo || "assets/profile-photo.jpg"} 
              alt={`Photo de ${profileData.name}`}
              className="profile-photo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="photo-placeholder" style={{ display: 'none' }}>
              <div className="placeholder-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="mt-2 text-muted">Photo de profil</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="frame-decoration frame-decoration-1"></div>
          <div className="frame-decoration frame-decoration-2"></div>
          <div className="frame-decoration frame-decoration-3"></div>
          <div className="frame-decoration frame-decoration-4"></div>
          
          {/* Floating particles */}
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
          <div className="floating-particle particle-4"></div>
          <div className="floating-particle particle-5"></div>
        </div>
        
        {/* Professional badge */}
        <div className="professional-badge">
          <span className="badge-text">Développeur</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero3D;
