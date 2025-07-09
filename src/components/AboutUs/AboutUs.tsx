import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.scss';

interface AboutUsProps {
  onOpenModal: () => void;
}

interface CoffeeCard {
  id: number;
  name: string;
  secondName: string;
  description: string;
  image: string;
  details: {
    composition: string;
    country: string;
    roast: string;
    weight?: string;
  };
}

const coffeeData: CoffeeCard[] = [
  {
    id: 1,
    name: "Impassion",
    secondName: "Espresso classic",
    description: "Кофе с абсолютным балансом, во вкусе шоколад, орехи, умеренная, средняя горечь, практически без кислотности.",
    image: "/coffee1.png",
    details: {
      composition: "Кофе зерновой",
      country: "Купаж арабики 60% Робуста 40%",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 2,
    name: "Impassion",
    secondName: "Espresso dark",
    description: "Темная обжарка придает кофе глубокий, насыщенный вкус с нотами темного шоколада и карамели.",
    image: "/coffee2.png",
    details: {
      composition: "Кофе зерновой",
      country: "Купаж арабики 70% Робуста 30%",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 3,
    name: "Impassion",
    secondName: "Молотый",
    description: "Традиционный турецкий кофе с богатым ароматом и плотной текстурой, идеально подходит для утреннего пробуждения.",
    image: "/coffee3.png",
    details: {
      composition: "Кофе молотый",
      country: "100% арабика (Бразилия)",
      roast: "Средняя",
      weight: "100г"
    }
  },
  {
    id: 4,
    name: "Impassion",
    secondName: "Молотый по-турецки",
    description: "Монолитный вкус с насыщенными нотами специй и восточных пряностей.",
    image: "/coffee7.png",
    details: {
      composition: "Кофе молотый",
      country: "100% арабика",
      roast: "Темная",
      weight: "100г"
    }
  },
  {
    id: 5,
    name: "Impassion",
    secondName: "Basic Filter",
    description: "Идеальный кофе для фильтр-кофе с мягким вкусом и деликатной кислинкой.",
    image: "/coffee4.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Светлая",
      weight: "250г"
    }
  },
  {
    id: 6,
    name: "Impassion",
    secondName: "Gold Filter",
    description: "Премиальный кофе с золотистым оттенком и изысканным ароматом.",
    image: "/coffee5.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика (Эфиопия)",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 7,
    name: "Impassion",
    secondName: "Basic",
    description: "Базовый кофе с классическим вкусом и устойчивым ароматом.",
    image: "/coffee6.png",
    details: {
      composition: "Кофе зерновой",
      country: "Купаж арабики 70% Робуста 30%",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 8,
    name: "Impassion",
    secondName: "Basic",
    description: "Свежеобжаренный кофе с яркими фруктовыми нотами и цветочным ароматом.",
    image: "/coffee8.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика (Кения)",
      roast: "Светлая",
      weight: "250г"
    }
  },
  {
    id: 9,
    name: "Impassion",
    secondName: "Fresh",
    description: "Сбалансированный кофе между светлой и темной обжаркой.",
    image: "/coffee9.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 10,
    name: "Impassion",
    secondName: "Fresh Dark",
    description: "Темная обжарка с сохранением свежести и яркости вкуса.",
    image: "/coffee10.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 11,
    name: "Impassion",
    secondName: "Fresh Dark",
    description: "Кофе для активной жизни с бодрящим эффектом и насыщенным вкусом.",
    image: "/coffee11.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 12,
    name: "Impassion",
    secondName: "Life",
    description: "Энергичный кофе для тех, кто ценит качество и вкус.",
    image: "/coffee12.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 13,
    name: "Impassion",
    secondName: "Grand Cru",
    description: "Грандиозный кофе с благородным вкусом и изысканным послевкусием.",
    image: "/coffee13.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика(Бразилия/Эфиопия)",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 14,
    name: "Impassion",
    secondName: "Intenso",
    description: "Интенсивный кофе с глубоким вкусом и стойким ароматом.",
    image: "/coffee14.png",
    details: {
      composition: "Кофе зерновой",
      country: "Купаж арабики и робусты",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 15,
    name: "Impassion",
    secondName: "Aroma",
    description: "Ароматный кофе с нежным вкусом и приятным послевкусием.",
    image: "/coffee15.png",
    details: {
      composition: "Кофе зерновой",
      country: "100% арабика",
      roast: "Светлая",
      weight: "250г"
    }
  },
  {
    id: 16,
    name: "Impassion",
    secondName: "Milk",
    description: "Специально разработан для кофе с молоком, идеальный баланс.",
    image: "/coffee16.png",
    details: {
      composition: "Кофе зерновой",
      country: "Купаж арабики и робусты",
      roast: "Средняя",
      weight: "250г"
    }
  },
  {
    id: 17,
    name: "Impassion",
    secondName: "Blue Espresso",
    description: "Насыщенный кофе с нотами миндаля, ванили, темного шоколада и персика.",
    image: "/coffee17.png",
    details: {
      composition: "100% арабика",
      country: "Бразилия/Эфиопия/Гватемала",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 18,
    name: "Impassion",
    secondName: "Blue Espresso",
    description: "Премиальный эспрессо с богатым вкусом и плотной текстурой.",
    image: "/coffee18.png",
    details: {
      composition: "100% арабика",
      country: "Бразилия/Эфиопия/Гватемала",
      roast: "Темная",
      weight: "250г"
    }
  },
  {
    id: 19,
    name: "Impassion",
    secondName: "Blue Espresso",
    description: "Классический эспрессо с итальянскими традициями обжарки.",
    image: "/coffee19.png",
    details: {
      composition: "100% арабика",
      country: "Бразилия/Эфиопия/Гватемала",
      roast: "Темная",
      weight: "250г"
    }
  }
];

const AboutUs: React.FC<AboutUsProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCoffeeIndex, setCurrentCoffeeIndex] = useState(0);
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

  const handlePrevCoffee = () => {
    // Отправляем цель в Яндекс.Метрику
    if (window.ym) {
      window.ym(102940459, 'reachGoal', 'coffee_navigation_click');
      console.log('☕ Яндекс цель отправлена: coffee_navigation_click');
    }
    setCurrentCoffeeIndex((prev) => (prev === 0 ? coffeeData.length - 1 : prev - 1));
  };

  const handleNextCoffee = () => {
    // Отправляем цель в Яндекс.Метрику
    if (window.ym) {
      window.ym(102940459, 'reachGoal', 'coffee_navigation_click');
      console.log('☕ Яндекс цель отправлена: coffee_navigation_click');
    }
    setCurrentCoffeeIndex((prev) => (prev === coffeeData.length - 1 ? 0 : prev + 1));
  };

  const handleTastingClick = () => {
    // Отправляем цель в Яндекс.Метрику
    if (window.ym) {
      window.ym(102940459, 'reachGoal', 'tasting_button_click');
      window.ym(102940459, 'reachGoal', 'modal_open');
      console.log('🎯 Яндекс цели отправлены: tasting_button_click, modal_open');
    }
    onOpenModal();
  };

  const handleSignupClick = () => {
    // Отправляем цель в Яндекс.Метрику
    if (window.ym) {
      window.ym(102940459, 'reachGoal', 'signup_button_click');
      window.ym(102940459, 'reachGoal', 'modal_open');
      console.log('🎯 Яндекс цели отправлены: signup_button_click, modal_open');
    }
    onOpenModal();
  };

  const currentCoffee = coffeeData[currentCoffeeIndex];

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
          {/* Левый блок с кофе - теперь с каруселью */}
          <div className="about-us__coffee-block">
            <div className="about-us__coffee-image">
              <img 
                src={currentCoffee.image} 
                alt={`${currentCoffee.name} ${currentCoffee.secondName}`} 
                loading="lazy" 
                width="280" 
                height="280" 
              />
            </div>
            
            <div className="about-us__coffee-info">
              <div className="about-us__coffee-title-row">
                <button 
                  className="about-us__nav-button about-us__nav-button--prev"
                  onClick={handlePrevCoffee}
                  aria-label="Предыдущий кофе"
                >
                  <img src="/Icon2_2.svg" alt="" width="20" height="20" />
                </button>
                
                <div className="about-us__coffee-title">
                  <h3 className="about-us__coffee-main-name">{currentCoffee.name}</h3>
                  <h4 className="about-us__coffee-second-name">{currentCoffee.secondName}</h4>
                </div>
                
                <button 
                  className="about-us__nav-button about-us__nav-button--next"
                  onClick={handleNextCoffee}
                  aria-label="Следующий кофе"
                >
                  <img src="/Icon1_1.svg" alt="" width="20" height="20" />
                </button>
              </div>
              
              <p className="about-us__coffee-description">
                {currentCoffee.description}
              </p>
              <div className="about-us__coffee-details">
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Формат:</span>
                  <span className="about-us__detail-value">{currentCoffee.details.composition}</span>
                </div>
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Состав:</span>
                  <span className="about-us__detail-value">{currentCoffee.details.country}</span>
                </div>
                <div className="about-us__detail">
                  <span className="about-us__detail-label">Обжарка:</span>
                  <span className="about-us__detail-value">{currentCoffee.details.roast}</span>
                </div>
              </div>
            </div>

            <div className="about-us__coffee-footer">
              {/* Убираем счетчик страниц */}
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
            <button className="about-us__tasting-button" onClick={handleTastingClick}>
              Попробуйте бесплатно
            </button>
            <h3 className="about-us__tasting-title">
              Приглашаем<br />
              на дегустацию<br />
              в шоурум
            </h3>
            <button className="about-us__signup-button" onClick={handleSignupClick}>
              Записаться на дегустацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 