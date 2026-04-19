'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="navbar" style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,.25)' : 'none' }}>
      <a href="#hero" className="nav-logo">Mader<span>Arte</span></a>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
        <li><a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a></li>
        <li><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
        <li><a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a></li>
        <li><a href="#testimonios" onClick={() => setMenuOpen(false)}>Clientes</a></li>
        <li><a href="#contacto" className="nav-cta" onClick={() => setMenuOpen(false)}>Presupuesto</a></li>
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
        <span /><span /><span />
      </button>
    </nav>
  )
}
