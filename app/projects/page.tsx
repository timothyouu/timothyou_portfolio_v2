import Gallery from '@/components/Gallery'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] px-5 py-8">
      <Gallery variant="projects" items={projects} />
    </div>
  )
}
