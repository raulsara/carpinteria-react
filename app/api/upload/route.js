import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  try {
    const r = await fetch(`${url}/rest/v1/media?select=id,tipo_servicio`, {
      headers: { 'Authorization': `Bearer ${anon}`, 'apikey': anon },
    })
    const body = await r.text()
    return NextResponse.json({ url, status: r.status, body: body.slice(0, 500) })
  } catch (e) {
    return NextResponse.json({ error: e.message })
  }
}

export async function POST(req) {
  const SUPABASE_URL         = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
                             || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const formData      = await req.formData()
  const file          = formData.get('file')
  const path          = formData.get('path')
  const tipo_servicio = formData.get('tipo_servicio')
  const tipo_media    = formData.get('tipo_media')
  const titulo        = formData.get('titulo')

  const buffer = Buffer.from(await file.arrayBuffer())

  const uploadRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/media/${path}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'apikey': SUPABASE_SERVICE_KEY,
        'Content-Type': file.type,
        'x-upsert': 'true',
      },
      body: buffer,
    }
  )

  if (!uploadRes.ok) {
    const errBody = await uploadRes.text()
    return NextResponse.json(
      { error: `[STORAGE ${uploadRes.status}] ${errBody}` },
      { status: 500 }
    )
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/media/${path}`

  const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  const { error: dbErr } = await db.from('media').insert([{
    tipo_servicio,
    tipo_media,
    url: publicUrl,
    titulo: titulo || null,
    storage_path: path,
  }])

  if (dbErr) return NextResponse.json({ error: `[DB] ${dbErr.message}` }, { status: 500 })

  return NextResponse.json({ url: publicUrl })
}
