import React, { useState, useEffect, useRef } from 'react';
import './HowItWorksForm.scss';

const HowItWorksForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`howitworksform-block ${isVisible ? 'howitworksform-block--visible' : ''}`} ref={formRef}>
      <div className="howitworksform-phonebar">
        <span>+7 (909) 945-76-04</span>
      </div>
      <div className="howitworksform-content">
        <div className="howitworksform-title">Попробуйте кофе,<br />который клиенты запомнят</div>
        <div className="howitworksform-desc">
          Оставьте заявку — подберем зерно и пригласим на дегустацию под ваш формат бизнеса
        </div>
        <form className="howitworksform-form">
          <input type="text" placeholder="Введите ваше имя" className="howitworksform-input howitworksform-input--1" />
          <input type="tel" placeholder="Введите ваш телефон" className="howitworksform-input howitworksform-input--2" />
          <input type="email" placeholder="Введите вашу почту" className="howitworksform-input howitworksform-input--3" />
          <button type="submit" className="howitworksform-submit">
            Записаться на дегустацию
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 5L12 10L7 15" stroke="#273889" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>
        <div className="howitworksform-policy">
          <input type="checkbox" id="policy" />
          <label htmlFor="policy">Я согласен на обработку персональных данных. <a href="#">Политика конфиденциальности</a></label>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksForm; 