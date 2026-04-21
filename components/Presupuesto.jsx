'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Reveal from './Reveal'

const TIPO_LABELS = {
  muebles: 'Muebles a medida', cocina: 'Cocina integral',
  puertas: 'Puertas y ventanas', terraza: 'Terraza / Exterior',
  parquet: 'Instalación de parquet', restauracion: 'Restauración', otro: 'Otro',
}

const EMPTY = { tipo: '', nombre: '', telefono: '', email: '', descripcion: '', acepta: false }

export default function Presupuesto() {
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
      setToast('Error al guardar. Inténtalo de nuevo.')
      setTimeout(() => setToast(''), 4000)
      setLoading(false)
      return
    }

    const msg = [
      '¡Hola! Me gustaría recibir un presupuesto para el siguiente proyecto:',
      '',
      `- Proyecto: ${TIPO_LABELS[form.tipo] || form.tipo}`,
      form.descripcion ? `- Detalles: ${form.descripcion}` : '',
      '',
      `- Nombre: ${form.nombre}`,
      `- Teléfono: ${form.telefono}`,
      `- Email: ${form.email}`,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/34607826072?text=${encodeURIComponent(msg)}`, '_blank')

    setToast('✓ ¡Solicitud guardada y enviada!')
    setTimeout(() => setToast(''), 4000)
    setForm(EMPTY)
    setLoading(false)
  }

  return (
    <section id="presupuesto">
      <Reveal className="presupuesto-header">
        <span className="section-tag">Presupuesto</span>
        <h2 className="section-title">¿Tienes un proyecto en mente?</h2>
        <p className="section-sub">Cuéntanos tu idea y te enviamos un presupuesto detallado sin ningún compromiso.</p>
      </Reveal>

      <Reveal className="contact-form presupuesto-form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tipo de proyecto *</label>
              <select
                value={form.tipo}
                onChange={set('tipo')}
                className={errors.tipo ? 'field-error' : ''}
              >
                <option value="">Selecciona una opción</option>
                <option value="muebles">Muebles a medida</option>
                <option value="cocina">Cocina integral</option>
                <option value="puertas">Puertas y ventanas</option>
                <option value="terraza">Terraza / Exterior</option>
                <option value="parquet">Instalación de parquet</option>
                <option value="restauracion">Restauración</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text" placeholder="Tu nombre"
                  value={form.nombre} onChange={set('nombre')}
                  className={errors.nombre ? 'field-error' : ''}
                />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel" placeholder="+34 600 000 000"
                  value={form.telefono} onChange={set('telefono')}
                  className={errors.telefono ? 'field-error' : ''}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email" placeholder="correo@ejemplo.com"
                value={form.email} onChange={set('email')}
                className={errors.email ? 'field-error' : ''}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                placeholder="Cuéntanos qué quieres hacer, dimensiones, acabados, referencias..."
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
              He leído y acepto la información básica sobre protección de datos así como el aviso legal y la política de privacidad y acepto el tratamiento de mis datos para el trámite de la solicitud realizada.
            </span>
          </label>

          <button type="submit" className="form-submit-wa" disabled={loading}>
            {loading ? 'Enviando...' : (
              <>
                Enviar por WhatsApp
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
