import Image from 'next/image'
import Gallery from '@/components/Gallery'
import { photos } from '@/data/photos'

export default function About() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-start w-full max-w-[1400px] px-5 gap-8 py-8 max-[1050px]:flex-col max-[1050px]:items-center">
      <div className="flex flex-col items-center gap-4 min-w-[160px]">
        <Image
          src="/timothyou2.png"
          alt="Timothy Ou"
          width={160}
          height={160}
          className="rounded-xl border-4 border-[#0A081D] object-cover"
        />
        <a
          href="/timothy_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1E1B3A] text-[#D5B8E2] font-bold text-xl px-6 py-3 rounded-xl no-underline hover:bg-[#2a2650] transition-colors font-[family-name:var(--font-titan-one)]"
        >
          Resume 📄
        </a>
        <div className="flex gap-3 mt-2">
          <a href="https://www.linkedin.com/in/timothyou/" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedin.png" alt="LinkedIn" width={40} height={40} />
          </a>
          <a href="https://www.instagram.com/timothyou_/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.png" alt="Instagram" width={40} height={40} />
          </a>
          <a href="https://github.com/timothyou01" target="_blank" rel="noopener noreferrer">
            <Image src="/github.png" alt="GitHub" width={40} height={40} />
          </a>
        </div>
      </div>
      <div className="flex-1 min-w-[300px] max-[1050px]:w-full max-[1050px]:min-w-0">
        <Gallery variant="photos" items={photos} />
      </div>
    </div>
  )
}
