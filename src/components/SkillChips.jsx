import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillConstellation from './three/SkillConstellation';

const SkillChips = ({ skills, category, theme = 'light', showConstellation = false }) => {
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const chipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Langages': '#007bff',
      'Frameworks': '#28a745',
      'API': '#ffc107',
      'Build & CI/CD': '#dc3545',
      'DevOps': '#6f42c1',
      'Databases': '#fd7e14',
      'Monitoring': '#20c997',
      'default': '#6c757d'
    };
    return colors[category] || colors.default;
  };

  if (Array.isArray(skills)) {
    // For simple array of skills (like soft skills)
    return (
      <motion.div
        className="d-flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skill, index) => (
          <motion.span
            key={`${category || 'soft'}-${skill}-${index}`}
            className="skill-chip"
            variants={chipVariants}
            whileHover="hover"
            style={{
              backgroundColor: getCategoryColor(category),
              cursor: 'default'
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // For categorized skills object
  const allSkills = Object.values(skills).flat();
  
  return (
    <div className="skills-container">
      <div className="row">
        <div className={showConstellation ? "col-lg-8" : "col-12"}>
          {Object.entries(skills).map(([categoryName, skillList]) => (
            <motion.div
              key={categoryName}
              className="skill-category mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h5 className="mb-3" style={{ color: getCategoryColor(categoryName) }}>
                {categoryName}
              </h5>
              <motion.div
                className="d-flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {skillList.map((skill, index) => (
                  <motion.span
                    key={`${categoryName}-${skill}-${index}`}
                    className="skill-chip"
                    variants={chipVariants}
                    whileHover="hover"
                    onMouseEnter={() => setHighlightedSkill(skill)}
                    onMouseLeave={() => setHighlightedSkill(null)}
                    style={{
                      backgroundColor: highlightedSkill === skill 
                        ? getCategoryColor(categoryName) 
                        : getCategoryColor(categoryName),
                      opacity: highlightedSkill === skill ? 1 : (highlightedSkill ? 0.6 : 1),
                      cursor: 'default',
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {showConstellation && (
          <div className="col-lg-4 d-none d-lg-block">
            <div className="position-sticky" style={{ top: '100px' }}>
              <SkillConstellation
                skills={allSkills}
                highlightedSkill={highlightedSkill}
                theme={theme}
                onSkillHover={setHighlightedSkill}
                onSkillLeave={() => setHighlightedSkill(null)}
                className="mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillChips;
