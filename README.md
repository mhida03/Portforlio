# React 3D Portfolio - Motie HIDA

A modern, responsive React.js portfolio with 3D elements, built with Vite and featuring dynamic content management.

## 🚀 Features

### Core Technologies
- **React 18** with Vite for fast development
- **Bootstrap 5** for responsive grid system
- **Framer Motion** for smooth animations
- **react-three-fiber** + **@react-three/drei** for 3D elements
- **React Router DOM** for navigation
- **CSS Variables** for theming

### Portfolio Sections
1. **Hero Section** - 3D photo frame with animated decorative elements
2. **About** - Personal summary with soft skills and languages
3. **Skills** - Categorized technical skills with color-coded chips
4. **Experience** - Professional timeline with detailed highlights
5. **Projects** - Filterable project grid with detailed modals
6. **Education** - Academic timeline
7. **Contact** - Validated contact form with mailto fallback
8. **Footer** - Complete contact information and navigation

### Key Features
- ✅ **Responsive Design** - Mobile-first approach with Bootstrap grid
- ✅ **3D Hero Section** - Animated photo frame with floating particles
- ✅ **Project Filtering** - Filter by category (AI & Vision, Java & Spring, etc.)
- ✅ **Project Modals** - Detailed project information with technologies
- ✅ **Form Validation** - Client-side validation with error messages
- ✅ **Smooth Scrolling** - Navigation with active section highlighting
- ✅ **Accessibility** - ARIA labels, keyboard navigation, focus styles
- ✅ **SEO Optimized** - Meta tags and semantic HTML structure
- ✅ **Theme Support** - Light/dark theme toggle ready
- ✅ **Performance** - Optimized animations and lazy loading

## 📁 Project Structure

```
react-3d-portfolio/
├── public/
│   ├── assets/
│   │   ├── Motie_Hida_CV.pdf
│   │   └── profile-photo.jpg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── three/
│   │   │   ├── SectionParticles.jsx
│   │   │   ├── SkillConstellation.jsx
│   │   │   └── TimelineNodes3D.jsx
│   │   ├── ui/
│   │   │   └── TiltCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero3D.jsx
│   │   ├── NavBar.jsx
│   │   ├── ParallaxSection.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── SkillChips.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Timeline.jsx
│   ├── data/
│   │   └── profile.json
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   └── enhanced.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-3d-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Data Management

### Project Categories

The portfolio supports filtering by these categories:
- `AI & Vision`
- `Java & Spring`
- `Symfony / DevOps`
- `Full-stack`
- `DevOps`

## 🎨 Customization

### Styling

The portfolio uses CSS variables for easy theming:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  /* ... more variables */
}
```

### Skill Categories Colors

Each skill category has a unique color defined in `SkillChips.jsx`:

```javascript
const colors = {
  'Langages': '#007bff',
  'Frameworks': '#28a745',
  'API': '#ffc107',
  'Build & CI/CD': '#dc3545',
  'DevOps': '#6f42c1',
  'Databases': '#fd7e14',
  'Monitoring': '#20c997'
};
```

### 3D Elements

The 3D photo frame can be customized in `Hero3D.jsx`:
- Decorative elements positioning
- Floating particles animation
- Professional badge styling

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

Key responsive features:
- Collapsible navigation
- Stacked layout on mobile
- Optimized 3D elements for mobile
- Touch-friendly interactions

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Focus indicators** for all interactive elements
- **Screen reader** friendly content
- **Reduced motion** support via `prefers-reduced-motion`

## 🔧 Performance Optimizations

- **Lazy loading** for 3D components
- **Optimized animations** with GPU acceleration
- **Efficient re-renders** with React.memo
- **Code splitting** with dynamic imports
- **Image optimization** recommendations
- **Bundle size optimization** with Vite

## 📧 Contact Form

The contact form features:
- **Client-side validation** with real-time feedback
- **Mailto fallback** for form submission
- **Accessible error messages** in French
- **Required field indicators**
- **Email format validation**

## 🌐 SEO & Meta Tags

The portfolio includes:
- **OpenGraph tags** for social media sharing
- **Meta descriptions** for search engines
- **Structured data** for better indexing
- **Semantic HTML5** elements
- **Clean URLs** with React Router

## 🧪 Testing

The project includes basic test setup:
- **Component tests** with React Testing Library
- **Accessibility tests** with jest-axe
- **Performance monitoring** setup ready

Run tests:
```bash
npm test
```

## 🚀 Deployment

### Netlify/Vercel Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

### Environment Variables

For production deployment, consider setting:
- `VITE_APP_TITLE` - Application title
- `VITE_APP_DESCRIPTION` - Meta description
- `VITE_APP_URL` - Canonical URL

## 📄 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

WebGL support required for 3D elements (graceful fallback included).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Three Fiber** community for 3D capabilities
- **Framer Motion** for smooth animations
- **Bootstrap** team for the responsive framework
- **Vite** team for the fast build tool

---

**Built with ❤️ by Motie HIDA**

For questions or support, contact: motiehida1@gmail.com
