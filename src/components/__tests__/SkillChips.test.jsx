import { render, screen } from '@testing-library/react'
import SkillChips from '../SkillChips'

const mockSkills = {
  "Langages": ["Java 17", "SQL", "JavaScript"],
  "Frameworks": ["Spring Boot", "React"],
  "DevOps": ["Docker", "Jenkins"]
}

describe('SkillChips', () => {
  test('renders all skill categories', () => {
    render(<SkillChips skills={mockSkills} />)
    
    expect(screen.getByText('Langages')).toBeInTheDocument()
    expect(screen.getByText('Frameworks')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
  })

  test('renders all skill chips', () => {
    render(<SkillChips skills={mockSkills} />)
    
    expect(screen.getByText('Java 17')).toBeInTheDocument()
    expect(screen.getByText('SQL')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('Jenkins')).toBeInTheDocument()
  })

  test('applies correct CSS classes', () => {
    render(<SkillChips skills={mockSkills} />)
    
    const javaChip = screen.getByText('Java 17')
    expect(javaChip).toHaveClass('skill-chip')
  })
})
