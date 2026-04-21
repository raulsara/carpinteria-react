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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.12a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.25 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12s-.64.81-.79.97c-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07c0 1.22.89 2.41 1.02 2.57.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.52 11.95c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12s-.64.81-.79.97c-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07c0 1.22.89 2.41 1.02 2.57.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>
            </svg>
            <span>Chat WhatsApp</span>
          </>
        )}
      </button>
    </>
  )
}
