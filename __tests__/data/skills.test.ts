import { programmingLanguages, programmingTools, otherSkills } from '@/data/skills'

describe('data/skills', () => {
  it('programmingLanguages is a non-empty string array', () => {
    expect(Array.isArray(programmingLanguages)).toBe(true)
    expect(programmingLanguages.length).toBeGreaterThan(0)
    programmingLanguages.forEach((s) => expect(typeof s).toBe('string'))
  })

  it('programmingTools is a non-empty string array', () => {
    expect(Array.isArray(programmingTools)).toBe(true)
    expect(programmingTools.length).toBeGreaterThan(0)
    programmingTools.forEach((s) => expect(typeof s).toBe('string'))
  })

  it('otherSkills is a non-empty string array', () => {
    expect(Array.isArray(otherSkills)).toBe(true)
    expect(otherSkills.length).toBeGreaterThan(0)
    otherSkills.forEach((s) => expect(typeof s).toBe('string'))
  })

  it('no duplicates within each category', () => {
    expect(new Set(programmingLanguages).size).toBe(programmingLanguages.length)
    expect(new Set(programmingTools).size).toBe(programmingTools.length)
    expect(new Set(otherSkills).size).toBe(otherSkills.length)
  })
})
