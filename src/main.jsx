import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

// Set up document metadata
document.title = 'Motie HIDA - Portfolio';
document.documentElement.lang = 'fr';

// Add meta tags for SEO
const metaTags = [
  { name: 'description', content: 'Portfolio de Motie HIDA - Développeur Junior Java/Spring Boot spécialisé en microservices, REST et DevOps' },
  { name: 'keywords', content: 'Java, Spring Boot, React, DevOps, Microservices, REST API, Portfolio, Développeur' },
  { name: 'author', content: 'Motie HIDA' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  { property: 'og:title', content: 'Motie HIDA - Portfolio' },
  { property: 'og:description', content: 'Développeur Junior Java/Spring Boot spécialisé en microservices, REST et DevOps' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'fr_FR' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Motie HIDA - Portfolio' },
  { name: 'twitter:description', content: 'Développeur Junior Java/Spring Boot spécialisé en microservices, REST et DevOps' }
];

metaTags.forEach(tag => {
  const meta = document.createElement('meta');
  if (tag.name) meta.name = tag.name;
  if (tag.property) meta.property = tag.property;
  meta.content = tag.content;
  document.head.appendChild(meta);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
