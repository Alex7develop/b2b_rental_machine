import React, { useState } from 'react';
import './Header.scss';

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__content">
          <div className="header__logo-block">
            <img src="/featherIcon.svg" alt="Логотип" className="header__logo-icon" />
            <img src="/Alephtrade.svg" alt="Алеф Трейд" className="header__logo-text" />
          </div>
          
          {/* Десктопная навигация */}
          <nav className="header__nav header__nav--desktop">
            <a href="#" className="header__nav-link header__nav-link--active">Главная</a>
            <a href="#steps" className="header__nav-link">Этапы</a>
            <a href="#goal" className="header__nav-link">Наша цель</a>
            <a href="#catalog" className="header__nav-link">Каталог</a>
            <a href="#coffee-types" className="header__nav-link">Виды кофе</a>
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
            <a href="#" className="header__mobile-link header__mobile-link--active" onClick={closeMenu}>Главная</a>
            <a href="#steps" className="header__mobile-link" onClick={closeMenu}>Этапы</a>
            <a href="#goal" className="header__mobile-link" onClick={closeMenu}>Наша цель</a>
            <a href="#catalog" className="header__mobile-link" onClick={closeMenu}>Каталог</a>
            <a href="#coffee-types" className="header__mobile-link" onClick={closeMenu}>Виды кофе</a>
          </nav>
          <button className="header__mobile-cta" onClick={handleModalOpen}>Оставить заявку</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 