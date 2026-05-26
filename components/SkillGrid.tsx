type SkillGridProps = {
  title: string
  skills: string[]
}

export default function SkillGrid({ title, skills }: SkillGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h2 className="text-[#BC95D1] text-4xl max-[768px]:text-3xl max-[480px]:text-2xl font-bold text-center mb-8 font-[family-name:var(--font-titan-one)]">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4 max-[480px]:gap-3">
        {skills.map(skill => (
          <div
            key={skill}
            className="bg-[#1E1B3A] text-[#e0cbff] font-bold text-base max-[480px]:text-xs leading-tight rounded-2xl w-36 h-36 max-[480px]:w-24 max-[480px]:h-24 flex items-center justify-center text-center px-3 max-[480px]:px-2 shadow-[0_4px_8px_rgba(0,0,0,0.3)] font-[family-name:var(--font-poppins)] border-2 border-[#7D73EC] hover:border-[#BC95D1] hover:bg-[#282450] hover:scale-105 hover:shadow-[0_0_16px_rgba(125,115,236,0.5)] transition-all duration-200 cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}
