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
