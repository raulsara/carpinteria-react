export const metadata = { title: 'Política de Cookies — MaderArte' }

export default function PoliticaCookies() {
  return (
    <main className="subpage legal-page">
      <div className="legal-wrap">
        <span className="section-tag">Información legal</span>
        <h1 className="section-title">Política de Cookies</h1>

        <h2>1. ¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando usted los visita. Sirven para hacer que las páginas funcionen correctamente, recordar sus preferencias y, en algunos casos, obtener estadísticas de uso.</p>

        <h2>2. Cookies que utiliza este sitio</h2>
        <p>Este sitio web utiliza exclusivamente <strong>cookies técnicas estrictamente necesarias</strong> para su correcto funcionamiento. No se emplean cookies de publicidad, de seguimiento comportamental ni de redes sociales de terceros que requieran consentimiento previo.</p>

        <table className="legal-table">
          <thead>
            <tr><th>Cookie</th><th>Titular</th><th>Finalidad</th><th>Duración</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Sesión de navegación</td>
              <td>Vercel / Next.js</td>
              <td>Mantener el estado de la sesión y asegurar el correcto funcionamiento del sitio.</td>
              <td>Sesión</td>
            </tr>
            <tr>
              <td>Preferencias de tema</td>
              <td>MaderArte</td>
              <td>Recordar ajustes visuales del usuario durante la navegación.</td>
              <td>1 año</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Cookies de terceros</h2>
        <p>Si durante su navegación interactúa con servicios externos (WhatsApp, Facebook, Instagram) a través de los enlaces del sitio, esos proveedores podrán instalar sus propias cookies conforme a sus respectivas políticas:</p>
        <ul>
          <li>WhatsApp (Meta Platforms Ireland Ltd): <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Política de privacidad</a></li>
          <li>Facebook: <a href="https://www.facebook.com/policies/cookies" target="_blank" rel="noopener noreferrer">Política de cookies</a></li>
          <li>Instagram: <a href="https://help.instagram.com/1896641480634370" target="_blank" rel="noopener noreferrer">Política de cookies</a></li>
        </ul>

        <h2>4. Cómo gestionar las cookies</h2>
        <p>Puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo configurando las opciones de su navegador:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>Tenga en cuenta que deshabilitar ciertas cookies técnicas puede afectar al correcto funcionamiento de algunas partes del sitio.</p>

        <h2>5. Actualización de esta política</h2>
        <p>MaderArte podrá modificar esta política de cookies en función de cambios legislativos o de la incorporación de nuevos servicios. Se recomienda revisarla periódicamente.</p>

        <p className="legal-updated">Última actualización: abril de 2026</p>
      </div>
    </main>
  )
}
