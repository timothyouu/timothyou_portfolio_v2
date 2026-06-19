'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/data/photos'
import type { Project } from '@/data/projects'

type GalleryProps =
  | { variant: 'photos'; items: Photo[] }
  | { variant: 'projects'; items: Project[] }

function GalleryNavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const svgPath = direction === 'prev'
    ? 'M639-80 710-151 381-480 710-809 639-880 239-480Z'
    : 'm321-80-71-71 329-329-329-329 71-71 400 400-400 400Z'

  return (
    <button
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      className="bg-[#282450] w-[90px] max-[1050px]:w-[40px] max-[480px]:w-[32px] h-[90%] rounded-[32px] max-[480px]:rounded-[16px] flex justify-center items-center shrink-0 hover:bg-[#3f3b79] transition-colors cursor-pointer border-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[58px] h-[58px] max-[1050px]:w-[28px] max-[1050px]:h-[28px] max-[480px]:w-[20px] max-[480px]:h-[20px]" viewBox="0 -960 960 960" fill="#D5B8E2">
        <path d={svgPath} />
      </svg>
    </button>
  )
}

export default function Gallery(props: GalleryProps) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex(i => (i - 1 + props.items.length) % props.items.length)
  const next = () => setIndex(i => (i + 1) % props.items.length)
  const current = props.items[index]

  return (
    <>
      <div className="w-full flex-1 flex flex-row justify-between items-center gap-8 min-h-0">
        <GalleryNavButton direction="prev" onClick={prev} />

        <div className="flex-1 h-full rounded-[32px] overflow-hidden relative min-w-0">
          <Image
            src={current.path}
            alt={'location' in current ? current.location : current.project}
            fill
            className="object-cover"
          />
        </div>

        <GalleryNavButton direction="next" onClick={next} />
      </div>

      {props.variant === 'photos' && 'location' in current && (
        <div className="bg-[#282450] rounded-[32px] max-[480px]:rounded-[20px] px-8 py-4 max-[480px]:px-4 max-[480px]:py-3 w-full flex justify-center items-center shrink-0">
          <p className="text-[#D5B8E2] text-xl max-[480px]:text-base font-semibold m-0">Location: {current.location}</p>
        </div>
      )}

      {props.variant === 'projects' && 'project' in current && (
        <div className="bg-[#16142A] rounded-[32px] w-full shrink-0 px-5 py-3 box-border">
          <h2 className="text-[#BC95D1] text-2xl max-[480px]:text-lg font-[family-name:var(--font-titan-one)] m-0 leading-tight">{current.project}</h2>
          <p className="text-[#E0E1DD] font-semibold text-sm mt-1 mb-0">{current.date}</p>
          <h3 className="text-[#D5B8E2] font-[family-name:var(--font-titan-one)] font-normal mt-2 mb-0 text-lg max-[480px]:text-base">Technologies Used:</h3>
          <p className="text-[#E0E1DD] text-sm mb-0">{current.tech}</p>
          <h3 className="text-[#D5B8E2] font-[family-name:var(--font-titan-one)] font-normal mt-2 mb-0 text-lg max-[480px]:text-base">Description</h3>
          <p className="text-[#E0E1DD] text-sm mb-0">{current.description}</p>
        </div>
      )}
    </>
  )
}
