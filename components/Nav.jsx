'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import LangSwitch from './LangSwitch'

export default function Nav() {
  const { t } = useLang()
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
      <Link href="/" className="nav-logo" onClick={close} aria-label="MaderArte">
        <img src="/logo.png" alt="MaderArte" className="nav-logo-img" />
      </Link>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link href="/#nosotros"    onClick={close}>{t('nav.nosotros')}</Link></li>
        <li><Link href="/#servicios"   onClick={close}>{t('nav.servicios')}</Link></li>
        <li><Link href="/#portfolio"   onClick={close}>{t('nav.galeria')}</Link></li>
        <li><Link href="/blog"         onClick={close}>{t('nav.blog')}</Link></li>
        <li><Link href="/#proceso"     onClick={close}>{t('nav.proceso')}</Link></li>
        <li><Link href="/#testimonios" onClick={close}>{t('nav.clientes')}</Link></li>
        <li><Link href="/#contacto"    onClick={close}>{t('nav.contacto')}</Link></li>
        <li><Link href="/#presupuesto" className="nav-cta" onClick={close}>{t('nav.presupuesto')}</Link></li>
        <li className="nav-lang-li"><LangSwitch /></li>
      </ul>
      <div className="nav-mobile-right">
        <LangSwitch />
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={t('nav.menu')}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
