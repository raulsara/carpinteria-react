import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const SUPABASE_URL        = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export async function GET() {
  const svc = process.env.SUPABASE_SERVICE_KEY
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return NextResponse.json({
    has_svc: !!svc,
    svc_len: svc?.length ?? 0,
    svc_start: svc?.slice(0, 30) ?? 'none',
    has_anon: !!anon,
    anon_len: anon?.length ?? 0,
  })
}

export async function POST(req) {
  const formData      = await req.formData()
  const file          = formData.get('file')
  const path          = formData.get('path')
  const tipo_servicio = formData.get('tipo_servicio')
  const tipo_media    = formData.get('tipo_media')
  const titulo        = formData.get('titulo')

  const buffer = await file.arrayBuffer()

  // Upload directo via fetch, evitando problemas de JWT en supabase-js
  const uploadRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/media/${path}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'apikey': SUPABASE_SERVICE_KEY,
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: buffer,
    }
  )

  if (!uploadRes.ok) {
    const err = await uploadRes.json().catch(() => ({ message: uploadRes.statusText }))
    return NextResponse.json({ error: err.message || err.error || 'Upload failed' }, { status: 500 })
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/media/${path}`

  const { error: dbErr } = await db.from('media').insert([{
    tipo_servicio,
    tipo_media,
    url: publicUrl,
    titulo: titulo || null,
    storage_path: path,
  }])

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 })

  return NextResponse.json({ url: publicUrl })
}
