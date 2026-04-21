'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import BlogAdmin from '../../components/BlogAdmin'

const PASS = 'maderarte2024'

const SERVICIOS = [
  { key: 'muebles',             label: 'Muebles a medida' },
  { key: 'cocinas',             label: 'Cocinas integrales' },
  { key: 'puertas',             label: 'Puertas y ventanas (general)' },
  { key: 'puertas_interiores',  label: '› Puertas interiores' },
  { key: 'puertas_exteriores',  label: '› Puertas exteriores' },
  { key: 'puertas_vidrio',      label: '› Puertas con vidrio' },
  { key: 'puertas_lacadas',     label: '› Puertas lacadas' },
  { key: 'exteriores',          label: 'Terrazas y exteriores' },
  { key: 'parquet',             label: 'Instalación de parquet' },
  { key: 'parquet_catalogo',    label: '› Catálogo de parquet' },
  { key: 'restauracion',        label: 'Restauración' },
  { key: 'escaleras',           label: 'Estructuras y escaleras' },
]

export default function AdminPage() {
  const [auth, setAuth]           = useState(false)
  const [passInput, setPassInput] = useState('')
  const [passError, setPassError] = useState(false)

  const [media, setMedia]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast]         = useState('')
  const [filterSrv, setFilterSrv] = useState('all')
  const [tab, setTab]             = useState('media')

  const EMPTY_FORM = {
    tipo_servicio: '', titulo: '', descripcion: '', file: null,
    nombre: '', sku: '',
    coleccion: 'DOLCE (DOL)',
    formato: '1261 x 192 x 7',
    formato_busqueda: 'Lama standard',
    stock: 'En stock',
    uso: 'Residencial intenso / Comercial moderado',
    sector: 'Contract, Residencial, Retail',
    packaging: '10 lamas - caja - 2,421 m² - 15,2 kg | 64 cajas - pallet - 116,74m² - 818 Kg',
    anclaje: 'Uniclic',
    un_venta: 'm²',
    bisel: 'Sin bisel',
  }
  const [form, setForm] = useState(EMPTY_FORM)
  const isParquetCat = form.tipo_servicio === 'parquet_catalogo'
  const fileRef = useRef()

  useEffect(() => {
    if (auth) fetchMedia()
  }, [auth])

  async function fetchMedia() {
    setLoading(true)
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    setMedia(data || [])
    setLoading(false)
  }

  function login(e) {
    e.preventDefault()
    if (passInput === PASS) { setAuth(true); setPassError(false) }
    else setPassError(true)
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!form.file || !form.tipo_servicio) return showToast('Selecciona servicio y archivo', true)

    setUploading(true)
    const file       = form.file
    const ext        = file.name.split('.').pop().toLowerCase()
    const path       = `${form.tipo_servicio}/${Date.now()}.${ext}`
    const tipo_media = file.type.startsWith('video') ? 'video' : 'foto'

    try {
      const signRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sign', path }),
      })
      const sign = await signRes.json()
      if (!signRes.ok) throw new Error(sign.error || 'No se pudo firmar')

      const { error: upErr } = await supabase.storage
        .from('media')
        .uploadToSignedUrl(sign.path, sign.token, file, { contentType: file.type })
      if (upErr) throw new Error(upErr.message)

      const extra = form.tipo_servicio === 'parquet_catalogo' ? {
        nombre: form.nombre, sku: form.sku,
        coleccion: form.coleccion, formato: form.formato,
        formato_busqueda: form.formato_busqueda, stock: form.stock,
        uso: form.uso, sector: form.sector, packaging: form.packaging,
        anclaje: form.anclaje, un_venta: form.un_venta, bisel: form.bisel,
      } : {}

      const commitRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'commit',
          path, tipo_servicio: form.tipo_servicio, tipo_media,
          titulo: form.titulo || form.nombre || '',
          descripcion: form.descripcion || '',
          ...extra,
        }),
      })
      const commit = await commitRes.json()
      if (!commitRes.ok) throw new Error(commit.error || 'No se pudo guardar')

      showToast('✓ Archivo subido correctamente')
      setForm({ ...EMPTY_FORM, tipo_servicio: form.tipo_servicio })
      fileRef.current.value = ''
      fetchMedia()
    } catch (err) {
      showToast('Error: ' + err.message, true)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(item) {
    if (!confirm(`¿Eliminar "${item.titulo || item.storage_path}"?`)) return
    await supabase.storage.from('media').remove([item.storage_path])
    await supabase.from('media').delete().eq('id', item.id)
    showToast('Eliminado')
    fetchMedia()
  }

  function showToast(msg, isErr = false) {
    setToast({ msg, isErr })
    setTimeout(() => setToast(''), 3500)
  }

  const filtered = filterSrv === 'all' ? media : media.filter(m => m.tipo_servicio === filterSrv)

  if (!auth) return (
    <div style={S.loginWrap}>
      <form onSubmit={login} style={S.loginBox}>
        <div style={S.loginLogo}>Mader<span style={{ color: '#c8874b' }}>Arte</span></div>
        <h2 style={S.loginTitle}>Panel de administración</h2>
        <input
          type="password"
          placeholder="Contraseña"
          value={passInput}
          onChange={e => setPassInput(e.target.value)}
          style={{ ...S.input, ...(passError ? S.inputErr : {}) }}
          autoFocus
        />
        {passError && <p style={S.errMsg}>Contraseña incorrecta</p>}
        <button type="submit" style={S.btnPrimary}>Entrar</button>
      </form>
    </div>
  )

  return (
    <div style={S.wrap}>
      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.sidebarLogo}>Mader<span style={{ color: '#c8874b' }}>Arte</span></div>
        <nav style={S.nav}>
          <a href="/" style={S.navLink}>← Ver web</a>
        </nav>
        <div style={S.sidebarSection}>Sección</div>
        <button onClick={() => setTab('media')}
          style={{ ...S.filterBtn, ...(tab === 'media' ? S.filterBtnActive : {}) }}>
          📁 Medios
        </button>
        <button onClick={() => setTab('blog')}
          style={{ ...S.filterBtn, ...(tab === 'blog' ? S.filterBtnActive : {}) }}>
          📝 Blog
        </button>

        {tab === 'media' && (
          <>
            <div style={S.sidebarSection}>Filtrar por servicio</div>
            <button onClick={() => setFilterSrv('all')} style={{ ...S.filterBtn, ...(filterSrv === 'all' ? S.filterBtnActive : {}) }}>
              Todos ({media.length})
            </button>
            {SERVICIOS.map(s => {
              const count = media.filter(m => m.tipo_servicio === s.key).length
              return (
                <button key={s.key} onClick={() => setFilterSrv(s.key)}
                  style={{ ...S.filterBtn, ...(filterSrv === s.key ? S.filterBtnActive : {}) }}>
                  {s.label} ({count})
                </button>
              )
            })}
          </>
        )}
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        {tab === 'blog' ? (
          <>
            <div style={S.header}>
              <h1 style={S.pageTitle}>Blog</h1>
            </div>
            <BlogAdmin onToast={showToast} />
            {toast && (
              <div style={{ ...S.toast, background: toast.isErr ? '#c0392b' : '#27ae60' }}>
                {toast.msg}
              </div>
            )}
          </>
        ) : (
          <>
        <div style={S.header}>
          <h1 style={S.pageTitle}>Gestión de medios</h1>
          <span style={S.badge}>{media.length} archivos</span>
        </div>

        {/* UPLOAD FORM */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>Subir nuevo archivo</h3>
          <form onSubmit={handleUpload} style={S.uploadForm}>
            <div style={S.formRow}>
              <div style={S.formGroup}>
                <label style={S.label}>Tipo de servicio *</label>
                <select
                  value={form.tipo_servicio}
                  onChange={e => setForm(f => ({ ...f, tipo_servicio: e.target.value }))}
                  style={S.input} required
                >
                  <option value="">Selecciona...</option>
                  {SERVICIOS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Título (opcional)</label>
                <input
                  type="text" placeholder="Ej: Cocina roble natural 2024"
                  value={form.titulo}
                  onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                  style={S.input}
                />
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Descripción (opcional, máx. 4 líneas)</label>
              <textarea
                rows={4}
                placeholder="Detalles del trabajo: material, acabado, dimensiones, etc."
                value={form.descripcion}
                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                style={{ ...S.input, resize: 'vertical', fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            {isParquetCat && (
              <div style={{ background: '#faf6f0', padding: '18px 20px', borderRadius: 12, border: '1px solid #ede0cc' }}>
                <p style={{ margin: '0 0 14px', fontSize: '.82rem', fontWeight: 600, color: '#7a5c44', textTransform: 'uppercase', letterSpacing: '.8px' }}>
                  Ficha técnica
                </p>
                <div style={S.formRow}>
                  <div style={S.formGroup}>
                    <label style={S.label}>Nombre *</label>
                    <input type="text" placeholder="Roble Marrón" required={isParquetCat}
                      value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                      style={S.input} />
                  </div>
                  <div style={S.formGroup}>
                    <label style={S.label}>SKU *</label>
                    <input type="text" placeholder="DOL61028" required={isParquetCat}
                      value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                      style={S.input} />
                  </div>
                </div>
                <div style={S.formRow}>
                  <div style={S.formGroup}>
                    <label style={S.label}>Colección</label>
                    <input type="text" value={form.coleccion} onChange={e => setForm(f => ({ ...f, coleccion: e.target.value }))} style={S.input} />
                  </div>
                  <div style={S.formGroup}>
                    <label style={S.label}>Formato</label>
                    <input type="text" value={form.formato} onChange={e => setForm(f => ({ ...f, formato: e.target.value }))} style={S.input} />
                  </div>
                </div>
                <div style={S.formRow}>
                  <div style={S.formGroup}>
                    <label style={S.label}>Formato de búsqueda</label>
                    <input type="text" value={form.formato_busqueda} onChange={e => setForm(f => ({ ...f, formato_busqueda: e.target.value }))} style={S.input} />
                  </div>
                  <div style={S.formGroup}>
                    <label style={S.label}>Stock</label>
                    <input type="text" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} style={S.input} />
                  </div>
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Uso</label>
                  <input type="text" value={form.uso} onChange={e => setForm(f => ({ ...f, uso: e.target.value }))} style={S.input} />
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Sector</label>
                  <input type="text" value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))} style={S.input} />
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Packaging</label>
                  <input type="text" value={form.packaging} onChange={e => setForm(f => ({ ...f, packaging: e.target.value }))} style={S.input} />
                </div>
                <div style={S.formRow}>
                  <div style={S.formGroup}>
                    <label style={S.label}>Anclaje</label>
                    <input type="text" value={form.anclaje} onChange={e => setForm(f => ({ ...f, anclaje: e.target.value }))} style={S.input} />
                  </div>
                  <div style={S.formGroup}>
                    <label style={S.label}>Un. venta</label>
                    <input type="text" value={form.un_venta} onChange={e => setForm(f => ({ ...f, un_venta: e.target.value }))} style={S.input} />
                  </div>
                  <div style={S.formGroup}>
                    <label style={S.label}>Bisel</label>
                    <input type="text" value={form.bisel} onChange={e => setForm(f => ({ ...f, bisel: e.target.value }))} style={S.input} />
                  </div>
                </div>
              </div>
            )}
            <div style={S.formGroup}>
              <label style={S.label}>Archivo (foto o vídeo) *</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                onChange={e => setForm(f => ({ ...f, file: e.target.files[0] }))}
                style={S.fileInput}
                required
              />
              {form.file && (
                <p style={S.fileInfo}>
                  {form.file.name} · {(form.file.size / 1024 / 1024).toFixed(1)} MB
                  {form.file.type.startsWith('video') ? ' · 🎥 Vídeo' : ' · 🖼️ Foto'}
                </p>
              )}
            </div>
            <button type="submit" disabled={uploading} style={S.btnPrimary}>
              {uploading ? 'Subiendo...' : '↑ Subir archivo'}
            </button>
          </form>
        </div>

        {/* MEDIA GALLERY */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>
            {filterSrv === 'all' ? 'Todos los archivos' : SERVICIOS.find(s => s.key === filterSrv)?.label}
            <span style={{ ...S.badge, marginLeft: 10 }}>{filtered.length}</span>
          </h3>

          {loading ? (
            <p style={{ color: '#7a5c44', textAlign: 'center', padding: '40px' }}>Cargando...</p>
          ) : filtered.length === 0 ? (
            <div style={S.empty}>
              <div style={{ fontSize: '3rem' }}>📂</div>
              <p>No hay archivos en esta categoría</p>
            </div>
          ) : (
            <div style={S.grid}>
              {filtered.map(item => (
                <div key={item.id} style={S.mediaCard}>
                  <div style={S.mediaThumbnail}>
                    {item.tipo_media === 'video' ? (
                      <video src={item.url} style={S.mediaAsset} controls muted />
                    ) : (
                      <img src={item.url} alt={item.titulo || ''} style={S.mediaAsset} />
                    )}
                    <div style={S.mediaTypeBadge}>
                      {item.tipo_media === 'video' ? '🎥' : '🖼️'}
                    </div>
                  </div>
                  <div style={S.mediaInfo}>
                    <p style={S.mediaTitle}>{item.titulo || <em style={{ color: '#aaa' }}>Sin título</em>}</p>
                    <p style={S.mediaService}>{SERVICIOS.find(s => s.key === item.tipo_servicio)?.label}</p>
                    <p style={S.mediaDate}>{new Date(item.created_at).toLocaleDateString('es-ES')}</p>
                  </div>
                  <button onClick={() => handleDelete(item)} style={S.btnDelete}>Eliminar</button>
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        )}
      </main>

      {tab === 'media' && toast && (
        <div style={{ ...S.toast, background: toast.isErr ? '#c0392b' : '#27ae60' }}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

const S = {
  loginWrap:   { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5efe6' },
  loginBox:    { background: '#fff', borderRadius: 16, padding: '48px 40px', width: 360, boxShadow: '0 8px 32px rgba(0,0,0,.1)', display: 'flex', flexDirection: 'column', gap: 16 },
  loginLogo:   { fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#3b2009', textAlign: 'center' },
  loginTitle:  { fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: '#3b2009', margin: 0, textAlign: 'center' },
  errMsg:      { color: '#c0392b', fontSize: '.85rem', margin: 0 },

  wrap:        { display: 'flex', minHeight: '100vh', background: '#f5efe6', fontFamily: "'Inter',sans-serif" },
  sidebar:     { width: 240, minWidth: 240, background: '#3b2009', padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 4 },
  sidebarLogo: { fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: '#fff', marginBottom: 24, paddingLeft: 8 },
  sidebarSection: { color: 'rgba(255,255,255,.4)', fontSize: '.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '16px 8px 8px' },
  nav:         { marginBottom: 8 },
  navLink:     { color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '.85rem', padding: '8px', display: 'block', borderRadius: 8 },
  filterBtn:   { width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'rgba(255,255,255,.65)', cursor: 'pointer', padding: '8px 10px', borderRadius: 8, fontSize: '.82rem', marginBottom: 2 },
  filterBtnActive: { background: 'rgba(200,135,75,.25)', color: '#e09a5d' },

  main:        { flex: 1, padding: '32px 36px', overflow: 'auto' },
  header:      { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 },
  pageTitle:   { fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#3b2009', margin: 0 },
  badge:       { background: '#c8874b', color: '#fff', borderRadius: 50, padding: '3px 12px', fontSize: '.78rem', fontWeight: 600 },

  card:        { background: '#fff', borderRadius: 16, padding: '28px 32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,.06)' },
  cardTitle:   { fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: '#3b2009', marginTop: 0, marginBottom: 22, display: 'flex', alignItems: 'center' },

  uploadForm:  { display: 'flex', flexDirection: 'column', gap: 16 },
  formRow:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  formGroup:   { display: 'flex', flexDirection: 'column', gap: 6 },
  label:       { fontSize: '.78rem', fontWeight: 600, color: '#7a5c44', textTransform: 'uppercase', letterSpacing: '.8px' },
  input:       { padding: '10px 14px', borderRadius: 10, border: '1.5px solid #ede0cc', fontFamily: "'Inter',sans-serif", fontSize: '.9rem', color: '#2c1a0e', outline: 'none', background: '#fff' },
  inputErr:    { borderColor: '#c0392b' },
  fileInput:   { padding: '10px 14px', borderRadius: 10, border: '1.5px solid #ede0cc', fontSize: '.85rem', background: '#faf6f0', cursor: 'pointer' },
  fileInfo:    { margin: '4px 0 0', fontSize: '.8rem', color: '#7a5c44' },

  btnPrimary:  { background: '#3b2009', color: '#fff', border: 'none', borderRadius: 50, padding: '12px 28px', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '.9rem', cursor: 'pointer', alignSelf: 'flex-start' },
  btnDelete:   { background: '#fdf0f0', color: '#c0392b', border: '1px solid #f5c6c6', borderRadius: 8, padding: '6px 14px', fontSize: '.8rem', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginTop: 'auto' },

  grid:        { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  mediaCard:   { background: '#faf6f0', borderRadius: 12, overflow: 'hidden', border: '1px solid #ede0cc', display: 'flex', flexDirection: 'column' },
  mediaThumbnail: { position: 'relative', aspectRatio: '4/3', background: '#ede0cc', overflow: 'hidden' },
  mediaAsset:  { width: '100%', height: '100%', objectFit: 'cover' },
  mediaTypeBadge: { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.55)', borderRadius: 6, padding: '2px 6px', fontSize: '.75rem' },
  mediaInfo:   { padding: '12px 14px 8px', flex: 1 },
  mediaTitle:  { margin: '0 0 4px', fontSize: '.88rem', fontWeight: 600, color: '#2c1a0e' },
  mediaService: { margin: '0 0 2px', fontSize: '.75rem', color: '#c8874b', fontWeight: 500 },
  mediaDate:   { margin: 0, fontSize: '.72rem', color: '#aaa' },

  empty:       { textAlign: 'center', padding: '48px', color: '#7a5c44' },
  toast:       { position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', color: '#fff', padding: '12px 28px', borderRadius: 50, fontWeight: 600, fontSize: '.9rem', zIndex: 999 },
}
