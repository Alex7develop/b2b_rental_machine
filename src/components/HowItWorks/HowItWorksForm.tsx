import React from 'react';
import './HowItWorksForm.scss';

const HowItWorksForm: React.FC = () => {
  return (
    <div className="howitworksform-block">
      <div className="howitworksform-phonebar">
        <span>+7 (909) 945-76-04</span>
      </div>
      <div className="howitworksform-content">
        <div className="howitworksform-title">Попробуйте кофе,<br />который клиенты запомнят</div>
        <div className="howitworksform-desc">
          Оставьте заявку — подберем зерно и пригласим на дегустацию под ваш формат бизнеса
        </div>
        <form className="howitworksform-form">
          <input type="text" placeholder="Введите ваше имя" className="howitworksform-input" />
          <input type="tel" placeholder="Введите ваш телефон" className="howitworksform-input" />
          <input type="email" placeholder="Введите вашу почту" className="howitworksform-input" />
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