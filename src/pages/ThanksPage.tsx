import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './ThanksPage.scss';

const ThanksPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToSite = () => {
    navigate('/');
  };

  const handleOpenModal = () => {
    // На странице благодарности модальное окно не нужно, просто возвращаемся на главную
    navigate('/');
  };

  return (
    <div className="thanks-page-wrapper">
      <Header onOpenModal={handleOpenModal} />
      <div className="thanks-page">
        <div className="thanks-page__container">
          <div className="thanks-page__content">
            <div className="thanks-page__icon">
              <img src="/Featured_icon.svg" alt="Успешно" className="thanks-page__featured-icon" />
            </div>
            
            <h1 className="thanks-page__title">Заявка принята</h1>
            
            <p className="thanks-page__description">
              Мы свяжемся с вами в ближайшее время — специалист уточнит детали,<br />
              подберёт зерно и согласует формат дегустации.
            </p>
            
            <button className="thanks-page__button" onClick={handleReturnToSite}>
              Вернуться на сайт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage; 