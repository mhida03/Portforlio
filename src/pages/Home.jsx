import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import SkillChips from '../components/SkillChips';
import Timeline from '../components/Timeline';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SectionParticles from '../components/three/SectionParticles';
import ParallaxSection from '../components/ParallaxSection';
import '../styles/enhanced.css';
import profileData from '../data/profile.json';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Get unique project categories
  const projectCategories = ['All', ...new Set(profileData.projects.map(p => p.category))];

  // Filter projects based on selected category
  const filteredProjects = projectFilter === 'All' 
    ? profileData.projects 
    : profileData.projects.filter(p => p.category === projectFilter);

  // Handle project modal
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Handle contact form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!contactForm.name.trim()) errors.name = 'Le nom est requis';
    if (!contactForm.email.trim()) errors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = 'Email invalide';
    if (!contactForm.subject.trim()) errors.subject = 'Le sujet est requis';
    if (!contactForm.message.trim()) errors.message = 'Le message est requis';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create mailto link
      const subject = encodeURIComponent(contactForm.subject);
      const body = encodeURIComponent(
        `Nom: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
      );
      const mailtoLink = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      
      // Show success message
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      
      // Reset form
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.h1 
                  className="hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {profileData.name}
                </motion.h1>
                
                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {profileData.title}
                </motion.p>
                
                <motion.p 
                  className="lead mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {profileData.summary}
                </motion.p>
                
                <motion.div 
                  className="d-flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Button 
                    variant="primary" 
                    size="lg"
                    href={profileData.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Télécharger CV
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    📧 Me contacter
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Hero3D />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <h2 className="mb-4">À propos de moi</h2>
                <p className="lead mb-4">{profileData.summary}</p>
                <p className="mb-4">
                  Actuellement en 5e année d'ingénierie informatique à l'EHEI, je suis passionné par le développement 
                  d'applications robustes et scalables. Mon expérience couvre le développement full-stack, 
                  l'architecture microservices, et les pratiques DevOps modernes.
                </p>
              </Col>
            </Row>
            
            <Row className="mt-5">
              <Col lg={6}>
                <h4 className="mb-3 text-primary">🎯 Soft Skills</h4>
                <SkillChips skills={profileData.softSkills} category="soft" />
              </Col>
              <Col lg={6}>
                <h4 className="mb-3 text-primary">🌍 Langues</h4>
                <div className="d-flex flex-wrap gap-3">
                  {profileData.languages.map((lang, index) => (
                    <motion.div
                      key={`${lang.label}-${index}`}
                      className="language-badge"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="fw-medium">{lang.label}</span>
                      <span className="language-level">{lang.level}</span>
                    </motion.div>
                  ))}
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Skills Section */}
      <ParallaxSection id="skills" className="py-5 bg-light" parallaxStrength={0.3}>
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center mb-5">
                <h2 className="mb-4">Compétences techniques</h2>
                <p className="lead">
                  Technologies et outils que j'utilise pour créer des solutions innovantes
                </p>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <SkillChips 
                  skills={profileData.skills} 
                  theme="light"
                  showConstellation={true}
                />
              </Col>
            </Row>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Experience Section */}
      <ParallaxSection id="experience" className="py-5" parallaxStrength={0.4}>
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center mb-5">
                <h2 className="mb-4">Expérience professionnelle</h2>
                <p className="lead">
                  Mon parcours professionnel et les projets sur lesquels j'ai travaillé
                </p>
              </Col>
            </Row>
            
            <Row>
              <Col lg={10} className="mx-auto">
                <Timeline 
                  items={profileData.experience} 
                  type="experience" 
                  theme="light"
                />
              </Col>
            </Row>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Projects Section */}
      <ParallaxSection id="projects" className="py-5 bg-light position-relative" parallaxStrength={0.5}>
        {/* WebGL Background Particles */}
        <SectionParticles theme="light" />
        
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center mb-5">
                <h2 className="mb-4">Mes projets</h2>
                <p className="lead">
                  Une sélection de projets qui démontrent mes compétences et ma passion pour la technologie
                </p>
              </Col>
            </Row>

            {/* Project Filters */}
            <Row className="mb-4">
              <Col>
                <div className="project-filters">
                  {projectCategories.map((category) => (
                    <motion.button
                      key={category}
                      className={`filter-btn ${projectFilter === category ? 'active' : ''}`}
                      onClick={() => setProjectFilter(category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category === 'All' ? 'Tous' : category}
                    </motion.button>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={projectFilter} // Re-animate when filter changes
            >
              <Row>
                {filteredProjects.map((project, index) => (
                  <Col lg={4} md={6} className="mb-4" key={`${project.title}-${index}`}>
                    <ProjectCard 
                      project={project} 
                      onClick={handleProjectClick}
                    />
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Education Section */}
      <ParallaxSection id="education" className="py-5" parallaxStrength={0.3}>
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center mb-5">
                <h2 className="mb-4">Formation</h2>
                <p className="lead">
                  Mon parcours académique et les formations qui ont façonné mes compétences
                </p>
              </Col>
            </Row>
            
            <Row>
              <Col lg={10} className="mx-auto">
                <Timeline 
                  items={profileData.education} 
                  type="education" 
                  theme="light"
                />
              </Col>
            </Row>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection id="contact" className="py-5 bg-light" parallaxStrength={0.2}>
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Row>
              <Col lg={8} className="mx-auto text-center mb-5">
                <h2 className="mb-4">Contactez-moi</h2>
                <p className="lead">
                  Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités
                </p>
              </Col>
            </Row>

            <Row>
              <Col lg={8} className="mx-auto">
                {showAlert && (
                  <Alert variant="success" className="mb-4">
                    Votre client email va s'ouvrir avec le message pré-rempli !
                  </Alert>
                )}

                <div className="contact-form">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nom complet *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={handleFormChange}
                            isInvalid={!!formErrors.name}
                            placeholder="Votre nom"
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleFormChange}
                            isInvalid={!!formErrors.email}
                            placeholder="votre.email@exemple.com"
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Sujet *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleFormChange}
                        isInvalid={!!formErrors.subject}
                        placeholder="Sujet de votre message"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.subject}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={contactForm.message}
                        onChange={handleFormChange}
                        isInvalid={!!formErrors.message}
                        placeholder="Votre message..."
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center">
                      <Button type="submit" variant="primary" size="lg">
                        📧 Envoyer le message
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-2">Ou contactez-moi directement :</p>
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                      <a href={`mailto:${profileData.email}`} className="text-decoration-none">
                        📧 {profileData.email}
                      </a>
                      <a href={`tel:${profileData.phone}`} className="text-decoration-none">
                        📱 {profileData.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        show={showModal}
        onHide={handleCloseModal}
      />
    </div>
  );
};

export default Home;
