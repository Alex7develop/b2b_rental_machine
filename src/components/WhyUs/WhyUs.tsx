import React, { useEffect, useRef, useState } from 'react';
import './WhyUs.scss';

interface WhyUsProps {
  onOpenModal: () => void;
}

const WhyUs: React.FC<WhyUsProps> = ({ onOpenModal }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2) {
          setIsCollapsed(false);
        } else {
          setIsCollapsed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Оборудование, установка и обслуживание — бесплатно.',
      description: 'Вы платите только за кофе.'
    },
    {
      number: '02', 
      title: 'Мы подбираем кофемашину, доставляем, подключаем',
      description: 'и сами занимаемся обслуживанием.'
    },
    {
      number: '03',
      title: 'Премиальный кофе и профессиональная техника помогают',
      description: 'улучшить клиентский опыт и лояльность.'
    },
    {
      number: '04',
      title: 'Кофемашины и зерно подбираются с учётом вашего бизнеса:',
      description: 'кафе, отель, офис, фуд-холл — всё учтем.'
    }
  ];

  return (
    <section id="goal" className="why-us" ref={sectionRef}>
      <div className="why-us__container">
        <div className="why-us__header">
          <h2 className="why-us__title">
            Наша цель — обеспечить вам качественный кофе, избавить вас от затрат на оборудование
          </h2>
        </div>

        <div className="why-us__content">
          <div className="why-us__image">
            <img src="/wooman_image.png" alt="Довольная клиентка с кофе" />
          </div>
          
          <div className="why-us__steps-wrapper">
            <div className={`why-us__steps ${isCollapsed ? 'why-us__steps--collapsed' : ''}`}>
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`why-us__step ${!isCollapsed ? 'why-us__step--expanded' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="why-us__step-number">{step.number}</div>
                  <div className="why-us__step-content">
                    <div className="why-us__step-title">{step.title}</div>
                    <div className="why-us__step-description">{step.description}</div>
                  </div>
                </div>
              ))}
              
              <div className={`why-us__cta ${!isCollapsed ? 'why-us__cta--expanded' : ''}`}
                   style={{ 
                     transitionDelay: '0.4s'
                   }}>
                <div className="why-us__cta-number">05</div>
                <div className="why-us__cta-content">
                  <div className="why-us__cta-title">
                    Оставьте заявку — подберём кофемашину и кофе под ваш кейс
                  </div>
                  <div className="why-us__cta-actions">
                    <button className="why-us__cta-button" onClick={onOpenModal}>
                      Получить консультацию
                      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="why-us__cta-phone">+7 (909) 945-76-04</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`why-us__accordion ${isCollapsed ? 'why-us__accordion--visible' : ''}`}>
              {steps.map((step, index) => (
                <div 
                  key={`accordion-${index}`}
                  className="why-us__accordion-item"
                  style={{ 
                    transitionDelay: `${index * 0.05}s`
                  }}
                >
                  <div className="why-us__accordion-number">{step.number}</div>
                  <div className="why-us__accordion-title">{step.title}</div>
                </div>
              ))}
              
              <div className="why-us__accordion-cta"
                   style={{ 
                     transitionDelay: '0.2s'
                   }}>
                <div className="why-us__accordion-number">05</div>
                <div className="why-us__accordion-content">
                  <div className="why-us__accordion-title">
                    Оставьте заявку — подберём кофемашину и кофе под ваш кейс
                  </div>
                  <div className="why-us__accordion-actions">
                    <button className="why-us__accordion-button" onClick={onOpenModal}>
                      Получить консультацию
                      <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
                    </button>
                    <div className="why-us__accordion-phone">+7 (909) 945-76-04</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 