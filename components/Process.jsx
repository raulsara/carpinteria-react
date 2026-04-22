'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

export default function Process() {
  const { t } = useLang()
  const WoodIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8"  y="10" width="9" height="28" rx="1.5" fill="#E3B07A" stroke="#5e3a17" strokeWidth="1.2" />
      <rect x="19" y="10" width="9" height="28" rx="1.5" fill="#C8874B" stroke="#5e3a17" strokeWidth="1.2" />
      <rect x="30" y="10" width="9" height="28" rx="1.5" fill="#7A4A20" stroke="#5e3a17" strokeWidth="1.2" />
      <path d="M12.5 14 V34" stroke="#5e3a17" strokeWidth=".5" opacity=".5" />
      <path d="M23.5 14 V34" stroke="#5e3a17" strokeWidth=".5" opacity=".5" />
      <path d="M34.5 14 V34" stroke="#5e3a17" strokeWidth=".5" opacity=".5" />
    </svg>
  )
  const STEPS = [
    { icon: '💬', title: t('process.s1Title'), desc: t('process.s1Desc') },
    { icon: '📐', title: t('process.s2Title'), desc: t('process.s2Desc') },
    { icon: WoodIcon, title: t('process.s3Title'), desc: t('process.s3Desc') },
    { icon: '⚙️', title: t('process.s4Title'), desc: t('process.s4Desc') },
    { icon: '🔧', title: t('process.s5Title'), desc: t('process.s5Desc') },
    { icon: '✅', title: t('process.s6Title'), desc: t('process.s6Desc') },
  ]
  return (
    <section id="proceso">
      <Reveal className="process-header">
        <span className="section-tag" style={{ background: 'var(--brown-light)' }}>{t('process.tag')}</span>
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-sub">{t('process.subtitle')}</p>
      </Reveal>
      <div className="steps">
        {STEPS.map(s => (
          <Reveal key={s.title} className="step">
            <div className="step-icon">{s.icon}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
