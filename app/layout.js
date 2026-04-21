import './globals.css'
import { LanguageProvider } from '../lib/i18n'

export const metadata = {
  title: 'MaderArte — Carpintería Artesanal',
  description: 'Carpintería artesanal con más de 35 años de experiencia. Muebles a medida, cocinas, puertas y más.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
