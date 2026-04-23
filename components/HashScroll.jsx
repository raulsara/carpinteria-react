'use client'
import { useEffect } from 'react'

export default function HashScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.location.hash) return

    const id = window.location.hash.slice(1)
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const timeouts = [80, 450, 1000, 1900].map(ms => setTimeout(scroll, ms))

    const onLoad = () => setTimeout(scroll, 120)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      timeouts.forEach(clearTimeout)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return null
}
