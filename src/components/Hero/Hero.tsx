import React, { useState, useEffect } from 'react';
import './Hero.scss';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Запускаем анимации после монтирования компонента
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Обработчик для иконки "Подобрать кофемашину"
  const handleTopRightIconClick = () => {
    onOpenModal();
  };

  return (
    <section className={`hero ${isVisible ? 'hero--visible' : ''}`}>
      <div className="container hero__container">
        <div className="hero__left">
          <div className="hero__video-block">
            <video
              className="hero__video"
              src="/wmf-pcm_homecard_masteranimation_desktop_3-2_60fps_dark-bg_1920x1280.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/design_layout/header_frame_1.png"
            />
            <div className="hero__overlay">
              <div className="hero__title">
                <span className="hero__title-line">КОФЕ МАШИНА</span><br />
                <span className="hero__title-bold hero__title-line">БЕСПЛАТНО</span>
              </div>
              <div className="hero__subtitle">
                — это простой способ повысить уровень сервиса и сэкономить на оборудовании
              </div>
              <div className="hero__actions">
                <button className="hero__button" onClick={onOpenModal}>Оставить заявку</button>
                <div className="hero__contacts">
                  <span className="hero__phone">+7 (909) 945-76-04</span>
                  <span className="hero__email">coffee_rent@alephtrade.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__right">
          <div className="hero__card hero__card--iconblock hero__card--top hero__card--1">
            <div className="hero__iconblock">
              <img src="/star.svg" alt="Проф. оборудование" className="hero__icon" />
            </div>
            <div className="hero__card-title hero__card-title--dark">Профессиональное<br />оборудование</div>
          </div>
          <div className="hero__card hero__card--iconblock hero__card--2">
            <div className="hero__iconblock">
              <img src="/installation.svg" alt="Сервис" className="hero__icon" />
            </div>
            <div className="hero__card-title hero__card-title--dark">Установка и сервис<br />— за наш счёт</div>
          </div>
          <div className="hero__card hero__card--blue hero__card--iconblock hero__card--bottom hero__card--3">
            <div
              className="hero__iconblock hero__iconblock--topright"
              onClick={handleTopRightIconClick}
              style={{ cursor: 'pointer' }}
              title="Подобрать кофемашину"
            >
              <img src="/arrow-sm-diagonally.svg" alt="Подобрать кофемашину" className="hero__icon" />
            </div>
            <div className="hero__card-title hero__card-title--white">Подобрать кофемашину<br />— под ваш бизнес</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;