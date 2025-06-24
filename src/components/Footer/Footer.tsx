import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <img src="/AL.svg" alt="Алеф Трейд" className="footer__logo-icon" loading="lazy" />
            {/* <img src="/Alephtrade.svg" alt="Alephtrade" className="footer__logo-text" loading="lazy" width="80" height="20" /> */}
          </div>
          
          <div className="footer__info">
            <div className="footer__copyright">
              © 2025 Alephtrade.<br />
              Все права защищены
            </div>
            
            <div className="footer__privacy">
              <a href="/privacy" className="footer__privacy-link">
                Политика<br />
                конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 