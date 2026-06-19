/** Smooth-scroll to an element by ID with a configurable top offset (px). */
export function scrollToElement(id: string, offset = 24) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    })
  }
}

/** Capitalize the first letter of every word. */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}
