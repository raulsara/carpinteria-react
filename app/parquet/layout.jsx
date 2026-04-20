import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'

export default function ParquetLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
