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
    <>
      <div className="w-full flex-1 flex flex-row justify-between items-center gap-8 min-h-0">
        <button
          onClick={prev}
          aria-label="Previous"
          className="bg-[#282450] w-[90px] max-[1050px]:w-[40px] h-[90%] rounded-[32px] flex justify-center items-center shrink-0 hover:bg-[#3f3b79] transition-colors cursor-pointer border-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="58" viewBox="0 -960 960 960" width="58" fill="#D5B8E2">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>

        <div className="flex-1 h-full rounded-[32px] overflow-hidden relative min-w-0">
          <Image
            src={current.path}
            alt={'location' in current ? current.location : current.project}
            fill
            className="object-cover"
          />
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="bg-[#282450] w-[90px] max-[1050px]:w-[40px] h-[90%] rounded-[32px] flex justify-center items-center shrink-0 hover:bg-[#3f3b79] transition-colors cursor-pointer border-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="58" viewBox="0 -960 960 960" width="58" fill="#D5B8E2">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z" />
          </svg>
        </button>
      </div>

      {props.variant === 'photos' && 'location' in current && (
        <div className="bg-[#282450] rounded-[32px] px-8 py-4 w-full flex justify-center items-center shrink-0">
          <p className="text-[#D5B8E2] text-xl font-semibold m-0">Location: {current.location}</p>
        </div>
      )}

      {props.variant === 'projects' && 'project' in current && (
        <div className="text-left w-full shrink-0 px-1">
          <h2 className="text-[#7D73EC] text-2xl font-bold font-[family-name:var(--font-titan-one)] m-0">{current.project}</h2>
          <p className="text-[#D5B8E2] font-semibold text-sm mt-1 mb-0">{current.date}</p>
          <h3 className="text-[#7D73EC] font-bold mt-2 mb-0 text-base">Technologies Used:</h3>
          <p className="text-[#D5B8E2] text-sm mb-0">{current.tech}</p>
          <h3 className="text-[#7D73EC] font-bold mt-2 mb-0 text-base">Description</h3>
          <p className="text-[#D5B8E2] text-sm mb-0">{current.description}</p>
        </div>
      )}
    </>
  )
}
