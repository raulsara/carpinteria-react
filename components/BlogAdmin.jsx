'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

function slugify(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const EMPTY_POST = {
  id: null, slug: '', titulo: '', subtitulo: '', resumen: '',
  contenido: '', imagen_portada: '', published: false,
}

export default function BlogAdmin({ onToast }) {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [form, setForm]       = useState(EMPTY_POST)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  async function fetchPosts() {
    setLoading(true)
    const { data } = await supabase.from('posts')
      .select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  function newPost() {
    setForm(EMPTY_POST)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function editPost(p) {
    setForm({ ...p })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deletePost(p) {
    if (!confirm(`¿Eliminar el artículo "${p.titulo}"?`)) return
    const { error } = await supabase.from('posts').delete().eq('id', p.id)
    if (error) return onToast('Error: ' + error.message, true)
    onToast('Artículo eliminado')
    if (form.id === p.id) setForm(EMPTY_POST)
    fetchPosts()
  }

  async function togglePublish(p) {
    const { error } = await supabase.from('posts')
      .update({ published: !p.published }).eq('id', p.id)
    if (error) return onToast('Error: ' + error.message, true)
    onToast(p.published ? 'Marcado como borrador' : 'Publicado')
    fetchPosts()
  }

  async function uploadCover(file) {
    if (!file) return
    setUploading(true)
    try {
      const ext  = file.name.split('.').pop().toLowerCase()
      const path = `blog/${Date.now()}.${ext}`
      const signRes = await fetch('/api/upload', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sign', path }),
      })
      const sign = await signRes.json()
      if (!signRes.ok) throw new Error(sign.error)

      const { error: upErr } = await supabase.storage.from('media')
        .uploadToSignedUrl(sign.path, sign.token, file, { contentType: file.type })
      if (upErr) throw new Error(upErr.message)

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path}`
      setForm(f => ({ ...f, imagen_portada: url }))
      onToast('Imagen subida')
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      onToast('Error: ' + err.message, true)
    } finally {
      setUploading(false)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.titulo?.trim() || !form.contenido?.trim()) {
      return onToast('Título y contenido son obligatorios', true)
    }
    const slug = form.slug?.trim() || slugify(form.titulo)
    const payload = {
      slug,
      titulo: form.titulo.trim(),
      subtitulo: form.subtitulo?.trim() || null,
      resumen: form.resumen?.trim() || null,
      contenido: form.contenido,
      imagen_portada: form.imagen_portada || null,
      published: form.published,
    }

    setSaving(true)
    let res
    if (form.id) {
      res = await supabase.from('posts').update(payload).eq('id', form.id)
    } else {
      res = await supabase.from('posts').insert([payload])
    }
    setSaving(false)

    if (res.error) return onToast('Error: ' + res.error.message, true)
    onToast(form.id ? 'Artículo actualizado' : 'Artículo creado')
    setForm(EMPTY_POST)
    fetchPosts()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={S.card}>
        <h3 style={S.cardTitle}>{form.id ? 'Editar artículo' : 'Nuevo artículo'}</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={S.formRow}>
            <div style={S.formGroup}>
              <label style={S.label}>Título *</label>
              <input type="text" required value={form.titulo}
                onChange={e => setForm(f => ({ ...f, titulo: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                style={S.input} />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Slug (URL)</label>
              <input type="text" value={form.slug} placeholder="se genera automáticamente"
                onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                style={S.input} />
            </div>
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>Subtítulo</label>
            <input type="text" value={form.subtitulo}
              onChange={e => setForm(f => ({ ...f, subtitulo: e.target.value }))}
              style={S.input} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>Resumen (se muestra en el listado)</label>
            <textarea rows={2} value={form.resumen}
              onChange={e => setForm(f => ({ ...f, resumen: e.target.value }))}
              style={{ ...S.input, resize: 'vertical', fontFamily: "'Inter', sans-serif" }} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>Imagen de portada</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input ref={fileRef} type="file" accept="image/*"
                onChange={e => e.target.files[0] && uploadCover(e.target.files[0])}
                style={{ ...S.fileInput, flex: 1 }} disabled={uploading} />
              {form.imagen_portada && (
                <>
                  <img src={form.imagen_portada} alt="" style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                  <button type="button" onClick={() => setForm(f => ({ ...f, imagen_portada: '' }))}
                    style={{ ...S.btnGhost, padding: '6px 10px' }}>Quitar</button>
                </>
              )}
            </div>
            {uploading && <p style={S.fileInfo}>Subiendo imagen...</p>}
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>
              Contenido (Markdown) *
              <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: 8, color: '#999' }}>
                **negrita**, *cursiva*, # Título, ## Subtítulo, - lista, [enlace](url), ![alt](url)
              </span>
            </label>
            <textarea rows={14} required value={form.contenido}
              onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
              style={{ ...S.input, resize: 'vertical', fontFamily: "'Courier New', monospace", fontSize: '.88rem' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '.9rem' }}>
            <input type="checkbox" checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              style={{ width: 18, height: 18 }} />
            Publicar (visible en la web)
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" disabled={saving} style={S.btnPrimary}>
              {saving ? 'Guardando...' : form.id ? 'Guardar cambios' : 'Crear artículo'}
            </button>
            {form.id && (
              <button type="button" onClick={newPost} style={S.btnGhost}>Cancelar edición</button>
            )}
          </div>
        </form>
      </div>

      <div style={S.card}>
        <h3 style={S.cardTitle}>Artículos existentes <span style={{ ...S.badge, marginLeft: 10 }}>{posts.length}</span></h3>
        {loading ? (
          <p style={{ color: '#7a5c44', textAlign: 'center', padding: 40 }}>Cargando...</p>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#7a5c44' }}>
            <div style={{ fontSize: '2.5rem' }}>📝</div>
            <p>No hay artículos aún</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {posts.map(p => (
              <div key={p.id} style={S.postRow}>
                {p.imagen_portada
                  ? <img src={p.imagen_portada} alt="" style={{ width: 70, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                  : <div style={{ width: 70, height: 56, borderRadius: 6, background: '#ede0cc', flexShrink: 0 }} />
                }
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#2c1a0e' }}>{p.titulo}</p>
                    <span style={p.published ? S.tagPublished : S.tagDraft}>
                      {p.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '.78rem', color: '#aaa' }}>
                    /blog/{p.slug} · {new Date(p.created_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <button onClick={() => togglePublish(p)} style={S.btnGhost}>
                  {p.published ? 'Despublicar' : 'Publicar'}
                </button>
                <button onClick={() => editPost(p)} style={S.btnGhost}>Editar</button>
                <button onClick={() => deletePost(p)} style={S.btnDanger}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const S = {
  card:        { background: '#fff', borderRadius: 16, padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' },
  cardTitle:   { fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: '#3b2009', marginTop: 0, marginBottom: 22, display: 'flex', alignItems: 'center' },
  formRow:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  formGroup:   { display: 'flex', flexDirection: 'column', gap: 6 },
  label:       { fontSize: '.78rem', fontWeight: 600, color: '#7a5c44', textTransform: 'uppercase', letterSpacing: '.8px' },
  input:       { padding: '10px 14px', borderRadius: 10, border: '1.5px solid #ede0cc', fontFamily: "'Inter',sans-serif", fontSize: '.9rem', color: '#2c1a0e', outline: 'none', background: '#fff' },
  fileInput:   { padding: '10px 14px', borderRadius: 10, border: '1.5px solid #ede0cc', fontSize: '.85rem', background: '#faf6f0', cursor: 'pointer' },
  fileInfo:    { margin: '4px 0 0', fontSize: '.8rem', color: '#7a5c44' },
  btnPrimary:  { background: '#3b2009', color: '#fff', border: 'none', borderRadius: 50, padding: '12px 28px', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '.9rem', cursor: 'pointer' },
  btnGhost:    { background: '#faf6f0', color: '#7a5c44', border: '1px solid #ede0cc', borderRadius: 8, padding: '8px 14px', fontSize: '.82rem', cursor: 'pointer', fontFamily: "'Inter',sans-serif" },
  btnDanger:   { background: '#fdf0f0', color: '#c0392b', border: '1px solid #f5c6c6', borderRadius: 8, padding: '8px 14px', fontSize: '.82rem', cursor: 'pointer', fontFamily: "'Inter',sans-serif" },
  postRow:     { display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: '#faf6f0', borderRadius: 10, border: '1px solid #ede0cc' },
  tagPublished:{ background: '#e8f6ed', color: '#1e874e', padding: '2px 8px', borderRadius: 50, fontSize: '.7rem', fontWeight: 600 },
  tagDraft:    { background: '#fdf2d9', color: '#a6780f', padding: '2px 8px', borderRadius: 50, fontSize: '.7rem', fontWeight: 600 },
  badge:       { background: '#c8874b', color: '#fff', borderRadius: 50, padding: '3px 12px', fontSize: '.78rem', fontWeight: 600 },
}
