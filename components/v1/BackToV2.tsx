'use client'

import Link from 'next/link'

export default function BackToV2() {
  return (
    <Link
      href="/"
      onClick={() => {
        // Record the v1→v2 intent so the v2 root doesn't read the persisted
        // 'v1' preference and immediately redirect back to /v1.
        try { localStorage.setItem('portfolio-version', 'v2') } catch (e) {
          console.warn('[portfolio] failed to persist version preference:', e)
        }
      }}
      className="fixed bottom-5 left-5 z-[100] flex items-center gap-2 rounded-full border border-[#3f3b79] bg-[#0A081D] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#D5B8E2] no-underline hover:bg-[#16142A]"
      aria-label="Switch to v2 portfolio"
    >
      <span className="font-semibold text-[#7D73EC]">v1</span>
      <span className="relative h-4 w-7 rounded-full bg-[#7D73EC]">
        <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-[#0A081D]" />
      </span>
      <span className="font-semibold text-[#7D73EC]">v2</span>
    </Link>
  )
}
