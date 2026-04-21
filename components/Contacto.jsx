'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

export default function Contacto() {
  const { t } = useLang()
  const items = [
    { icon: '📍', title: t('contacto.taller'),   text: 'C/ Genís Sala, 30 · 08130 Santa Perpètua de Mogoda · Barcelona' },
    { icon: '📞', title: t('contacto.telefono'), text: '+34 607 826 072', href: 'tel:+34607826072' },
    { wa: true, title: t('contacto.whatsapp'), text: '+34 607 826 072', href: 'https://wa.me/34607826072' },
    { icon: '✉️', title: t('contacto.email'),    text: 'info@maderarte.es', href: 'mailto:info@maderarte.es' },
    { icon: '🕐', title: t('contacto.horario'),  text: t('contacto.horarioValor') },
  ]

  return (
    <section id="contacto">
      <Reveal className="contact-header">
        <span className="section-tag">{t('contacto.tag')}</span>
        <h2 className="section-title">{t('contacto.title')}</h2>
        <p className="section-sub">{t('contacto.subtitle')}</p>
      </Reveal>

      <div className="contact-cards">
        {items.map(item => {
          const body = (
            <>
              <div className={`contact-card-icon${item.wa ? ' contact-card-icon-wa' : ''}`}>
                {item.wa ? (
                  <img src="/whatsapp.png" alt="WhatsApp" width="56" height="56" />
                ) : item.icon}
              </div>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </>
          )
          return item.href ? (
            <a key={item.title} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-card contact-card-link">
              {body}
            </a>
          ) : (
            <div key={item.title} className="contact-card">{body}</div>
          )
        })}
      </div>
    </section>
  )
}
