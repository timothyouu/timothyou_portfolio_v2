import { LINKS } from '@/data/v2/config'

describe('data/v2/config', () => {
  it('LINKS contains all expected keys', () => {
    const expectedKeys = [
      'github', 'linkedin', 'x', 'email', 'resume',
      'web', 'figma', 'openai', 'acm', 'fullyhacks', 'caltech',
    ]
    expectedKeys.forEach((key) => {
      expect(LINKS).toHaveProperty(key)
    })
  })

  it('all link values are non-empty strings', () => {
    Object.values(LINKS).forEach((url) => {
      expect(typeof url).toBe('string')
      expect(url.length).toBeGreaterThan(0)
    })
  })

  it('web links start with http or mailto', () => {
    Object.values(LINKS).forEach((url) => {
      expect(url).toMatch(/^(https?:\/\/|mailto:|\/)/i)
    })
  })

  it('github link points to the correct user', () => {
    expect(LINKS.github).toContain('timothyouu')
  })

  it('email link uses mailto protocol', () => {
    expect(LINKS.email).toMatch(/^mailto:/)
  })
})
