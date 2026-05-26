import Gallery from '@/components/Gallery'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1800px] px-8 py-8">
      <div className="bg-[#0A091A] rounded-[40px] p-10 max-[1050px]:p-5 max-[480px]:p-4 w-full h-[650px] max-[768px]:h-auto max-[768px]:min-h-[500px] max-[480px]:min-h-[420px] flex flex-col gap-10 max-[1050px]:gap-4 max-[480px]:gap-3 justify-center items-center box-border">
        <Gallery variant="projects" items={projects} />
      </div>
    </div>
  )
}
