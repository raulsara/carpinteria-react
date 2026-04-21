'use client'
import { useLang } from '../lib/i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">Mader<span>Arte</span></a>
          <p>{t('footer.tagline')}</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col footer-col-tight">
          <h5>{t('footer.servicios')}</h5>
          <ul>
            <li><a href="/parquet">{t('services.parquet')}</a></li>
            <li><a href="/puertas">{t('services.puertas')}</a></li>
            <li><a href="#servicios">{t('services.cocinas')}</a></li>
            <li><a href="#servicios">{t('services.terrazas')}</a></li>
            <li><a href="#servicios">{t('services.muebles')}</a></li>
            <li><a href="#servicios">{t('services.estructuras')}</a></li>
            <li><a href="#servicios">{t('services.restauracion')}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t('footer.empresa')}</h5>
          <ul>
            <li><a href="#nosotros">{t('footer.empresaNosotros')}</a></li>
            <li><a href="#portfolio">{t('footer.empresaGaleria')}</a></li>
            <li><a href="/blog">{t('footer.empresaBlog')}</a></li>
            <li><a href="#proceso">{t('footer.empresaProceso')}</a></li>
            <li><a href="#testimonios">{t('footer.empresaClientes')}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t('footer.contactoCol')}</h5>
          <ul>
            <li><a href="#presupuesto">{t('footer.contactoPedir')}</a></li>
            <li><a href="#contacto">{t('footer.contactoContacto')}</a></li>
            <li><a href="tel:+34607826072">+34 607 826 072</a></li>
            <li><a href="mailto:info@maderarte.es">info@maderarte.es</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MaderArte. {t('footer.copyright')}</p>
        <div className="footer-legal">
          <a href="/aviso-legal">{t('footer.legalAviso')}</a>
          <a href="/politica-privacidad">{t('footer.legalPrivacidad')}</a>
          <a href="/politica-cookies">{t('footer.legalCookies')}</a>
        </div>
      </div>
    </footer>
  )
}
