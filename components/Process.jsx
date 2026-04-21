'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

export default function Process() {
  const { t } = useLang()
  const STEPS = [
    { icon: '💬', title: t('process.s1Title'), desc: t('process.s1Desc') },
    { icon: '📐', title: t('process.s2Title'), desc: t('process.s2Desc') },
    { icon: '🪵', title: t('process.s3Title'), desc: t('process.s3Desc') },
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
