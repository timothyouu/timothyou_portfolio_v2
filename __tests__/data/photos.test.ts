import { photos, type Photo } from '@/data/photos'

describe('data/photos', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(photos)).toBe(true)
    expect(photos.length).toBeGreaterThan(0)
  })

  it('every entry has a path and location string', () => {
    photos.forEach((p: Photo) => {
      expect(typeof p.path).toBe('string')
      expect(p.path.length).toBeGreaterThan(0)
      expect(typeof p.location).toBe('string')
      expect(p.location.length).toBeGreaterThan(0)
    })
  })

  it('every path starts with /', () => {
    photos.forEach((p) => {
      expect(p.path).toMatch(/^\//)
    })
  })

  it('has no duplicate paths', () => {
    const paths = photos.map((p) => p.path)
    expect(new Set(paths).size).toBe(paths.length)
  })
})
