import React, { useState, useEffect, useRef } from 'react';
import HowItWorksForm from '../HowItWorks/HowItWorksForm';
import './CoffeeMachines.scss';

interface CoffeeMachine {
  id: string;
  name: string;
  description: string;
  cups: string;
  groups: string;
  image: string;
}

const CoffeeMachines: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classic' | 'automatic'>('classic');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideWidth, setSlideWidth] = useState(320);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (window.innerWidth <= 768) {
        setSlideWidth(window.innerWidth - 32); // Полная ширина минус отступы
      } else if (window.innerWidth <= 1024) {
        setSlideWidth(256); // 240px + 16px gap
      } else {
        setSlideWidth(360); // 340px + 20px gap
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);

    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Сброс слайда при смене таба
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const classicMachines: CoffeeMachine[] = [
    {
      id: '1',
      name: 'Rancilio Classe 5 USB',
      description: 'Однокотловая эспрессо-машина, доступная в вариантах 1, 2, 3 группы или 2 группы компактно (2GRC). Все версии оснащены автоматическим дозированием (USB). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '1GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_USB.png'
    },
    {
      id: '2',
      name: 'Rancilio Classe 5 USB Tall',
      description: 'Однокотловая эспрессо-машина, доступная в вариантах 1, 2, 3 группы или 2 группы компактно (2GRC). Все версии оснащены автоматическим дозированием (USB). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '2GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_USB_Tall.png'
    },
    {
      id: '3',
      name: 'Rancilio Classe 5 S',
      description: 'Однокотловая эспрессо-кофемашина доступна в версиях с 1, 2, 3 группами, 1 группе с резервуаром (1GRT), 2 группы компактные (2GRC). Все версии оснащены полуавтоматическим дозированием (S). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '2GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_S.png'
    },
    {
      id: '4',
      name: 'Rancilio Classe 5 S Tall',
      description: 'Высокая версия машины с увеличенным клиренсом для больших чашек. Обеспечивает стабильное качество напитков в течение всего дня.',
      cups: '150 чашек',
      groups: '1GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_S_Tall.png'
    }
  ];

  const automaticMachines: CoffeeMachine[] = [
    {
      id: '5',
      name: 'WMF 1300 S',
      description: 'Премиальная суперавтоматическая машина с сенсорным дисплеем и возможностью приготовления различных напитков. Встроенная система очистки и обслуживания.',
      cups: '300 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_1300_S.png'
    },
    {
      id: '6',
      name: 'WMF 1100 S',
      description: 'Профессиональная автоматическая машина с двумя кофемолками и системой Fresh Brew. Идеальна для офисов и ресторанов с высокой проходимостью.',
      cups: '400 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_1100_S.png'
    },
    {
      id: '7',
      name: 'WMF 950 S',
      description: 'Компактная автоматическая машина с интуитивным управлением и системой самоочистки. Быстрое приготовление качественных напитков одним нажатием.',
      cups: '250 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_950_S.png'
    },
    {
      id: '8',
      name: 'K96L Black',
      description: 'Инновационная машина с современным дизайном и автоматической калибровкой. Обеспечивает постоянное качество напитков.',
      cups: '350 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/k96L_black.png'
    }
  ];

  const currentMachines = activeTab === 'classic' ? classicMachines : automaticMachines;
  const maxSlide = Math.max(0, currentMachines.length - 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollbarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newSlide = Math.round(percentage * maxSlide);
    setCurrentSlide(Math.max(0, Math.min(newSlide, maxSlide)));
  };

  return (
    <section className={`coffee-machines ${isVisible ? 'coffee-machines--visible' : ''}`} ref={sectionRef}>
      <div className="coffee-machines__container">
        <div className="coffee-machines__header">
          <h2 className="coffee-machines__title">
            Выберите кофемашину под ваш бизнес
          </h2>
        </div>

        <div className="coffee-machines__tabs">
          <button 
            className={`coffee-machines__tab ${activeTab === 'classic' ? 'coffee-machines__tab--active' : ''}`}
            onClick={() => setActiveTab('classic')}
          >
            Классические машины
          </button>
          <button 
            className={`coffee-machines__tab ${activeTab === 'automatic' ? 'coffee-machines__tab--active' : ''}`}
            onClick={() => setActiveTab('automatic')}
          >
            Супер автоматические
          </button>
        </div>

        <div className="coffee-machines__slider">
          <div className="coffee-machines__slides">
            <div className="coffee-machines__track">
              {currentMachines.slice(currentSlide, currentSlide + 3).map((machine, index) => (
                <div 
                  key={machine.id} 
                  className="coffee-machines__slide"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="coffee-machines__card">
                    <div className="coffee-machines__card-badge">
                      {machine.groups}
                    </div>
                    
                    <div className="coffee-machines__card-image">
                      <img src={machine.image} alt={machine.name} />
                    </div>
                    
                    <div className="coffee-machines__card-content">
                      <h3 className="coffee-machines__card-title">
                        {machine.name}
                      </h3>
                      
                      <p className="coffee-machines__card-description">
                        {machine.description}
                      </p>
                      
                      <div className="coffee-machines__card-footer">
                        <div className="coffee-machines__card-cups">
                          {machine.cups}
                        </div>
                        
                        <button className="coffee-machines__card-button">
                          Характеристики
                          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {currentMachines.length > 3 && (
            <div className="coffee-machines__scrollbar">
              <div 
                className="coffee-machines__scrollbar-track"
                onClick={handleScrollbarClick}
              >
                <div 
                  className="coffee-machines__scrollbar-thumb"
                  style={{ 
                    width: `${(3 / currentMachines.length) * 100}%`,
                    left: `${(currentSlide / (currentMachines.length - 3)) * (100 - (3 / currentMachines.length) * 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="coffee-machines__form">
          <HowItWorksForm />
        </div>
      </div>
    </section>
  );
};

export default CoffeeMachines; 