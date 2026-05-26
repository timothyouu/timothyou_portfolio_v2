import type { Metadata } from 'next'
import { Titan_One, Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const titanOne = Titan_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-titan-one',
})

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Timothy Ou',
  description: 'Portfolio of Timothy Ou — CS Student @ CSUF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${titanOne.variable} ${poppins.variable} flex flex-col min-h-screen bg-[#16142A]`}>
        <Nav />
        <main className="flex-1 flex justify-center items-center w-full pt-[136px] max-[1050px]:pt-[70px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
