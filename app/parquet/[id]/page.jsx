'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useLang } from '../../../lib/i18n'

const SPEC_KEYS = ['coleccion', 'sku', 'formato', 'formato_busqueda', 'stock', 'uso', 'sector', 'packaging', 'anclaje', 'un_venta', 'bisel']

export default function ParquetFicha({ params }) {
  const { t } = useLang()
  const id = params?.id
  const [item, setItem]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase.from('media').select('*').eq('id', id).single()
      .then(({ data }) => {
        setItem(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <main className="subpage"><p className="portfolio-empty">{t('parquet.loadingFicha')}</p></main>

  if (!item) {
    return (
      <main className="subpage">
        <div className="portfolio-empty">
          <p>{t('parquet.notFound')}</p>
          <Link href="/parquet" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>{t('parquet.viewCatalog')}</Link>
        </div>
      </main>
    )
  }

  const nombre = item.nombre || item.titulo || 'Parquet'
  const specs = SPEC_KEYS.filter(k => item[k])

  return (
    <main className="subpage subpage-ficha">
      <div className="ficha-wrap">
        <div className="ficha-img">
          {item.tipo_media === 'video'
            ? <video src={item.url} controls />
            : <img src={item.url} alt={nombre} />}
        </div>
        <div className="ficha-info">
          <h1 className="ficha-title">
            {nombre}
            {item.sku && <span className="ficha-sku"> – {item.sku}</span>}
          </h1>
          <p className="ficha-disclaimer">{t('parquet.disclaimer')}</p>
          <dl className="ficha-specs">
            {specs.map(key => (
              <div key={key} className="ficha-row">
                <dt>{t(`parquet.specs.${key}`)}:</dt>
                <dd>{item[key]}</dd>
              </div>
            ))}
          </dl>
          <Link href="/#presupuesto" className="btn-primary" style={{ marginTop: 32, display: 'inline-block' }}>
            {t('parquet.requestBudget')}
          </Link>
        </div>
      </div>
    </main>
  )
}
