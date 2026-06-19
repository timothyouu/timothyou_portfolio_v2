import { projects, type Project } from '@/data/projects'

describe('data/projects', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every entry has the required fields', () => {
    projects.forEach((p: Project) => {
      expect(typeof p.path).toBe('string')
      expect(typeof p.project).toBe('string')
      expect(typeof p.date).toBe('string')
      expect(typeof p.tech).toBe('string')
      expect(typeof p.description).toBe('string')
    })
  })

  it('every path starts with /', () => {
    projects.forEach((p) => {
      expect(p.path).toMatch(/^\//)
    })
  })

  it('has no duplicate project names', () => {
    const names = projects.map((p) => p.project)
    expect(new Set(names).size).toBe(names.length)
  })

  it('every date string is non-empty', () => {
    projects.forEach((p) => {
      expect(p.date.length).toBeGreaterThan(0)
    })
  })
})
