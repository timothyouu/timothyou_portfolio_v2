import Image from 'next/image'
import TextCycler from '@/components/TextCycler'

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-[1400px] px-5 py-6 gap-[clamp(2rem,6vw,7rem)] max-[1050px]:flex-col max-[1050px]:gap-8">
      <div className="flex flex-col flex-1 min-w-[260px] max-w-[500px] gap-[clamp(0.75rem,1.5vh,1.5rem)] max-[1050px]:w-full max-[1050px]:max-w-[600px] max-[1050px]:min-w-0">
        <h1
          className="text-[#7D73EC] font-normal leading-tight m-0 [-webkit-text-stroke:2px_rgba(0,0,0,0.5)] font-[family-name:var(--font-titan-one)] whitespace-nowrap max-[500px]:whitespace-normal"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)' }}
        >
          Hello, I&apos;m Timothy!!
        </h1>
        <h2
          className="text-[#BC95D1] font-normal leading-tight m-0 font-[family-name:var(--font-titan-one)]"
          style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3.25rem)' }}
        >
          <span className="whitespace-nowrap">Computer Science</span><br />Student @CSUF
        </h2>
        <TextCycler />
        <div className="flex flex-col gap-[clamp(0.4rem,1vh,0.75rem)] w-full">
          <p
            className="text-[#E0E1DD] font-semibold leading-snug m-0 font-[family-name:var(--font-titan-one)]"
            style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.75rem)' }}
          >
            🤝 I&apos;m an Open Source and Marketing Board member @acmcsuf
          </p>
          <p
            className="text-[#E0E1DD] font-semibold leading-snug m-0 font-[family-name:var(--font-titan-one)]"
            style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.75rem)' }}
          >
            🖥️ I play Valorant and Roblox in my free time
          </p>
          <p
            className="text-[#E0E1DD] font-semibold leading-snug m-0 font-[family-name:var(--font-titan-one)]"
            style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.75rem)' }}
          >
            📸 I love taking pictures
          </p>
        </div>
      </div>
      <Image
        src="/timothyou1.png"
        alt="Timothy Ou"
        width={500}
        height={500}
        className="rounded-full border-[10px] border-[#0A081D] object-cover"
        style={{ width: 'clamp(180px, 28vw, 460px)', height: 'clamp(180px, 28vw, 460px)' }}
      />
    </div>
  )
}
