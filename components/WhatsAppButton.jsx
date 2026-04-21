'use client'
import { useState, useEffect } from 'react'

const PHONE = '34607826072'

export default function WhatsAppButton() {
  const [open, setOpen]     = useState(false)
  const [teased, setTeased] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTeased(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const chatUrl = `https://wa.me/${PHONE}`

  return (
    <>
      {open && (
        <div className="wa-popup" role="dialog" aria-label="Chat de WhatsApp">
          <div className="wa-popup-head">
            <div className="wa-popup-avatar">
              <img src="/whatsapp.png" alt="WhatsApp" width="42" height="42" />
            </div>
            <div>
              <p className="wa-popup-name">Mader<span style={{ color: '#c8874b' }}>Arte</span></p>
              <p className="wa-popup-status">Normalmente responde en pocos minutos</p>
            </div>
            <button className="wa-popup-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              <p className="wa-bubble-name">MaderArte</p>
              <p>¡Hola! 👋</p>
              <p>¿En qué podemos ayudarte?</p>
              <span className="wa-bubble-time">Ahora</span>
            </div>
          </div>
          <a href={chatUrl} target="_blank" rel="noopener noreferrer" className="wa-popup-cta" onClick={() => setOpen(false)}>
            Abrir chat
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      )}

      <button className={`wa-float ${teased && !open ? 'wa-float-tease' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Abrir chat de WhatsApp">
        {open ? (
          <>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>✕</span>
            <span>Cerrar</span>
          </>
        ) : (
          <>
            <img src="/whatsapp.png" alt="WhatsApp" width="28" height="28" />
            <span>Chat WhatsApp</span>
          </>
        )}
      </button>
    </>
  )
}
