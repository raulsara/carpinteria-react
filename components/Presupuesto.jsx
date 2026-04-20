'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Reveal from './Reveal'

const TIPO_LABELS = {
  muebles: 'Muebles a medida', cocina: 'Cocina integral',
  puertas: 'Puertas y ventanas', terraza: 'Terraza / Exterior',
  parquet: 'Instalación de parquet', restauracion: 'Restauración', otro: 'Otro',
}

const EMPTY = { tipo: '', nombre: '', telefono: '', email: '', descripcion: '' }

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
    <section id="contacto">
      <div className="contact-wrap">
        <Reveal className="contact-info">
          <span className="section-tag">Contacto</span>
          <h2 className="section-title">¿Tienes un proyecto en mente?</h2>
          <p className="section-sub">Cuéntanos tu idea y te enviamos un presupuesto detallado sin ningún compromiso.</p>
          <div className="contact-items">
            {[
              { icon: '📍', title: 'Taller',   text: 'Paseo La Palma, 35' },
              { icon: '📞', title: 'Teléfono', text: '+34 607 826 072' },
              {
                wa: true, title: 'WhatsApp', text: '+34 607 826 072',
                href: 'https://wa.me/34607826072',
              },
              { icon: '✉️', title: 'Email',    text: 'info@maderarte.es' },
              { icon: '🕐', title: 'Horario',  text: 'Lun–Vie: 8:00–18:00' },
            ].map(item => {
              const content = (
                <>
                  <div className={`contact-item-icon${item.wa ? ' contact-item-icon-wa' : ''}`}>
                    {item.wa ? (
                      <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.52 11.95c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12s-.64.81-.79.97c-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07c0 1.22.89 2.41 1.02 2.57.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
                    ) : item.icon}
                  </div>
                  <div><h5>{item.title}</h5><p>{item.text}</p></div>
                </>
              )
              return item.href ? (
                <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-item contact-item-link">
                  {content}
                </a>
              ) : (
                <div key={item.title} className="contact-item">{content}</div>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="contact-form">
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '24px' }}>
            Solicitar presupuesto
          </h3>

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

            <button type="submit" className="form-submit-wa" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar por WhatsApp 💬'}
            </button>
          </form>
        </Reveal>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
