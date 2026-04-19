'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Reveal from './Reveal'

const PRECIOS = {
  muebles:      { min: 800,  max: 1800, unit: 'm²',    label: 'Superficie aproximada' },
  cocina:       { min: 1500, max: 3500, unit: 'm²',    label: 'Superficie aproximada' },
  puertas:      { min: 400,  max: 900,  unit: 'ud',    label: 'Nº de unidades' },
  terraza:      { min: 300,  max: 800,  unit: 'm²',    label: 'Superficie aproximada' },
  parquet:      { min: 40,   max: 90,   unit: 'm²',    label: 'Superficie aproximada' },
  restauracion: { min: 200,  max: 700,  unit: 'pieza', label: 'Nº de piezas' },
}

const TIPO_LABELS = {
  muebles: 'Muebles a medida', cocina: 'Cocina integral',
  puertas: 'Puertas y ventanas', terraza: 'Terraza / Exterior',
  parquet: 'Instalación de parquet', restauracion: 'Restauración', otro: 'Otro',
}

const EMPTY = { tipo: '', material: '', tamano: '', plazo: 'Sin prisa', nombre: '', telefono: '', email: '', descripcion: '' }

export default function Presupuesto() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState(EMPTY)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState('')

  const precio = PRECIOS[form.tipo]
  const tamano = parseFloat(form.tamano) || 0
  const showEstimate = precio && tamano > 0
  const estimMin = showEstimate ? Math.round(tamano * precio.min) : 0
  const estimMax = showEstimate ? Math.round(tamano * precio.max) : 0

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  function validate(fields) {
    const errs = {}
    fields.forEach(f => {
      if (!form[f] || !String(form[f]).trim()) errs[f] = true
      if (f === 'email' && form.email && !form.email.includes('@')) errs.email = true
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next(n) {
    if (n > step) {
      if (step === 1 && !validate(['tipo'])) return
      if (step === 2 && !validate(['nombre', 'email'])) return
    }
    setErrors({})
    setStep(n)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const payload = {
      tipo:          form.tipo,
      material:      form.material || null,
      tamano:        tamano || null,
      unidad:        precio?.unit || null,
      plazo:         form.plazo,
      nombre:        form.nombre,
      telefono:      form.telefono || null,
      email:         form.email,
      descripcion:   form.descripcion || null,
      estimacion_min: showEstimate ? estimMin : null,
      estimacion_max: showEstimate ? estimMax : null,
    }

    const { error } = await supabase.from('presupuestos').insert([payload])

    if (error) {
      console.error(error)
      setToast('Error al guardar. Inténtalo de nuevo.')
      setTimeout(() => setToast(''), 4000)
      setLoading(false)
      return
    }

    // Abrir WhatsApp con los datos
    const est = showEstimate ? `${estimMin.toLocaleString('es-ES')} € – ${estimMax.toLocaleString('es-ES')} €` : ''
    const msg = [
      '¡Hola MaderArte! Quiero solicitar un presupuesto:',
      '',
      `📋 *Proyecto:* ${TIPO_LABELS[form.tipo] || form.tipo}`,
      form.material ? `🪵 *Material:* ${form.material}` : '',
      tamano ? `📐 *Tamaño:* ${form.tamano} ${precio?.unit}` : '',
      `⏰ *Plazo:* ${form.plazo}`,
      est ? `💰 *Estimación:* ${est}` : '',
      form.descripcion ? `📝 *Detalles:* ${form.descripcion}` : '',
      '',
      `👤 *Nombre:* ${form.nombre}`,
      form.telefono ? `📞 *Teléfono:* ${form.telefono}` : '',
      `✉️ *Email:* ${form.email}`,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/34612345678?text=${encodeURIComponent(msg)}`, '_blank')

    setToast('✓ ¡Solicitud guardada y enviada!')
    setTimeout(() => setToast(''), 4000)
    setForm(EMPTY)
    setStep(1)
    setLoading(false)
  }

  const dotClass = n => `step-dot${step === n ? ' active' : step > n ? ' done' : ''}`
  const lineClass = n => `step-line${step > n ? ' done' : ''}`

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
              { icon: '📞', title: 'Teléfono', text: '+34 612 345 678' },
              { icon: '✉️', title: 'Email',    text: 'info@maderarte.es' },
              { icon: '🕐', title: 'Horario',  text: 'Lun–Vie: 8:00–18:00 · Sáb: 9:00–13:00' },
            ].map(item => (
              <div key={item.title} className="contact-item">
                <div className="contact-item-icon">{item.icon}</div>
                <div><h5>{item.title}</h5><p>{item.text}</p></div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="contact-form">
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '24px' }}>
            Solicitar presupuesto
          </h3>

          {/* Indicador de pasos */}
          <div className="form-steps">
            {[1, 2, 3].map((n, i) => (
              <>
                <div key={n} className="step-col">
                  <div className={dotClass(n)}>{step > n ? '✓' : n}</div>
                  <div className="step-col-label">{['Proyecto', 'Tus datos', 'Confirmar'][i]}</div>
                </div>
                {n < 3 && <div key={`line${n}`} className={lineClass(n)} />}
              </>
            ))}
          </div>

          <form onSubmit={handleSubmit}>

            {/* PASO 1 */}
            <div className={`wizard-step ${step === 1 ? 'active' : ''}`}>
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
              <div className="form-group">
                <label>Material preferido</label>
                <select value={form.material} onChange={set('material')}>
                  <option value="">Sin preferencia</option>
                  <option>Roble natural</option>
                  <option>Pino</option>
                  <option>Nogal</option>
                  <option>Cerezo</option>
                  <option>MDF lacado</option>
                  <option>Melamina</option>
                </select>
              </div>
              <div className="form-group">
                <label>{precio?.label || 'Superficie aproximada'}</label>
                <div className="size-row">
                  <input type="number" min="1" placeholder="0" value={form.tamano} onChange={set('tamano')} />
                  <div className="size-unit">{precio?.unit || 'm²'}</div>
                </div>
              </div>
              {showEstimate && (
                <div className="budget-bar visible">
                  <div className="budget-bar-label">Estimación orientativa</div>
                  <div className="budget-range">
                    {estimMin.toLocaleString('es-ES')} € – {estimMax.toLocaleString('es-ES')} €
                  </div>
                  <div className="budget-note">Precio final tras visita técnica gratuita</div>
                </div>
              )}
              <div className="form-group">
                <label>Plazo deseado</label>
                <select value={form.plazo} onChange={set('plazo')}>
                  <option value="Sin prisa">Sin prisa</option>
                  <option value="1–2 meses">1–2 meses</option>
                  <option value="Menos de 1 mes">Menos de 1 mes</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
              <button type="button" className="form-submit" onClick={() => next(2)}>Siguiente →</button>
            </div>

            {/* PASO 2 */}
            <div className={`wizard-step ${step === 2 ? 'active' : ''}`}>
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
                  <label>Teléfono</label>
                  <input type="tel" placeholder="+34 600 000 000" value={form.telefono} onChange={set('telefono')} />
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
                <textarea placeholder="Cuéntanos qué quieres hacer, dimensiones, acabados, referencias..." rows={4} value={form.descripcion} onChange={set('descripcion')} />
              </div>
              <div className="form-nav">
                <button type="button" className="btn-prev" onClick={() => next(1)}>← Atrás</button>
                <button type="button" className="form-submit" style={{ flex: 1 }} onClick={() => next(3)}>Siguiente →</button>
              </div>
            </div>

            {/* PASO 3 */}
            <div className={`wizard-step ${step === 3 ? 'active' : ''}`}>
              <div className="step-summary">
                <h5>Resumen de tu solicitud</h5>
                {[
                  ['Proyecto',  TIPO_LABELS[form.tipo] || form.tipo || '—'],
                  ['Material',  form.material || 'Sin preferencia'],
                  ['Tamaño',    form.tamano ? `${form.tamano} ${precio?.unit}` : '—'],
                  ['Plazo',     form.plazo],
                  ['Nombre',    form.nombre],
                  ['Teléfono',  form.telefono || '—'],
                  ['Email',       form.email],
                  ...(form.descripcion ? [['Descripción', form.descripcion]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="summary-row">
                    <span>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              {showEstimate && (
                <div className="budget-bar visible">
                  <div className="budget-bar-label">Estimación orientativa</div>
                  <div className="budget-range">
                    {estimMin.toLocaleString('es-ES')} € – {estimMax.toLocaleString('es-ES')} €
                  </div>
                  <div className="budget-note">Recibirás un presupuesto exacto en menos de 24h</div>
                </div>
              )}
              <div className="form-nav">
                <button type="button" className="btn-prev" onClick={() => next(2)}>← Atrás</button>
                <button type="submit" className="form-submit-wa" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar por WhatsApp 💬'}
                </button>
              </div>
            </div>

          </form>
        </Reveal>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
