import { render, screen } from '@testing-library/react'
import Changelog from '@/components/v2/Changelog'
import { CHANGELOG } from '@/data/v2/changelog'

describe('v2/Changelog', () => {
  it('renders all changelog versions', () => {
    render(<Changelog />)
    CHANGELOG.forEach((entry) => {
      expect(screen.getByText(`v${entry.version}`)).toBeInTheDocument()
    })
  })

  it('renders all changelog dates', () => {
    render(<Changelog />)
    // dates may repeat across entries, so use getAllByText
    const uniqueDates = [...new Set(CHANGELOG.map((e) => e.date))]
    uniqueDates.forEach((date) => {
      const count = CHANGELOG.filter((e) => e.date === date).length
      expect(screen.getAllByText(date)).toHaveLength(count)
    })
  })

  it('renders changes as list items', () => {
    const { container } = render(<Changelog />)
    const items = container.querySelectorAll('li')
    const totalChanges = CHANGELOG.reduce((sum, e) => sum + e.changes.length, 0)
    expect(items.length).toBe(totalChanges)
  })

  it('renders first change text from the latest entry', () => {
    render(<Changelog />)
    expect(screen.getByText(CHANGELOG[0].changes[0])).toBeInTheDocument()
  })
})
