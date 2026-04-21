import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'

export default function BlogLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
