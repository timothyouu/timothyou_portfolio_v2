import Image from 'next/image'
import TextCycler from '@/components/TextCycler'

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-[1400px] px-5 gap-[120px] max-[1050px]:flex-col max-[1050px]:gap-[60px] py-8">
      <div className="flex flex-col flex-1 min-w-[280px] max-w-[500px] gap-5 box-border max-[1050px]:w-full max-[1050px]:max-w-[600px] max-[1050px]:min-w-0">
        <h1 className="text-[#7D73EC] text-7xl font-normal leading-tight m-0 whitespace-nowrap [-webkit-text-stroke:2px_rgba(0,0,0,0.5)] font-[family-name:var(--font-titan-one)] max-[1050px]:text-6xl max-[500px]:text-5xl max-[500px]:whitespace-normal">
          Hello, I&apos;m Timothy!!
        </h1>
        <h2 className="text-[#BC95D1] text-6xl font-normal leading-tight m-0 -mt-5 font-[family-name:var(--font-titan-one)] max-[1050px]:text-5xl max-[500px]:text-4xl">
          <span className="whitespace-nowrap">Computer Science</span><br />Student @CSUF
        </h2>
        <TextCycler />
        <div className="flex flex-col gap-3 w-full">
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl max-[500px]:text-2xl">🤝 I&apos;m an Open Source and Marketing Board member @acmcsuf</p>
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl max-[500px]:text-2xl">🖥️ I play Valorant and Roblox in my free time</p>
          <p className="text-[#E0E1DD] text-5xl font-semibold leading-tight m-0 font-[family-name:var(--font-titan-one)] max-[1050px]:text-4xl max-[500px]:text-2xl">📸 I love taking pictures</p>
        </div>
      </div>
      <Image
        src="/timothyou1.png"
        alt="Timothy Ou"
        width={532}
        height={532}
        className="flex-1 min-w-[250px] max-w-[532px] rounded-full border-[10px] border-[#0A081D] object-cover max-[1050px]:w-[80%] max-[1050px]:max-w-[400px] max-[1050px]:min-w-0"
      />
    </div>
  )
}
