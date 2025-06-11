import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import HowItWorks from './components/HowItWorks/HowItWorks'
import WhyUs from './components/WhyUs/WhyUs'
import CoffeeMachines from './components/CoffeeMachines/CoffeeMachines'
import AboutUs from './components/AboutUs/AboutUs'
import ContactForm from './components/ContactForm/ContactForm'
import Footer from './components/Footer/Footer'
import './styles/global.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <HowItWorks />
      <WhyUs />
      <CoffeeMachines />
      <AboutUs />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App; 