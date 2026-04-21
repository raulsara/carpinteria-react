'use client'
import { useState, useEffect } from 'react'
import { useLang } from '../lib/i18n'

const PHONE = '34607826072'

export default function WhatsAppButton() {
  const { t } = useLang()
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
        <div className="wa-popup" role="dialog" aria-label="WhatsApp">
          <div className="wa-popup-head">
            <div className="wa-popup-avatar">
              <img src="/whatsapp.png" alt="WhatsApp" width="42" height="42" />
            </div>
            <div>
              <p className="wa-popup-name">Mader<span style={{ color: '#c8874b' }}>Arte</span></p>
              <p className="wa-popup-status">{t('wa.popupStatus')}</p>
            </div>
            <button className="wa-popup-close" onClick={() => setOpen(false)} aria-label="✕">✕</button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              <p className="wa-bubble-name">MaderArte</p>
              <p>{t('wa.popupHi')}</p>
              <p>{t('wa.popupAsk')}</p>
              <span className="wa-bubble-time">{t('wa.popupNow')}</span>
            </div>
          </div>
          <a href={chatUrl} target="_blank" rel="noopener noreferrer" className="wa-popup-cta" onClick={() => setOpen(false)}>
            {t('wa.popupOpen')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      )}

      <button className={`wa-float ${teased && !open ? 'wa-float-tease' : ''}`} onClick={() => setOpen(o => !o)} aria-label={t('wa.float')}>
        {open ? (
          <>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>✕</span>
            <span>{t('wa.close')}</span>
          </>
        ) : (
          <>
            <img src="/whatsapp.png" alt="WhatsApp" width="28" height="28" />
            <span>{t('wa.float')}</span>
          </>
        )}
      </button>
    </>
  )
}
