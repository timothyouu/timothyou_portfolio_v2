import TerminalPortfolio from '@/components/v2/TerminalPortfolio'

// Terminal.tsx reads window.innerWidth/Height in a useState initializer,
// which crashes SSR prerendering — keep force-dynamic until that is fixed.
export const dynamic = 'force-dynamic'

export default function Page() {
  return <TerminalPortfolio />
}
