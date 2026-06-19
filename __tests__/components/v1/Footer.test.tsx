import { render, screen } from '@testing-library/react'
import Footer from '@/components/v1/Footer'

describe('v1/Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 Timothy Ou/)).toBeInTheDocument()
  })

  it('renders the "Made with" text', () => {
    render(<Footer />)
    expect(screen.getByText(/Made with/)).toBeInTheDocument()
  })

  it('renders inside a footer element', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
