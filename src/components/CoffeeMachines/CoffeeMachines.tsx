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
  height: string;
  boilerVolume: string;
  control: string;
  dimensions: string;
  cupsPerDay?: number;
}

interface CoffeeMachinesProps {
  onOpenModal: () => void;
  onOpenSuccessModal: () => void;
}

const CoffeeMachines: React.FC<CoffeeMachinesProps> = ({ onOpenModal, onOpenSuccessModal }) => {
  const [classicSlide, setClassicSlide] = useState(0);
  const [automaticSlide, setAutomaticSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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

  const classicMachines: CoffeeMachine[] = [
    {
      id: '1',
      name: 'Rancilio Classe 5 USB',
      description: 'Однокотловая эспрессо-машина, доступная в вариантах 1, 2, 3 группы или 2 группы компактно (2GRC). Все версии оснащены автоматическим дозированием (USB). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '1GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_USB.png',
      height: 'Низкая',
      boilerVolume: '4 литра',
      control: 'Автомат',
      dimensions: '410 / 540 / 52 мм / 35 кг.'
    },
    {
      id: '2',
      name: 'Rancilio Classe 5 Leva',
      description: 'Высокая версия машины с увеличенным клиренсом для больших чашек.',
      cups: '150 чашек',
      groups: '2GR',
      image: '/img/classic_macmine/leva.svg',
      height: 'Высокая',
      boilerVolume: '11 литров',
      control: 'Левер',
      dimensions: '770 / 540 / 809 мм / 71 кг.'
    },
    {
      id: '3',
      name: 'Rancilio Classe 5 S',
      description: 'Однокотловая эспрессо-кофемашина доступна в версиях с 1, 2, 3 группами, 1 группе с резервуаром (1GRT), 2 группы компактные (2GRC). Все версии оснащены полуавтоматическим дозированием (S). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '2GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_S.png',
      height: 'Низкая',
      boilerVolume: '11 литров',
      control: 'Полу-автомат',
      dimensions: '771 / 539 / 520 мм / 74 кг.'
    },
    {
      id: '4',
      name: 'Rancilio Classe 5 USB Tall',
      description: 'Однокотловая эспрессо-машина, доступная в вариантах 1, 2, 3 группы или 2 группы компактно (2GRC). Все версии оснащены автоматическим дозированием (USB). Технология Steady Brew (SB) доступна для...',
      cups: '120 чашек',
      groups: '2GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_USB_Tall.png',
      height: 'Высокая',
      boilerVolume: '6 литров',
      control: 'Автомат',
      dimensions: '410 / 640 / 52 мм / 38 кг.'
    },
    {
      id: '5',
      name: 'Rancilio Classe 5 S Tall',
      description: 'Высокая версия машины с увеличенным клиренсом для больших чашек. Обеспечивает стабильное качество напитков в течение всего дня.',
      cups: '150 чашек',
      groups: '1GR',
      image: '/img/classic_macmine/Rancilio_Classe_5_S_Tall.png',
      height: 'Высокая',
      boilerVolume: '4 литра',
      control: 'Полуавтомат',
      dimensions: '410 / 640 / 52 мм / 37 кг.'
    }
  ];

  const automaticMachines: CoffeeMachine[] = [
    {
      id: '6',
      name: 'WMF 950 S',
      description: 'Компактная автоматическая машина с интуитивным управлением и системой самоочистки. Быстрое приготовление качественных напитков одним нажатием.',
      cups: '250 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_950_S.png',
      height: 'Есть',
      boilerVolume: 'Прямое водоснабжение',
      control: '21',
      dimensions: '303 / 562 / 528 мм',
      cupsPerDay: 50
    },
    {
      id: '7',
      name: 'WMF 1100 S',
      description: 'Профессиональная автоматическая машина с двумя кофемолками и системой Fresh Brew. Идеальна для офисов и ресторанов с высокой проходимостью.',
      cups: '400 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_1100_S.png',
      height: 'Basic Milk / Basic Steam',
      boilerVolume: 'бак 4,5 л + водопровод',
      control: '24',
      dimensions: '325 / 561 / 500 мм',
      cupsPerDay: 80
    },
    {
      id: '8',
      name: 'WMF 1300 S',
      description: 'Премиальная суперавтоматическая машина с сенсорным дисплеем и возможностью приготовления различных напитков. Встроенная система очистки и обслуживания.',
      cups: '300 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/WMF_1300_S.png',
      height: 'Basic Milk',
      boilerVolume: 'Бак 4л + водопровод',
      control: '50',
      dimensions: '325 / 574 / 670 мм',
      cupsPerDay: 120
    },
    {
      id: '9',
      name: 'K96L Black',
      description: 'Инновационная машина с современным дизайном и автоматической калибровкой. Обеспечивает постоянное качество напитков.',
      cups: '350 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/k96L_black.png',
      height: 'Есть',
      boilerVolume: 'Бак 6л + водопровод',
      control: '20',
      dimensions: '580 / 530 / 700 мм',
      cupsPerDay: 120
    },
    {
      id: '10',
      name: 'WMF 1300 S Premium',
      description: 'Инновационная машина с современным дизайном и автоматической калибровкой. Обеспечивает постоянное качество напитков.',
      cups: '250 чашек',
      groups: 'AUTO',
      image: '/img/automat_machine/1300S.png',
      height: 'Есть',
      boilerVolume: 'Бак 6л + водопровод',
      control: '20',
      dimensions: '580 / 530 / 700 мм',
      cupsPerDay: 120
    }
  ];

  const visibleCards = isMobile ? 1 : 3;
  const classicMaxSlide = Math.max(0, classicMachines.length - visibleCards);
  const automaticMaxSlide = Math.max(0, automaticMachines.length - visibleCards);

  const handleScrollbarClick = (event: React.MouseEvent<HTMLDivElement>, machineType: 'classic' | 'automatic') => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const maxSlide = machineType === 'classic' ? classicMaxSlide : automaticMaxSlide;
    const newSlide = Math.round(percentage * maxSlide);
    
    if (machineType === 'classic') {
      setClassicSlide(Math.max(0, Math.min(newSlide, classicMaxSlide)));
    } else {
      setAutomaticSlide(Math.max(0, Math.min(newSlide, automaticMaxSlide)));
    }
  };

  const handleCardButtonClick = () => {
    // Отправляем цель в Яндекс.Метрику
    if (window.ym) {
      window.ym(102940459, 'reachGoal', 'coffee_machine_card_button_click');
      window.ym(102940459, 'reachGoal', 'modal_open');
      console.log('🎯 Яндекс цели отправлены: coffee_machine_card_button_click, modal_open');
    }
    onOpenModal();
  };

  const renderMachineSection = (
    machines: CoffeeMachine[], 
    currentSlide: number, 
    title: string,
    machineType: 'classic' | 'automatic'
  ) => {
    return (
      <div className="coffee-machines__section">
        <div className="coffee-machines__section-header">
          <h3 className="coffee-machines__section-title">{title}</h3>
        </div>

        <div className="coffee-machines__slider">
          <div className="coffee-machines__slides">
            <div 
              className="coffee-machines__track"
              style={isMobile ? {
                transform: `translateX(-${currentSlide * 100}vw)`,
                width: `${machines.length * 100}vw`
              } : {}}
            >
              {(isMobile ? machines : machines.slice(currentSlide, currentSlide + visibleCards)).map((machine, index) => (
                <div 
                  key={machine.id} 
                  className="coffee-machines__slide"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="coffee-machines__card">
                    <div className="coffee-machines__card-image-container">
                      <div className="coffee-machines__card-badge">
                        {machine.groups === '1GR' && <img src="/1gr.png" alt="1GR" />}
                        {machine.groups === '2GR' && <img src="/2gr.png" alt="2GR" />}
                        {machine.groups === 'AUTO' && machine.cupsPerDay && (
                          <img src={`/${machine.cupsPerDay}cup.png`} alt={`до ${machine.cupsPerDay} чашек`} />
                        )}
                        {machine.groups === 'AUTO' && !machine.cupsPerDay && <span>AUTO</span>}
                      </div>
                      
                      <div className="coffee-machines__card-image">
                        <img src={machine.image} alt={machine.name} />
                      </div>
                    </div>
                    
                    <div className="coffee-machines__card-content">
                      <h4 className="coffee-machines__card-title">
                        {machine.name}
                      </h4>
                      
                      <div className="coffee-machines__card-specs">
                        {machineType === 'classic' ? (
                          <>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Высота групп:</span>
                              <span className="coffee-machines__card-spec-value">{machine.height}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Объем бойлера:</span>
                              <span className="coffee-machines__card-spec-value">{machine.boilerVolume}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Управление:</span>
                              <span className="coffee-machines__card-spec-value">{machine.control}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Габариты (ш.г.в.):</span>
                              <span className="coffee-machines__card-spec-value">{machine.dimensions}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Автокапучинатор:</span>
                              <span className="coffee-machines__card-spec-value">{machine.height}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Тип подключения:</span>
                              <span className="coffee-machines__card-spec-value">{machine.boilerVolume}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Кол-во рецептов:</span>
                              <span className="coffee-machines__card-spec-value">{machine.control}</span>
                            </div>
                            <div className="coffee-machines__card-spec">
                              <span className="coffee-machines__card-spec-label">Габариты (ш.г.в.):</span>
                              <span className="coffee-machines__card-spec-value">{machine.dimensions}</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <button className="coffee-machines__card-button" onClick={handleCardButtonClick}>
                        Заказать
                        <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {machines.length > visibleCards && (
            <div className="coffee-machines__scrollbar">
              <div 
                className="coffee-machines__scrollbar-track"
                onClick={(e) => handleScrollbarClick(e, machineType)}
              >
                <div 
                  className="coffee-machines__scrollbar-thumb"
                  style={{ 
                    width: `${(visibleCards / machines.length) * 100}%`,
                    left: `${(currentSlide / (machines.length - visibleCards)) * (100 - (visibleCards / machines.length) * 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="catalog" className={`coffee-machines ${isVisible ? 'coffee-machines--visible' : ''}`} ref={sectionRef}>
      <div className="coffee-machines__container">
        {renderMachineSection(
          classicMachines, 
          classicSlide, 
          'Выберите классическую кофемашину',
          'classic'
        )}

        {renderMachineSection(
          automaticMachines, 
          automaticSlide, 
          'Выберите супер автоматическую кофемашину',
          'automatic'
        )}

        <div className="coffee-machines__form">
          <HowItWorksForm onOpenSuccessModal={onOpenSuccessModal} />
        </div>
      </div>
    </section>
  );
};

export default CoffeeMachines; 