import { Titan_One, Poppins } from 'next/font/google'
import '../globals.css'
import Nav from '@/components/v1/Nav'
import Footer from '@/components/v1/Footer'
import BackToV2 from '@/components/v1/BackToV2'

const titanOne = Titan_One({ weight: '400', subsets: ['latin'], variable: '--font-titan-one' })
const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-poppins' })

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${titanOne.variable} ${poppins.variable} flex min-h-screen flex-col bg-[#16142A]`}>
      <Nav />
      <main className="flex w-full flex-1 items-center justify-center pt-[136px] pb-8 max-[1050px]:pt-[70px]">
        {children}
      </main>
      <Footer />
      <BackToV2 />
    </div>
  )
}
