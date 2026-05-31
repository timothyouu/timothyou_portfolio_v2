'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/v1', label: 'Home' },
  { href: '/v1/about', label: 'About' },
  { href: '/v1/projects', label: 'Projects' },
  { href: '/v1/skills', label: 'Skills' },
]

export default function Nav() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-[#0A081D] shadow-md">
      {sidebarOpen && (
        <ul className="fixed top-0 right-0 h-screen w-[250px] z-[999] bg-[#16142A] shadow-[-10px_0_10px_rgba(0,0,0,0.1)] flex flex-col items-start justify-start list-none p-0 m-0 opacity-95 backdrop-blur-sm">
          <li className="w-full">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center w-full px-5 h-[70px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
              </svg>
            </button>
          </li>
          {links.map(({ href, label }) => (
            <li key={href} className="w-full">
              <Link
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full h-[70px] px-5 text-2xl font-semibold no-underline transition-colors duration-300 font-[family-name:var(--font-titan-one)] ${pathname === href ? 'text-[#7D73EC]' : 'text-[#D5B8E2] hover:bg-[#16142A]'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex items-center justify-end w-full list-none p-0 m-0 h-[136px] max-[1050px]:h-[70px]">
        <li className="mr-auto">
          <Link href="/v1" className="flex items-center h-full px-8 max-[480px]:px-5 text-4xl max-[1050px]:text-3xl max-[480px]:text-2xl font-semibold no-underline text-[#7D73EC] whitespace-nowrap font-[family-name:var(--font-titan-one)] transition-colors duration-300">
            Timothy Ou
          </Link>
        </li>
        {links.map(({ href, label }) => (
          <li key={href} className="hidden min-[1050px]:flex h-[136px] items-center">
            <Link
              href={href}
              className={`flex items-center h-full px-8 text-4xl font-semibold no-underline transition-colors duration-300 font-[family-name:var(--font-titan-one)] ${pathname === href ? 'text-[#7D73EC]' : 'text-[#D5B8E2] hover:bg-[#16142A]'}`}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="flex min-[1050px]:hidden h-[70px] items-center px-5">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
