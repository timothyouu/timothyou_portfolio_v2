import SkillGrid from '@/components/SkillGrid'
import { programmingLanguages, programmingTools, otherSkills } from '@/data/skills'

export default function Skills() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] px-5 py-8">
      <SkillGrid title="Programming Languages & Frameworks" skills={programmingLanguages} />
      <SkillGrid title="Programming Tools" skills={programmingTools} />
      <SkillGrid title="Other Skills" skills={otherSkills} />
    </div>
  )
}
