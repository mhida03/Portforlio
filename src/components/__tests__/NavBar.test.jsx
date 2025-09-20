import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../NavBar'

const MockNavBar = ({ theme = 'light', toggleTheme = () => {} }) => (
  <BrowserRouter>
    <NavBar theme={theme} toggleTheme={toggleTheme} />
  </BrowserRouter>
)

describe('NavBar', () => {
  test('renders navigation links', () => {
    render(<MockNavBar />)
    
    expect(screen.getByText('Motie')).toBeInTheDocument()
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('À propos')).toBeInTheDocument()
    expect(screen.getByText('Compétences')).toBeInTheDocument()
    expect(screen.getByText('Expérience')).toBeInTheDocument()
    expect(screen.getByText('Projets')).toBeInTheDocument()
    expect(screen.getByText('Formation')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('renders theme toggle button', () => {
    render(<MockNavBar />)
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeToggle).toBeInTheDocument()
  })

  test('applies correct theme class', () => {
    const { rerender } = render(<MockNavBar theme="light" />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    
    rerender(<MockNavBar theme="dark" />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
