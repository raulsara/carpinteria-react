'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

const EMPTY = { tipo: '', nombre: '', telefono: '', email: '', descripcion: '', acepta: false }

export default function Presupuesto() {
  const { t } = useLang()
  const [form, setForm]       = useState(EMPTY)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState('')

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  function validate() {
    const errs = {}
    if (!form.tipo)                              errs.tipo     = true
    if (!form.nombre?.trim())                    errs.nombre   = true
    if (!form.telefono?.trim())                  errs.telefono = true
    if (!form.email || !form.email.includes('@')) errs.email   = true
    if (!form.acepta)                            errs.acepta   = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const TIPO_LABELS = {
    muebles: t('presupuesto.tipoMuebles'),
    cocina: t('presupuesto.tipoCocina'),
    puertas: t('presupuesto.tipoPuertas'),
    terraza: t('presupuesto.tipoTerraza'),
    parquet: t('presupuesto.tipoParquet'),
    restauracion: t('presupuesto.tipoRestauracion'),
    otro: t('presupuesto.tipoOtro'),
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    const payload = {
      tipo:        form.tipo,
      nombre:      form.nombre,
      telefono:    form.telefono || null,
      email:       form.email,
      descripcion: form.descripcion || null,
    }

    const { error } = await supabase.from('presupuestos').insert([payload])

    if (error) {
      console.error(error)
      setToast(t('presupuesto.saveError'))
      setTimeout(() => setToast(''), 4000)
      setLoading(false)
      return
    }

    const msg = [
      t('presupuesto.greeting'),
      '',
      `- ${t('presupuesto.lblProyecto')}: ${TIPO_LABELS[form.tipo] || form.tipo}`,
      form.descripcion ? `- ${t('presupuesto.lblDetalles')}: ${form.descripcion}` : '',
      '',
      `- ${t('presupuesto.lblNombre')}: ${form.nombre}`,
      `- ${t('presupuesto.lblTelefono')}: ${form.telefono}`,
      `- ${t('presupuesto.lblEmail')}: ${form.email}`,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/34607826072?text=${encodeURIComponent(msg)}`, '_blank')

    setToast(t('presupuesto.savedOk'))
    setTimeout(() => setToast(''), 4000)
    setForm(EMPTY)
    setLoading(false)
  }

  return (
    <section id="presupuesto">
      <Reveal className="presupuesto-header">
        <span className="section-tag">{t('presupuesto.tag')}</span>
        <h2 className="section-title">{t('presupuesto.title')}</h2>
        <p className="section-sub">{t('presupuesto.subtitle')}</p>
      </Reveal>

      <Reveal className="contact-form presupuesto-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('presupuesto.tipo')}</label>
            <select
              value={form.tipo}
              onChange={set('tipo')}
              className={errors.tipo ? 'field-error' : ''}
            >
              <option value="">{t('presupuesto.tipoPlaceholder')}</option>
              <option value="muebles">{t('presupuesto.tipoMuebles')}</option>
              <option value="cocina">{t('presupuesto.tipoCocina')}</option>
              <option value="puertas">{t('presupuesto.tipoPuertas')}</option>
              <option value="terraza">{t('presupuesto.tipoTerraza')}</option>
              <option value="parquet">{t('presupuesto.tipoParquet')}</option>
              <option value="restauracion">{t('presupuesto.tipoRestauracion')}</option>
              <option value="otro">{t('presupuesto.tipoOtro')}</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('presupuesto.nombre')}</label>
              <input
                type="text" placeholder={t('presupuesto.nombrePlaceholder')}
                value={form.nombre} onChange={set('nombre')}
                className={errors.nombre ? 'field-error' : ''}
              />
            </div>
            <div className="form-group">
              <label>{t('presupuesto.telefono')}</label>
              <input
                type="tel" placeholder="+34 600 000 000"
                value={form.telefono} onChange={set('telefono')}
                className={errors.telefono ? 'field-error' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('presupuesto.emailLabel')}</label>
            <input
              type="email" placeholder={t('presupuesto.emailPlaceholder')}
              value={form.email} onChange={set('email')}
              className={errors.email ? 'field-error' : ''}
            />
          </div>

          <div className="form-group">
            <label>{t('presupuesto.descripcion')}</label>
            <textarea
              placeholder={t('presupuesto.descripcionPlaceholder')}
              rows={4}
              value={form.descripcion}
              onChange={set('descripcion')}
            />
          </div>

          <label className={`form-consent${errors.acepta ? ' form-consent-error' : ''}`}>
            <input
              type="checkbox"
              checked={form.acepta}
              onChange={e => setForm(f => ({ ...f, acepta: e.target.checked }))}
            />
            <span>
              {t('presupuesto.consent')}{' '}
              <a href="/aviso-legal" target="_blank" rel="noopener noreferrer">{t('presupuesto.consentLegal')}</a>{' '}
              {t('presupuesto.consentAnd')}{' '}
              <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">{t('presupuesto.consentPrivacy')}</a>{' '}
              {t('presupuesto.consentFinal')}
            </span>
          </label>

          <button type="submit" className="form-submit-wa" disabled={loading}>
            {loading ? t('presupuesto.sending') : (
              <>
                {t('presupuesto.send')}
                <img src="/whatsapp.png" alt="" width="22" height="22" style={{ verticalAlign: 'middle', marginLeft: 8 }} />
              </>
            )}
          </button>
        </form>
      </Reveal>

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
