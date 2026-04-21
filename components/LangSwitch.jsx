'use client'
import { useLang } from '../lib/i18n'

export default function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Idioma">
      <button
        className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
        onClick={() => setLang('es')}
        aria-label="Español"
      >ES</button>
      <span className="lang-sep">/</span>
      <button
        className={`lang-btn ${lang === 'ca' ? 'active' : ''}`}
        onClick={() => setLang('ca')}
        aria-label="Català"
      >CA</button>
    </div>
  )
}
