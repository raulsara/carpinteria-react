import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const SUPABASE_URL         = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
                             || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const { action, path, tipo_servicio, tipo_media, titulo } = await req.json()

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  })

  if (action === 'sign') {
    const { data, error } = await admin.storage
      .from('media')
      .createSignedUploadUrl(path)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ token: data.token, path: data.path })
  }

  if (action === 'commit') {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/media/${path}`
    const { error } = await admin.from('media').insert([{
      tipo_servicio,
      tipo_media,
      url: publicUrl,
      titulo: titulo || null,
      storage_path: path,
    }])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ url: publicUrl })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
