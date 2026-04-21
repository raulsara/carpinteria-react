'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="hero">
      <Reveal className="hero-content">
        <div className="hero-badge">✦ {t('hero.tag')}</div>
        <h1>{t('hero.titlePre')}<br /><em>{t('hero.titleHi')}</em></h1>
        <p>{t('hero.subtitle')}</p>
        <div className="hero-btns">
          <a href="#presupuesto" className="btn-primary">{t('hero.cta1')}</a>
          <a href="#portfolio" className="btn-outline">{t('hero.cta2')}</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>35+</strong><span>{t('hero.stat1')}</span></div>
          <div className="stat"><strong>640</strong><span>{t('hero.stat2')}</span></div>
          <div className="stat"><strong>100%</strong><span>{t('hero.stat3')}</span></div>
        </div>
      </Reveal>
    </section>
  )
}
