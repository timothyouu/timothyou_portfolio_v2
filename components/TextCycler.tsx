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
      className="text-[#e0cbff] text-5xl font-semibold h-[100px] flex items-center overflow-hidden transition-opacity duration-300 font-[family-name:var(--font-poppins)] max-[1050px]:text-3xl max-[1050px]:h-[70px]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {items[index]}
    </p>
  )
}
