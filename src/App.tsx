import { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import HowItWorks from './components/HowItWorks/HowItWorks'
import WhyUs from './components/WhyUs/WhyUs'
import CoffeeMachines from './components/CoffeeMachines/CoffeeMachines'
import AboutUs from './components/AboutUs/AboutUs'
import ContactForm from './components/ContactForm/ContactForm'
import Footer from './components/Footer/Footer'
import Modal from './components/Modal/Modal'
import SuccessModal from './components/SuccessModal/SuccessModal'
import './styles/global.scss'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openSuccessModal = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  return (
    <div className="App">
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <HowItWorks onOpenSuccessModal={openSuccessModal} />
      <WhyUs onOpenModal={openModal} />
      <CoffeeMachines onOpenModal={openModal} onOpenSuccessModal={openSuccessModal} />
      <AboutUs onOpenModal={openModal} />
      <ContactForm onOpenSuccessModal={openSuccessModal} />
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} onSuccess={openSuccessModal} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
}

export default App; 