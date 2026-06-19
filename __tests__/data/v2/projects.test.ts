import { HOME_PROJECTS, type HomeProject, type ProjectLink } from '@/data/v2/projects'

describe('data/v2/projects', () => {
  it('exports a non-empty HOME_PROJECTS array', () => {
    expect(Array.isArray(HOME_PROJECTS)).toBe(true)
    expect(HOME_PROJECTS.length).toBeGreaterThan(0)
  })

  it('every project has the required fields', () => {
    HOME_PROJECTS.forEach((p: HomeProject) => {
      expect(typeof p.n).toBe('string')
      expect(typeof p.title).toBe('string')
      expect(typeof p.blurb).toBe('string')
      expect(Array.isArray(p.meta)).toBe(true)
      expect(typeof p.ascii).toBe('string')
      expect(typeof p.label).toBe('string')
      expect(typeof p.detail).toBe('string')
      expect(Array.isArray(p.links)).toBe(true)
    })
  })

  it('project numbers are sequential zero-padded strings', () => {
    HOME_PROJECTS.forEach((p, i) => {
      expect(p.n).toBe(String(i + 1).padStart(2, '0'))
    })
  })

  it('has no duplicate titles', () => {
    const titles = HOME_PROJECTS.map((p) => p.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('every link has a label', () => {
    HOME_PROJECTS.forEach((p) => {
      p.links.forEach((lk: ProjectLink) => {
        expect(typeof lk.label).toBe('string')
        expect(lk.label.length).toBeGreaterThan(0)
      })
    })
  })

  it('meta arrays contain only non-empty strings', () => {
    HOME_PROJECTS.forEach((p) => {
      p.meta.forEach((m) => {
        expect(typeof m).toBe('string')
        expect(m.length).toBeGreaterThan(0)
      })
    })
  })

  it('image is either a string path or null', () => {
    HOME_PROJECTS.forEach((p) => {
      expect(p.image === null || typeof p.image === 'string').toBe(true)
    })
  })
})
