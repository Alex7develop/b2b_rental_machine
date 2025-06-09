import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo-block">
          <img src="/featherIcon.svg" alt="Логотип" className="header__logo-icon" />
          <img src="/Alephtrade.svg" alt="Алеф Трейд" className="header__logo-text" />
        </div>
        <nav className="header__nav">
          <a href="#" className="header__nav-link header__nav-link--active">Главная</a>
          <a href="#steps" className="header__nav-link">Этапы</a>
          <a href="#goal" className="header__nav-link">Наша цель</a>
          <a href="#catalog" className="header__nav-link">Каталог</a>
          <a href="#coffee-types" className="header__nav-link">Виды кофе</a>
        </nav>
        <button className="header__cta">Оставить заявку</button>
      </div>
    </header>
  );
};

export default Header; 