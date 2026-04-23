'use client'
import Reveal from '../../components/Reveal'
import { useLang } from '../../lib/i18n'

const CAT_BG = [
  'linear-gradient(135deg, #e8d9c4 0%, #c8a97a 100%)',
  'linear-gradient(135deg, #a7c3cf 0%, #7d5a3a 100%)',
  'linear-gradient(135deg, #d6b38a 0%, #8b5e34 100%)',
  'linear-gradient(135deg, #c79b6c 0%, #5e3a17 100%)',
]

const CAT_IMG = [
  '/terrazas/flotante.jpg',
  '/terrazas/pvc.jpg',
  '/terrazas/wpc.jpg',
  '/terrazas/maciza.jpg',
]

const SAMPLE_BG = [
  'repeating-linear-gradient(90deg, #d8b98a 0 14px, #c9a574 14px 18px, #d8b98a 18px 32px)',
  'repeating-linear-gradient(90deg, #eadfc8 0 14px, #d9c9ad 14px 18px, #eadfc8 18px 32px)',
  'repeating-linear-gradient(90deg, #5a5a5c 0 14px, #4a4a4c 14px 18px, #5a5a5c 18px 32px)',
  'repeating-linear-gradient(90deg, #b37a3a 0 14px, #8a5a22 14px 18px, #b37a3a 18px 32px)',
  'repeating-linear-gradient(90deg, #d9ba8c 0 14px, #b38b5a 14px 18px, #d9ba8c 18px 32px)',
]

export default function TerrazasPage() {
  const { t } = useLang()
  const cats = t('terrazas.cats')
  const samples = t('terrazas.samples')
  const catsArr = Array.isArray(cats) ? cats : []
  const samplesArr = Array.isArray(samples) ? samples : []

  return (
    <main className="terrazas-page">
      <section className="terrazas-hero">
        <div className="terrazas-hero-media" />
        <div className="terrazas-hero-overlay" />
        <div className="terrazas-hero-content">
          <Reveal className="terrazas-hero-inner">
            <h1>{t('terrazas.heroTitle')}</h1>
            <a href="/#presupuesto" className="terrazas-hero-cta">
              {t('terrazas.heroCta')}
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="terrazas-intro">
        <Reveal className="terrazas-intro-inner">
          <span className="terrazas-dot" aria-hidden="true" />
          <span className="terrazas-intro-tag">{t('terrazas.tag')}</span>
          <h2 className="terrazas-intro-title">{t('terrazas.introTitle')}</h2>
          <p className="terrazas-intro-desc">{t('terrazas.introDesc')}</p>
        </Reveal>
      </section>

      <section className="terrazas-cats">
        <div className="terrazas-cats-grid">
          {catsArr.map((c, i) => (
            <Reveal key={c.name} className="terrazas-cat">
              <div className="terrazas-cat-head">
                <span className="terrazas-cat-label">{c.label}</span>
                <h3 className="terrazas-cat-name">{c.name} <span aria-hidden="true">↘</span></h3>
              </div>
              <div
                className="terrazas-cat-media"
                style={CAT_IMG[i]
                  ? { backgroundImage: `url(${CAT_IMG[i]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: CAT_BG[i % CAT_BG.length] }}
              />
              <span className="terrazas-cat-tag">{c.tag} <span aria-hidden="true">↗</span></span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="terrazas-samples">
        <Reveal className="terrazas-samples-desc">
          <p>{t('terrazas.samplesDesc')}</p>
        </Reveal>
        <div className="terrazas-samples-row">
          {samplesArr.map((s, i) => (
            <Reveal key={s.name} className="terrazas-sample">
              <div className="terrazas-sample-pill" style={{ background: SAMPLE_BG[i % SAMPLE_BG.length] }} />
              <span className="terrazas-sample-name">{s.name}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="terrazas-samples-cta-wrap">
          <a href="/#presupuesto" className="terrazas-samples-cta">
            {t('terrazas.budgetCta')} <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </section>
    </main>
  )
}
