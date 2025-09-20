import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import TiltCard from './ui/TiltCard';

const ProjectCard = ({ project, onClick }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI & Vision': '#6f42c1',
      'Symfony / DevOps': '#fd7e14',
      'Java & Spring': '#28a745',
      'Full-stack': '#007bff',
      'DevOps': '#dc3545',
      'default': '#6c757d'
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'AI & Vision': '🤖',
      'Symfony / DevOps': '⚙️',
      'Java & Spring': '☕',
      'Full-stack': '🌐',
      'DevOps': '🚀',
      'default': '💻'
    };
    return icons[category] || icons.default;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="h-100"
    >
      <TiltCard intensity={12} className="h-100">
        <Card 
          className="project-card glass-card h-100 border-0 shadow-sm hover-lift gpu-accelerated"
          onClick={() => onClick(project)}
          style={{ cursor: 'pointer' }}
        >
        <Card.Body className="d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <span className="me-2 fs-4 floating-element">{getCategoryIcon(project.category)}</span>
            <span 
              className="badge rounded-pill px-3 py-2 pulse-accent"
              style={{ 
                backgroundColor: getCategoryColor(project.category),
                color: 'white',
                fontSize: '0.75rem'
              }}
            >
              {project.category}
            </span>
          </div>

          <Card.Title className="h5 mb-3 gradient-text">
            {project.title}
          </Card.Title>

          <Card.Text className="text-muted mb-3 flex-grow-1">
            {project.impact}
          </Card.Text>

          <div className="project-stack mt-auto">
            {project.stack.map((tech, index) => (
              <motion.span
                key={`${project.title}-${tech}-${index}`}
                className="stack-tag enhanced"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: getCategoryColor(project.category),
                  color: 'white'
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-top">
            <small className="text-primary fw-medium animated-link">
              Cliquez pour plus de détails →
            </small>
          </div>
        </Card.Body>
        </Card>
      </TiltCard>
    </motion.div>
  );
};

export default ProjectCard;
