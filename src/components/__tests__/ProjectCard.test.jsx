import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '../ProjectCard'

const mockProject = {
  title: "OptiTry – Essayage AR & IA de lunettes",
  category: "AI & Vision",
  stack: ["Symfony", ".NET", "Python"],
  impact: "Essayage virtuel webcam + recommandations morphologiques"
}

describe('ProjectCard', () => {
  test('renders project information', () => {
    const mockOnClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)
    
    expect(screen.getByText('OptiTry – Essayage AR & IA de lunettes')).toBeInTheDocument()
    expect(screen.getByText('AI & Vision')).toBeInTheDocument()
    expect(screen.getByText('Essayage virtuel webcam + recommandations morphologiques')).toBeInTheDocument()
  })

  test('renders technology stack', () => {
    const mockOnClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)
    
    expect(screen.getByText('Symfony')).toBeInTheDocument()
    expect(screen.getByText('.NET')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  test('calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)
    
    const card = screen.getByRole('article')
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledWith(mockProject)
  })

  test('has correct accessibility attributes', () => {
    const mockOnClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('OptiTry'))
  })
})
