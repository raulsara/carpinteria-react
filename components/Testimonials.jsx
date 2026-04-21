'use client'
import Reveal from './Reveal'
import { useLang } from '../lib/i18n'

const REVIEWS = [
  { text_es: 'El armario que me hicieron a medida es exactamente lo que imaginaba. Calidad excelente y el equipo muy profesional en todo momento.',
    text_ca: 'L\'armari que em van fer a mida és exactament el que imaginava. Qualitat excel·lent i l\'equip molt professional en tot moment.',
    name: 'María García', sub_es: 'Armario empotrado · Barcelona', sub_ca: 'Armari empotrat · Barcelona' },
  { text_es: 'Nos reformaron toda la cocina en madera de roble. El resultado superó todas las expectativas. Presupuesto claro y sin sorpresas.',
    text_ca: 'Ens van reformar tota la cuina en fusta de roure. El resultat va superar totes les expectatives. Pressupost clar i sense sorpreses.',
    name: 'Carlos Ruiz', sub_es: 'Cocina integral · Sabadell', sub_ca: 'Cuina integral · Sabadell' },
  { text_es: 'Restauraron un mueble de mi abuela que parecía imposible de salvar. Quedó como nuevo, con mimo y detalle artesanal único.',
    text_ca: 'Van restaurar un moble de la meva àvia que semblava impossible de salvar. Va quedar com nou, amb cura i detall artesanal únic.',
    name: 'Ana López', sub_es: 'Restauración · Terrassa', sub_ca: 'Restauració · Terrassa' },
  { text_es: 'Instalaron el parquet de toda la vivienda en tiempo récord y con un acabado impecable. Se nota la experiencia en cada detalle.',
    text_ca: 'Van instal·lar el parquet de tot l\'habitatge en temps rècord i amb un acabat impecable. Es nota l\'experiència en cada detall.',
    name: 'Javier Molina', sub_es: 'Parquet de roble · Sant Cugat del Vallès', sub_ca: 'Parquet de roure · Sant Cugat del Vallès' },
  { text_es: 'La puerta de entrada en nogal macizo es espectacular. Aísla genial y el diseño encaja perfecto con la casa. Cien por cien recomendables.',
    text_ca: 'La porta d\'entrada en noguera massissa és espectacular. Aïlla genial i el disseny encaixa perfecte amb la casa. Cent per cent recomanables.',
    name: 'Laura Fernández', sub_es: 'Puerta exterior · Badalona', sub_ca: 'Porta exterior · Badalona' },
  { text_es: 'Nos construyeron una pérgola de madera tratada para la terraza. Dos años después sigue como el primer día. Trabajo limpio y puntuales.',
    text_ca: 'Ens van construir una pèrgola de fusta tractada per a la terrassa. Dos anys després continua com el primer dia. Treball net i puntuals.',
    name: 'Pedro Navarro', sub_es: 'Pérgola exterior · Castellar del Vallès', sub_ca: 'Pèrgola exterior · Castellar del Vallès' },
]

export default function Testimonials() {
  const { t, lang } = useLang()
  return (
    <section id="testimonios">
      <Reveal className="testimonios-header">
        <span className="section-tag">{t('testimonials.tag')}</span>
        <h2 className="section-title">{t('testimonials.title')}</h2>
      </Reveal>
      <div className="testimonios-grid">
        {REVIEWS.map(r => (
          <Reveal key={r.name} className="testimonial-card">
            <div className="quote-mark">"</div>
            <div className="stars">★★★★★</div>
            <p>{lang === 'ca' ? r.text_ca : r.text_es}</p>
            <div className="reviewer">
              <div className="reviewer-avatar">👤</div>
              <div className="reviewer-info">
                <strong>{r.name}</strong>
                <span>{lang === 'ca' ? r.sub_ca : r.sub_es}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
