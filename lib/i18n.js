'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const Ctx = createContext({ lang: 'es', setLang: () => {}, t: (k) => k })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('es')
  const [ready, setReady]    = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    if (saved === 'es' || saved === 'ca') setLangState(saved)
    setReady(true)
  }, [])

  const setLang = (l) => {
    localStorage.setItem('lang', l)
    document.documentElement.lang = l
    setLangState(l)
  }

  const t = (key) => {
    const val = key.split('.').reduce((o, k) => (o == null ? o : o[k]), translations[lang])
    return val !== undefined ? val : key
  }

  return <Ctx.Provider value={{ lang, setLang, t, ready }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
