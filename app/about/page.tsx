import Image from 'next/image'
import Gallery from '@/components/Gallery'
import { photos } from '@/data/photos'

const lavenderFilter = 'invert(100%) sepia(100%) saturate(200%) hue-rotate(270deg) brightness(100%) contrast(100%)'

export default function About() {
  return (
    <div className="flex flex-row items-center justify-center gap-10 w-full max-w-[2000px] px-8 py-8 box-border max-[768px]:flex-col max-[768px]:items-center">

      {/* Left column card */}
      <div className="flex flex-col items-center justify-around gap-10 bg-[#0A091A] rounded-[40px] p-8 w-[500px] max-[1050px]:w-[300px] max-[768px]:w-full shrink h-[550px] max-[768px]:h-auto box-border">

        {/* Profile pic — rounded corners, no border */}
        <Image
          src="/timothyou2.png"
          alt="Timothy Ou"
          width={300}
          height={250}
          className="rounded-[40px] object-cover w-auto max-h-[45%] max-[768px]:max-h-[180px]"
        />

        {/* Contact panel */}
        <div className="bg-[#16142A] w-full rounded-[40px] p-5 pb-8 flex flex-col justify-around items-center gap-3 h-[50%] max-[768px]:h-auto box-border">

          {/* Resume */}
          <a
            href="/timothy_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#282450] w-[90%] py-5 max-[1050px]:py-3 rounded-[32px] flex justify-center items-center text-[#D5B8E2] no-underline font-[family-name:var(--font-titan-one)] text-[2.5rem] max-[1050px]:text-[1.75rem] hover:bg-[#3f3b79] transition-colors"
          >
            Resume 📄
          </a>

          {/* Social icons */}
          <div className="flex flex-row justify-around w-[90%] items-center pb-4">
            <a
              href="https://www.linkedin.com/in/timothy-ou/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#282450] w-[30%] h-[110px] max-[1050px]:h-[40px] rounded-[32px] flex justify-center items-center hover:bg-[#3f3b79] transition-colors"
            >
              <Image src="/linkedin.png" alt="LinkedIn" width={60} height={60}
                className="h-[60px] max-[1050px]:h-[25px] w-auto"
                style={{ filter: lavenderFilter }}
              />
            </a>
            <a
              href="https://www.instagram.com/timothyouu/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#282450] w-[30%] h-[110px] max-[1050px]:h-[40px] rounded-[32px] flex justify-center items-center hover:bg-[#3f3b79] transition-colors"
            >
              <Image src="/instagram.png" alt="Instagram" width={60} height={60}
                className="h-[60px] max-[1050px]:h-[25px] w-auto"
                style={{ filter: lavenderFilter }}
              />
            </a>
            <a
              href="https://github.com/timothyouu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#282450] w-[30%] h-[110px] max-[1050px]:h-[40px] rounded-[32px] flex justify-center items-center hover:bg-[#3f3b79] transition-colors"
            >
              <Image src="/github.png" alt="GitHub" width={60} height={60}
                className="h-[60px] max-[1050px]:h-[25px] w-auto"
                style={{ filter: lavenderFilter }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Gallery card */}
      <div className="bg-[#0A091A] rounded-[40px] p-10 max-[1050px]:p-5 grow shrink min-w-[500px] max-[1050px]:min-w-[250px] max-[768px]:w-full h-[650px] max-[768px]:h-[450px] flex flex-col gap-10 max-[1050px]:gap-4 justify-center items-center box-border">
        <Gallery variant="photos" items={photos} />
      </div>

    </div>
  )
}
