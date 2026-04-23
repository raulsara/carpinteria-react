'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

const stroke = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 2,
  strokeLinecap: 'round', strokeLinejoin: 'round',
}

const IconParquet = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <rect x="4" y="8"  width="40" height="8" rx="1" />
    <rect x="4" y="20" width="40" height="8" rx="1" />
    <rect x="4" y="32" width="40" height="8" rx="1" />
    <line x1="18" y1="9"  x2="18" y2="15" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="30" y1="9"  x2="30" y2="15" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="12" y1="21" x2="12" y2="27" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="24" y1="21" x2="24" y2="27" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="36" y1="21" x2="36" y2="27" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="20" y1="33" x2="20" y2="39" strokeWidth="1.3" strokeOpacity=".5" />
    <line x1="32" y1="33" x2="32" y2="39" strokeWidth="1.3" strokeOpacity=".5" />
  </svg>
)

const IconPuertas = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <rect x="5" y="6" width="17" height="34" rx="1" />
    <circle cx="18" cy="24" r="1.3" fill="currentColor" stroke="none" />
    <rect x="8" y="10" width="11" height="9" strokeOpacity=".55" strokeWidth="1.3" />
    <rect x="26" y="10" width="17" height="20" rx="1" />
    <line x1="34.5" y1="10" x2="34.5" y2="30" />
    <line x1="26" y1="20" x2="43" y2="20" />
  </svg>
)

const IconCocinas = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <path d="M10 6 L38 6 L42 14 L6 14 Z" />
    <rect x="7" y="20" width="34" height="22" rx="1" />
    <circle cx="16" cy="28" r="2.5" strokeWidth="1.5" />
    <circle cx="32" cy="28" r="2.5" strokeWidth="1.5" />
    <rect x="12" y="34" width="24" height="6" rx="0.5" />
  </svg>
)

const IconTerraza = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <rect x="4" y="8" width="40" height="4" rx="0.5" />
    <line x1="11" y1="12" x2="11" y2="20" />
    <line x1="19" y1="12" x2="19" y2="20" />
    <line x1="27" y1="12" x2="27" y2="20" />
    <line x1="35" y1="12" x2="35" y2="20" />
    <line x1="7" y1="18" x2="7" y2="42" strokeWidth="2.5" />
    <line x1="41" y1="18" x2="41" y2="42" strokeWidth="2.5" />
    <line x1="4" y1="42" x2="44" y2="42" strokeWidth="1.5" />
  </svg>
)

const IconMuebles = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <path d="M8 26 Q8 10 24 10 Q40 10 40 26" />
    <rect x="4" y="24" width="8" height="14" rx="2" />
    <rect x="36" y="24" width="8" height="14" rx="2" />
    <rect x="10" y="28" width="28" height="12" rx="1" />
    <line x1="12" y1="40" x2="12" y2="44" />
    <line x1="36" y1="40" x2="36" y2="44" />
  </svg>
)

const IconEstructuras = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <path d="M6 42 L6 34 L14 34 L14 26 L22 26 L22 18 L30 18 L30 10 L42 10" />
    <line x1="42" y1="10" x2="42" y2="42" strokeOpacity=".45" strokeWidth="1.3" />
    <line x1="4" y1="42" x2="44" y2="42" strokeWidth="1.5" />
  </svg>
)

const IconRestauracion = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <path d="M6 30 L6 38 L24 38 L24 30" />
    <line x1="11" y1="30" x2="11" y2="38" strokeOpacity=".5" strokeWidth="1.3" />
    <line x1="15" y1="30" x2="15" y2="38" strokeOpacity=".5" strokeWidth="1.3" />
    <line x1="19" y1="30" x2="19" y2="38" strokeOpacity=".5" strokeWidth="1.3" />
    <rect x="6" y="24" width="18" height="6" rx="0.5" />
    <path d="M10 24 L14 10 L18 10 L20 24" />
    <path d="M30 38 Q34 32 34 22" strokeOpacity=".55" strokeWidth="1.5" />
    <path d="M38 38 Q42 32 42 22" strokeOpacity=".55" strokeWidth="1.5" />
  </svg>
)

const IconReformas = () => (
  <svg viewBox="0 0 48 48" {...stroke}>
    <path d="M8 42 L8 22 L24 8 L40 22 L40 42 Z" />
    <line x1="4" y1="42" x2="44" y2="42" strokeWidth="1.5" />
    <line x1="20" y1="36" x2="28" y2="28" strokeWidth="2.2" />
    <path d="M26 24 L34 32 L31 35 L23 27 Z" strokeWidth="1.6" />
  </svg>
)

function ServiceCard({ s, viewCatalogLabel }) {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const body = (
    <>
      {s.badge && <span className="service-badge">✦ {s.badge}</span>}
      <div className="service-icon"><s.Icon /></div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      {s.href && <span className="service-link">{viewCatalogLabel} →</span>}
    </>
  )

  const cls = `reveal service-card${s.featured ? ' service-card-featured' : ''}${s.href ? ' service-card-link' : ''}`

  return s.href ? (
    <Link ref={ref} href={s.href} className={cls}>{body}</Link>
  ) : (
    <div ref={ref} className={cls}>{body}</div>
  )
}

export default function Services() {
  const { t } = useLang()
  const SERVICES = [
    { Icon: IconReformas,     title: t('services.reformas'),     desc: t('services.reformasDesc'),     featured: true, badge: t('services.reformasBadge') },
    { Icon: IconParquet,      title: t('services.parquet'),      desc: t('services.parquetDesc'),      href: '/parquet' },
    { Icon: IconPuertas,      title: t('services.puertas'),      desc: t('services.puertasDesc'),      href: '/puertas' },
    { Icon: IconCocinas,      title: t('services.cocinas'),      desc: t('services.cocinasDesc') },
    { Icon: IconTerraza,      title: t('services.terrazas'),     desc: t('services.terrazasDesc'),    href: '/terrazas' },
    { Icon: IconMuebles,      title: t('services.muebles'),      desc: t('services.mueblesDesc') },
    { Icon: IconEstructuras,  title: t('services.estructuras'),  desc: t('services.estructurasDesc') },
    { Icon: IconRestauracion, title: t('services.restauracion'), desc: t('services.restauracionDesc') },
  ]
  return (
    <section id="servicios">
      <Reveal className="services-header">
        <span className="section-tag">{t('services.tag')}</span>
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-sub">{t('services.subtitle')}</p>
      </Reveal>
      <div className="services-grid">
        {SERVICES.map(s => <ServiceCard key={s.title} s={s} viewCatalogLabel={t('services.viewCatalog')} />)}
      </div>
    </section>
  )
}
