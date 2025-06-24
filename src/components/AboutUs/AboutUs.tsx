import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.scss';

interface AboutUsProps {
  onOpenModal: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setIsVisible(true);
        }
      },
      {
        threshold: [0.1, 0.2, 0.3],
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="coffee-types" className={`about-us ${isVisible ? 'about-us--visible' : ''}`} ref={sectionRef}>
      <div className="about-us__container">
        <h2 className="about-us__title">
          Мы поставляем не просто кофе.
        </h2>
        <p className="about-us__subtitle">
          А тот, который действительно работает на ваш бизнес.
        </p>

        <div className="about-us__content">
          {/* Левый блок с кофе */}
          <div className="about-us__coffee-block">
            <div className="about-us__coffee-image">
              <img src="/coffee.png" alt="Кофе" loading="lazy" width="200" height="200" />
            </div>
            <div className="about-us__coffee-info">
              <h3>Impassion Blue Espresso</h3>
              <p className="about-us__coffee-description">
                Насыщенный кофе с нотами миндаля, ванили, темного шоколада и персика. 
                Тело плотное и сливочное. Долгое послевкусие отличается от...
              </p>
              <div className="about-us__coffee-details">
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Состав:</span>
                  <span className="about-us__detail-value">100% арабика</span>
                </div>
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Страна:</span>
                  <span className="about-us__detail-value">Бразилия/Эфиопия/Гватемала</span>
                </div>
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Обжарка:</span>
                  <span className="about-us__detail-value">Темная</span>
                </div>
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Объем:</span>
                  <span className="about-us__detail-value">1 кг</span>
                </div>
              </div>
            </div>
          </div>

          {/* Видео блок */}
          <div className="about-us__video-block">
            <div className="about-us__video-container">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="about-us__video"
              >
                <source src="/wmf-pcm_homecard_masteranimation_desktop_3-2_60fps_dark-bg_1920x1280.mp4" type="video/mp4" />
              </video>
              <div className="about-us__video-overlay">
                <h3 className="about-us__video-title">Наш кофе</h3>
                <p className="about-us__video-subtitle">— собственная обжарка<br />и стабильное качество</p>
              </div>
            </div>
          </div>

          {/* Блок статистики */}
          <div className="about-us__stats-block">
            <div className="about-us__stat-number">20+</div>
            <div className="about-us__stat-text">лет на рынке B2B</div>
            <div className="about-us__stat-tags">
              <span className="about-us__tag about-us__tag--active">Вкусно</span>
              <span className="about-us__tag">вернутся</span>
            </div>
            <div className="about-us__stat-tags">
              <span className="about-us__tag about-us__tag--active">Настройка под ЦА</span>
              <span className="about-us__tag">выше чек</span>
            </div>
            <div className="about-us__stat-tags">
              <span className="about-us__tag about-us__tag--active">Концентрация вкуса</span>
              <span className="about-us__tag">выше маржинальность</span>
            </div>
          </div>

          {/* Блок партнеров */}
          <div className="about-us__partners-block">
            <div className="about-us__partners-image">
              <img src="/partners.png" alt="Партнеры" loading="lazy" width="300" height="80" />
            </div>
            <div className="about-us__partners-content">
              <h3 className="about-us__partners-title">
                Наши клиенты<br />
                — с кем уже работаем
              </h3>
              <p className="about-us__partners-text">
                Раньше сами закупали зерно — часто вкус прыгал. 
                Сейчас всё стабильно: вкус держится, клиенты 
                довольны, а баристы — спокойны.
              </p>
            </div>
          </div>

          {/* Блок дегустации */}
          <div className="about-us__tasting-block">
            <button className="about-us__tasting-button" onClick={onOpenModal}>
              Попробуйте бесплатно
            </button>
            <h3 className="about-us__tasting-title">
              Приглашаем<br />
              на дегустацию<br />
              в шоурум
            </h3>
            <button className="about-us__signup-button" onClick={onOpenModal}>
              Записаться на дегустацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 