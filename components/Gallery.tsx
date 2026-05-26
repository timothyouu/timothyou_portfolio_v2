'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/data/photos'
import type { Project } from '@/data/projects'

type GalleryProps =
  | { variant: 'photos'; items: Photo[] }
  | { variant: 'projects'; items: Project[] }

export default function Gallery(props: GalleryProps) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex(i => (i - 1 + props.items.length) % props.items.length)
  const next = () => setIndex(i => (i + 1) % props.items.length)

  const current = props.items[index]

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <button onClick={prev} aria-label="Previous" className="text-[#D5B8E2] text-4xl px-4 py-8 bg-[#1E1B3A] rounded-xl hover:bg-[#2a2650] transition-colors shrink-0">‹</button>

      <div className="flex flex-col items-center gap-4 flex-1 min-w-0">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#0A081D]">
          <Image
            src={current.path}
            alt={'location' in current ? current.location : current.project}
            fill
            className="object-cover"
          />
        </div>

        {props.variant === 'photos' && 'location' in current && (
          <p className="text-[#D5B8E2] text-lg font-semibold bg-[#1E1B3A] px-6 py-2 rounded-full">
            Location: {current.location}
          </p>
        )}

        {props.variant === 'projects' && 'project' in current && (
          <div className="text-left w-full px-2">
            <h2 className="text-[#7D73EC] text-2xl font-bold font-[family-name:var(--font-titan-one)]">{current.project}</h2>
            <p className="text-[#D5B8E2] font-semibold text-sm mt-1">{current.date}</p>
            <h3 className="text-[#7D73EC] font-bold mt-2">Technologies Used:</h3>
            <p className="text-[#D5B8E2] text-sm">{current.tech}</p>
            <h3 className="text-[#7D73EC] font-bold mt-2">Description</h3>
            <p className="text-[#D5B8E2] text-sm">{current.description}</p>
          </div>
        )}
      </div>

      <button onClick={next} aria-label="Next" className="text-[#D5B8E2] text-4xl px-4 py-8 bg-[#1E1B3A] rounded-xl hover:bg-[#2a2650] transition-colors shrink-0">›</button>
    </div>
  )
}
