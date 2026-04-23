import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Contacto from '../components/Contacto'
import Presupuesto from '../components/Presupuesto'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import HashScroll from '../components/HashScroll'

export default function Home() {
  return (
    <>
      <HashScroll />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Contacto />
      <Presupuesto />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
