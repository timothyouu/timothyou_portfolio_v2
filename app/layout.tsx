import type { Metadata } from 'next'
import { JetBrains_Mono, IBM_Plex_Mono, Fira_Code, Space_Mono } from 'next/font/google'
import './v2.css'
import { Analytics } from '@vercel/analytics/next'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const ibmPlex = IBM_Plex_Mono({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-ibm-plex-mono' })
const fira = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })
const space = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'Timothy Ou — Portfolio',
  description: 'Full-stack engineer & AI builder. Junior CS @ Cal State Fullerton.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} ${ibmPlex.variable} ${fira.variable} ${space.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
