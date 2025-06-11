import React, { useState, useEffect } from 'react';
import './Header.scss';

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleModalOpen = () => {
    onOpenModal();
    closeMenu();
  };

  // Функция для плавной прокрутки к разделу
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  // Функция для клика по логотипу
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['steps', 'goal', 'catalog', 'coffee-types'];
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition < 200) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем сразу для установки начального состояния

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__content">
          <div className="header__logo-block" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/featherIcon.svg" alt="Логотип" className="header__logo-icon" />
            <img src="/Alephtrade.svg" alt="Алеф Трейд" className="header__logo-text" />
          </div>
          
          {/* Десктопная навигация */}
          <nav className="header__nav header__nav--desktop">
            <button className={`header__nav-link ${activeSection === 'home' ? 'header__nav-link--active' : ''}`} onClick={() => scrollToSection('home')}>Главная</button>
            <button className={`header__nav-link ${activeSection === 'steps' ? 'header__nav-link--active' : ''}`} onClick={() => scrollToSection('steps')}>Этапы</button>
            <button className={`header__nav-link ${activeSection === 'goal' ? 'header__nav-link--active' : ''}`} onClick={() => scrollToSection('goal')}>Наша цель</button>
            <button className={`header__nav-link ${activeSection === 'catalog' ? 'header__nav-link--active' : ''}`} onClick={() => scrollToSection('catalog')}>Каталог</button>
            <button className={`header__nav-link ${activeSection === 'coffee-types' ? 'header__nav-link--active' : ''}`} onClick={() => scrollToSection('coffee-types')}>Виды кофе</button>
          </nav>
          
          {/* Десктопная кнопка */}
          <button className="header__cta header__cta--desktop" onClick={onOpenModal}>Оставить заявку</button>
          
          {/* Бургер кнопка */}
          <button 
            className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        {/* Мобильное меню */}
        <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
          <nav className="header__mobile-nav">
            <button className={`header__mobile-link ${activeSection === 'home' ? 'header__mobile-link--active' : ''}`} onClick={() => scrollToSection('home')}>Главная</button>
            <button className={`header__mobile-link ${activeSection === 'steps' ? 'header__mobile-link--active' : ''}`} onClick={() => scrollToSection('steps')}>Этапы</button>
            <button className={`header__mobile-link ${activeSection === 'goal' ? 'header__mobile-link--active' : ''}`} onClick={() => scrollToSection('goal')}>Наша цель</button>
            <button className={`header__mobile-link ${activeSection === 'catalog' ? 'header__mobile-link--active' : ''}`} onClick={() => scrollToSection('catalog')}>Каталог</button>
            <button className={`header__mobile-link ${activeSection === 'coffee-types' ? 'header__mobile-link--active' : ''}`} onClick={() => scrollToSection('coffee-types')}>Виды кофе</button>
          </nav>
          <button className="header__mobile-cta" onClick={handleModalOpen}>Оставить заявку</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 