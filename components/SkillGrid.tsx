type SkillGridProps = {
  title: string
  skills: string[]
}

export default function SkillGrid({ title, skills }: SkillGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h2 className="text-[#BC95D1] text-4xl font-bold text-center mb-8 font-[family-name:var(--font-titan-one)]">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map(skill => (
          <div
            key={skill}
            className="bg-[#1E1B3A] text-[#e0cbff] font-bold text-lg rounded-2xl w-36 h-36 flex items-center justify-center text-center px-3 shadow-[0_4px_8px_rgba(0,0,0,0.3)] font-[family-name:var(--font-poppins)]"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}
