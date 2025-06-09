import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import HowItWorks from './components/HowItWorks/HowItWorks'
import WhyUs from './components/WhyUs/WhyUs'
import CoffeeMachines from './components/CoffeeMachines/CoffeeMachines'
import AboutUs from './components/AboutUs/AboutUs'
import ContactForm from './components/ContactForm/ContactForm'
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
      
      {/* Placeholder для футера */}
      <footer style={{ padding: '40px 0', background: '#1e293b', color: 'white', textAlign: 'center' }}>
        <p>© 2024 Coffee Business. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App; 