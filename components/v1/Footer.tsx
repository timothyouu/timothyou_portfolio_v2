export default function Footer() {
  return (
    <footer className="bg-[#0A081D] text-[#D5B8E2] py-5 text-center font-semibold text-lg max-[480px]:text-sm w-full shrink-0">
      <p className="my-1">
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=prev" className="text-[#D5B8E2] no-underline transition-all duration-300 text-xl hover:text-[#BC95D1] hover:opacity-80">←</a>
        <span className="inline-flex items-center gap-2 mx-2">Made with Timmy&apos;s ❤️</span>
        <a href="https://webring-1.vercel.app/?from=timothyouu&dir=next" className="text-[#D5B8E2] no-underline transition-all duration-300 text-xl hover:text-[#BC95D1] hover:opacity-80">→</a>
      </p>
      <p className="my-1">&copy; 2025 Timothy Ou</p>
    </footer>
  )
}
