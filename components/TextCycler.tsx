'use client'

import { useState, useEffect } from 'react'

const items = [
  'Timmy!', '2nd Year', 'Aspiring SWE/PM', 'Figma Campus Leader',
  'Open Source Board', 'Marketing Team Lead', 'Eagle Scout', 'Leetcoder',
  'Valorant Player', 'Arsenal Sweat', 'Peripheral Enthusiast', 'Photographer',
  'Smiski Collector 🤓', 'Matcha Enjoyer ☕', 'Silly 🪿', 'Shrimp 🦐', 'Famirry 🫶',
]

export default function TextCycler() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length)
        setVisible(true)
      }, 200)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <p
      className="text-[#e0cbff] font-semibold flex items-center overflow-hidden transition-opacity duration-300 font-[family-name:var(--font-poppins)] m-0"
      style={{
        opacity: visible ? 1 : 0,
        fontSize: 'clamp(1.1rem, 2.8vw, 2.75rem)',
        height: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      {items[index]}
    </p>
  )
}
