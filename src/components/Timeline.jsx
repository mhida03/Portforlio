import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineNodes3D from './three/TimelineNodes3D';

const Timeline = ({ items, type = 'experience', theme = 'light' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const handleItemHover = (index) => {
    setHoveredIndex(index);
  };

  const handleItemLeave = () => {
    setHoveredIndex(null);
  };

  const renderExperienceItem = (item, index) => (
    <motion.div
      key={index}
      className="timeline-item"
      variants={itemVariants}
      onMouseEnter={() => handleItemHover(index)}
      onMouseLeave={handleItemLeave}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      <div className={`timeline-content glass-card hover-lift ${hoveredIndex === index ? 'depth-3' : 'depth-1'}`}>
        <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
          <h5 className="mb-1 gradient-text">{item.title}</h5>
          <span className="badge bg-secondary pulse-accent">{item.period}</span>
        </div>
        
        {item.company && (
          <h6 className="text-muted mb-3">{item.company}</h6>
        )}
        
        {item.highlights && item.highlights.length > 0 && (
          <ul className="list-unstyled">
            {item.highlights.map((highlight, idx) => (
              <motion.li 
                key={idx} 
                className="mb-2 d-flex align-items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-primary me-2 floating-element">▸</span>
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );

  const renderEducationItem = (item, index) => (
    <motion.div
      key={index}
      className="timeline-item"
      variants={itemVariants}
      onMouseEnter={() => handleItemHover(index)}
      onMouseLeave={handleItemLeave}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      <div className={`timeline-content hover-lift ${hoveredIndex === index ? 'depth-3' : 'depth-1'}`}>
        <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
          <h5 className="mb-1 gradient-text">{item.title}</h5>
          <span className="badge bg-secondary pulse-accent">{item.period}</span>
        </div>
        
        {item.institution && (
          <h6 className="text-muted mb-2">{item.institution}</h6>
        )}
        
        {item.description && (
          <p className="text-muted mb-0">{item.description}</p>
        )}
        
        {item.achievements && item.achievements.length > 0 && (
          <ul className="list-unstyled mt-2">
            {item.achievements.map((achievement, idx) => (
              <motion.li 
                key={idx} 
                className="mb-1 d-flex align-items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-success me-2 floating-element">✓</span>
                <span className="small">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="timeline-container position-relative">
      {/* 3D Timeline Nodes - only for experience type */}
      {type === 'experience' && (
        <TimelineNodes3D 
          items={items} 
          theme={theme}
          hoveredIndex={hoveredIndex}
        />
      )}
      
      <motion.div
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {items.map((item, index) => {
          switch (type) {
            case 'experience':
              return renderExperienceItem(item, index);
            case 'education':
              return renderEducationItem(item, index);
            default:
              return renderExperienceItem(item, index);
          }
        })}
      </motion.div>
    </div>
  );
};

export default Timeline;
