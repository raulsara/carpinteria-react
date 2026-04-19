import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(req) {
  const formData = await req.formData()
  const file     = formData.get('file')
  const path     = formData.get('path')
  const tipo_servicio = formData.get('tipo_servicio')
  const tipo_media    = formData.get('tipo_media')
  const titulo        = formData.get('titulo')

  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: upErr } = await supabase.storage
    .from('media')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path)

  const { error: dbErr } = await supabase.from('media').insert([{
    tipo_servicio,
    tipo_media,
    url: publicUrl,
    titulo: titulo || null,
    storage_path: path,
  }])

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 })

  return NextResponse.json({ url: publicUrl })
}
