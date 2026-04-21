import Reveal from './Reveal'

const CONTACT_ITEMS = [
  { icon: '📍', title: 'Taller',   text: 'Paseo La Palma, 35' },
  { icon: '📞', title: 'Teléfono', text: '+34 607 826 072', href: 'tel:+34607826072' },
  {
    wa: true, title: 'WhatsApp', text: '+34 607 826 072',
    href: 'https://wa.me/34607826072',
  },
  { icon: '✉️', title: 'Email',    text: 'info@maderarte.es', href: 'mailto:info@maderarte.es' },
  { icon: '🕐', title: 'Horario',  text: 'Lun–Vie: 8:00–18:00' },
]

export default function Contacto() {
  return (
    <section id="contacto">
      <Reveal className="contact-header">
        <span className="section-tag">Contacto</span>
        <h2 className="section-title">Hablemos de tu proyecto</h2>
        <p className="section-sub">Pásate por el taller, llámanos o escríbenos. Te atenderemos con mucho gusto.</p>
      </Reveal>

      <div className="contact-cards">
        {CONTACT_ITEMS.map(item => {
          const body = (
            <>
              <div className={`contact-card-icon${item.wa ? ' contact-card-icon-wa' : ''}`}>
                {item.wa ? (
                  <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.52 11.95c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12s-.64.81-.79.97c-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07c0 1.22.89 2.41 1.02 2.57.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
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
