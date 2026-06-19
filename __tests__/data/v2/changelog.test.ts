import { CHANGELOG, CURRENT_VERSION, type ChangelogEntry } from '@/data/v2/changelog'

describe('data/v2/changelog', () => {
  it('exports a non-empty CHANGELOG array', () => {
    expect(Array.isArray(CHANGELOG)).toBe(true)
    expect(CHANGELOG.length).toBeGreaterThan(0)
  })

  it('every entry has version, date, and changes', () => {
    CHANGELOG.forEach((entry: ChangelogEntry) => {
      expect(typeof entry.version).toBe('string')
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/)
      expect(typeof entry.date).toBe('string')
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Array.isArray(entry.changes)).toBe(true)
      expect(entry.changes.length).toBeGreaterThan(0)
    })
  })

  it('CURRENT_VERSION matches the first changelog entry', () => {
    expect(CURRENT_VERSION).toBe(CHANGELOG[0].version)
  })

  it('has no duplicate versions', () => {
    const versions = CHANGELOG.map((e) => e.version)
    expect(new Set(versions).size).toBe(versions.length)
  })

  it('every change is a non-empty string', () => {
    CHANGELOG.forEach((entry) => {
      entry.changes.forEach((c) => {
        expect(typeof c).toBe('string')
        expect(c.length).toBeGreaterThan(0)
      })
    })
  })
})
