import { render, screen } from '@testing-library/react'
import SkillGrid from '@/components/v1/SkillGrid'

describe('v1/SkillGrid', () => {
  const skills = ['JavaScript', 'Python', 'C++']

  it('renders the section title', () => {
    render(<SkillGrid title="Languages" skills={skills} />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders every skill passed in', () => {
    render(<SkillGrid title="Languages" skills={skills} />)
    skills.forEach((s) => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })

  it('renders no extra skill tiles', () => {
    const { container } = render(<SkillGrid title="Languages" skills={skills} />)
    const tiles = container.querySelectorAll('.flex.flex-wrap > div')
    expect(tiles.length).toBe(skills.length)
  })

  it('renders an h2 heading', () => {
    const { container } = render(<SkillGrid title="Tools" skills={['Git']} />)
    expect(container.querySelector('h2')).toHaveTextContent('Tools')
  })
})
