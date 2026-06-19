import { render, screen } from '@testing-library/react'
import Footer from '@/components/v2/Footer'
import { LINKS } from '@/data/v2/config'

describe('v2/Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 Timothy Ou/)).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByText('github')).toBeInTheDocument()
    expect(screen.getByText('linkedin')).toBeInTheDocument()
    expect(screen.getByText('x')).toBeInTheDocument()
    expect(screen.getByText('email')).toBeInTheDocument()
  })

  it('social links point to the correct URLs', () => {
    render(<Footer />)
    expect(screen.getByText('github').closest('a')).toHaveAttribute('href', LINKS.github)
    expect(screen.getByText('linkedin').closest('a')).toHaveAttribute('href', LINKS.linkedin)
    expect(screen.getByText('email').closest('a')).toHaveAttribute('href', LINKS.email)
  })

  it('webring has prev/next navigation', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Previous site in webring')).toBeInTheDocument()
    expect(screen.getByLabelText('Next site in webring')).toBeInTheDocument()
  })

  it('renders inside a footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
