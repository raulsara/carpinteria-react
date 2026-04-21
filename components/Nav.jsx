'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav id="navbar" style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,.25)' : 'none' }}>
      <Link href="/" className="nav-logo" onClick={close}>Mader<span>Arte</span></Link>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link href="/#nosotros"    onClick={close}>Quiénes somos</Link></li>
        <li><Link href="/#servicios"   onClick={close}>Servicios</Link></li>
        <li><Link href="/#portfolio"   onClick={close}>Galería</Link></li>
        <li><Link href="/#proceso"     onClick={close}>Proceso</Link></li>
        <li><Link href="/#testimonios" onClick={close}>Clientes</Link></li>
        <li><Link href="/#contacto"    onClick={close}>Contacto</Link></li>
        <li><Link href="/#presupuesto" className="nav-cta" onClick={close}>Presupuesto</Link></li>
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
        <span /><span /><span />
      </button>
    </nav>
  )
}
