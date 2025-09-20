import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, show, onHide }) => {
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

  const getProjectDetails = (project) => {
    // Extended project details based on the project title
    const details = {
      'OptiTry – Essayage AR & IA de lunettes': {
        description: "Plateforme innovante d'essayage virtuel de lunettes utilisant la réalité augmentée et l'intelligence artificielle pour offrir une expérience d'achat personnalisée.",
        features: [
          "Essayage virtuel en temps réel via webcam",
          "Recommandations basées sur la morphologie du visage",
          "Dashboard analytics pour les opticiens",
          "Interface utilisateur intuitive et responsive",
          "Intégration avec systèmes de gestion existants"
        ],
        challenges: [
          "Détection précise des points faciaux",
          "Optimisation des performances en temps réel",
          "Adaptation aux différents types de caméras",
          "Gestion des variations d'éclairage"
        ],
        results: [
          "Amélioration de l'expérience client",
          "Réduction des retours produits",
          "Augmentation des ventes en ligne",
          "Données analytiques précieuses pour les opticiens"
        ]
      },
      'CRM Symfony & DevOps': {
        description: "Système de gestion de la relation client complet avec pipeline DevOps automatisé, monitoring en temps réel et architecture sécurisée.",
        features: [
          "Gestion complète des clients et prospects",
          "Système de facturation intégré",
          "Authentification sécurisée multi-niveaux",
          "Pipeline CI/CD automatisé",
          "Monitoring et alertes en temps réel",
          "Déploiement containerisé avec Docker"
        ],
        challenges: [
          "Architecture microservices scalable",
          "Sécurisation des données sensibles",
          "Automatisation complète du déploiement",
          "Monitoring proactif des performances"
        ],
        results: [
          "Réduction du temps de déploiement de 80%",
          "Amélioration de la sécurité des données",
          "Monitoring proactif des incidents",
          "Scalabilité automatique selon la charge"
        ]
      },
      'Détection de type de sol (IA)': {
        description: "Projet de classification d'images utilisant l'apprentissage automatique pour identifier différents types de sols à partir de photographies.",
        features: [
          "Classification automatique d'images de sols",
          "Modèle d'apprentissage supervisé",
          "Interface de visualisation des résultats",
          "Matrice de confusion détaillée",
          "Analyse des performances du modèle"
        ],
        challenges: [
          "Préparation et nettoyage du dataset",
          "Optimisation des hyperparamètres",
          "Gestion du déséquilibre des classes",
          "Amélioration de la précision du modèle"
        ],
        results: [
          "Précision de classification de 63.8%",
          "Identification des axes d'amélioration",
          "Base solide pour implémentation CNN",
          "Compréhension approfondie du machine learning"
        ]
      },
      'Gestion Cabinet Dentaire': {
        description: "Application complète de gestion pour cabinet dentaire incluant la gestion des patients, rendez-vous et dossiers médicaux.",
        features: [
          "Gestion complète des patients",
          "Système de prise de rendez-vous",
          "Dossiers médicaux électroniques",
          "Interface desktop et web",
          "Rapports et statistiques",
          "Sauvegarde automatique des données"
        ],
        challenges: [
          "Interface utilisateur intuitive",
          "Sécurité des données médicales",
          "Synchronisation multi-plateforme",
          "Performance avec large volume de données"
        ],
        results: [
          "Digitalisation complète du cabinet",
          "Amélioration de l'efficacité administrative",
          "Réduction des erreurs de saisie",
          "Meilleur suivi des patients"
        ]
      },
      'JEE Réservations – Atlético de Madrid': {
        description: "Plateforme de réservation de billets pour les matchs de l'Atlético de Madrid avec gestion des rôles et intégration API externe.",
        features: [
          "Système de réservation de billets",
          "Gestion des rôles utilisateurs",
          "Intégration API matchs externe",
          "Interface responsive Bootstrap",
          "Gestion des paiements",
          "Historique des réservations"
        ],
        challenges: [
          "Gestion de la concurrence des réservations",
          "Intégration API externe fiable",
          "Sécurisation des transactions",
          "Interface utilisateur fluide"
        ],
        results: [
          "Système de réservation fonctionnel",
          "Gestion efficace des utilisateurs",
          "Intégration API réussie",
          "Interface utilisateur moderne"
        ]
      }
    };

    return details[project?.title] || {
      description: project?.impact || "Description du projet",
      features: ["Fonctionnalité principale"],
      challenges: ["Défi technique principal"],
      results: ["Résultat obtenu"]
    };
  };

  if (!project) return null;

  const projectDetails = getProjectDetails(project);

  return (
    <AnimatePresence>
      {show && (
        <Modal 
          show={show} 
          onHide={onHide} 
          size="lg" 
          centered
          backdrop="static"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Modal.Header closeButton className="border-bottom">
              <div className="d-flex align-items-center">
                <span className="me-3 fs-3">{getCategoryIcon(project.category)}</span>
                <div>
                  <Modal.Title className="h4 mb-1 text-primary">
                    {project.title}
                  </Modal.Title>
                  <span 
                    className="badge rounded-pill px-3 py-2"
                    style={{ 
                      backgroundColor: getCategoryColor(project.category),
                      color: 'white'
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="py-4">
              <div className="mb-4">
                <h5 className="text-primary mb-3">📋 Description</h5>
                <p className="text-muted">{projectDetails.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="text-primary mb-3">🛠️ Technologies utilisées</h5>
                <div className="d-flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="badge bg-light text-dark border px-3 py-2"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: getCategoryColor(project.category),
                        color: 'white'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-primary mb-3">✨ Fonctionnalités clés</h5>
                <ul className="list-unstyled">
                  {projectDetails.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="mb-2 d-flex align-items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-success me-2">▸</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h5 className="text-primary mb-3">🎯 Défis techniques</h5>
                <ul className="list-unstyled">
                  {projectDetails.challenges.map((challenge, index) => (
                    <motion.li 
                      key={index} 
                      className="mb-2 d-flex align-items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className="text-warning me-2">⚡</span>
                      <span>{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h5 className="text-primary mb-3">🏆 Résultats obtenus</h5>
                <ul className="list-unstyled">
                  {projectDetails.results.map((result, index) => (
                    <motion.li 
                      key={index} 
                      className="mb-2 d-flex align-items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <span className="text-success me-2">✓</span>
                      <span>{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-light rounded p-3">
                <h6 className="text-primary mb-2">💡 Impact du projet</h6>
                <p className="mb-0 text-muted">{project.impact}</p>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-top">
              <Button variant="outline-secondary" onClick={onHide}>
                Fermer
              </Button>
            </Modal.Footer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
