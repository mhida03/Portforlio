import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import profileData from '../data/profile.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    {
      name: 'Email',
      url: `mailto:${profileData.email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/motie-hida',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/motie-hida',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="text-white mb-3">{profileData.name}</h5>
              <p className="text-muted mb-3">
                {profileData.title}
              </p>
              <p className="text-muted mb-3">
                📍 {profileData.location}
              </p>
              <p className="text-muted">
                {profileData.summary}
              </p>
            </motion.div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h6 className="text-white mb-3">Navigation</h6>
              <ul className="list-unstyled">
                {quickLinks.map((link) => (
                  <li key={link.id} className="mb-2">
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="text-muted text-decoration-none"
                      style={{ transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h6 className="text-white mb-3">Contact</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a 
                    href={`mailto:${profileData.email}`}
                    className="text-muted text-decoration-none d-flex align-items-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    {profileData.email}
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href={`tel:${profileData.phone}`}
                    className="text-muted text-decoration-none d-flex align-items-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    {profileData.phone}
                  </a>
                </li>
                <li className="mb-2">
                  <span className="text-muted d-flex align-items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {profileData.location}
                  </span>
                </li>
              </ul>
            </motion.div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h6 className="text-white mb-3">Suivez-moi</h6>
              <div className="d-flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted"
                    whileHover={{ 
                      scale: 1.2, 
                      color: 'var(--primary-color)',
                      y: -2
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="mt-4">
                <h6 className="text-white mb-3">Disponibilité</h6>
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-2"
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#28a745',
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                  <small className="text-muted">{profileData.availability}</small>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />

        <Row className="align-items-center">
          <Col md={6}>
            <motion.p 
              className="text-muted mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              © {currentYear} {profileData.name}. Tous droits réservés.
            </motion.p>
          </Col>
          <Col md={6} className="text-md-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <small className="text-muted">
                Développé avec ❤️ en React & Three.js
              </small>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
