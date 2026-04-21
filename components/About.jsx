'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section id="nosotros" style={{ background: 'var(--cream)', padding: '96px 6%' }}>
      <div className="about-wrap">
        <Reveal className="about-visual">
          <div className="about-img-main">
            <img src="/taller.jpg" alt="Taller de carpintería MaderArte" />
          </div>
          <div className="about-badge-float">
            <strong>{t('about.badge1')}</strong>
            <span>{t('about.badge2')}</span>
          </div>
        </Reveal>
        <Reveal className="about-text">
          <span className="section-tag">{t('about.tag')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <ul className="checklist">
            <li>{t('about.check1')}</li>
            <li>{t('about.check2')}</li>
            <li>{t('about.check3')}</li>
            <li>{t('about.check4')}</li>
            <li>{t('about.check5')}</li>
          </ul>
          <a href="#presupuesto" className="btn-primary">{t('about.cta')}</a>
        </Reveal>
      </div>
    </section>
  )
}
