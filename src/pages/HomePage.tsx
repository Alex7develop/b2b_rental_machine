import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import WhyUs from '../components/WhyUs/WhyUs';
import CoffeeMachines from '../components/CoffeeMachines/CoffeeMachines';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';
import Modal from '../components/Modal/Modal';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleSuccess = () => {
    setIsModalOpen(false);
    navigate('/thanks');
  };

  return (
    <div className="App">
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <HowItWorks onOpenSuccessModal={handleSuccess} />
      <WhyUs onOpenModal={openModal} />
      <CoffeeMachines onOpenModal={openModal} onOpenSuccessModal={handleSuccess} />
      <AboutUs onOpenModal={openModal} />
      <ContactForm onOpenSuccessModal={handleSuccess} />
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} onSuccess={handleSuccess} />
    </div>
  );
};

export default HomePage; 