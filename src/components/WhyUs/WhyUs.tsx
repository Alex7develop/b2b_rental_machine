import React, { useEffect, useRef, useState } from 'react';
import './WhyUs.scss';

const WhyUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
          // Запускаем анимацию блоков по очереди
          const timer = setTimeout(() => {
            for (let i = 0; i <= 4; i++) {
              setTimeout(() => {
                setAnimatedItems(prev => [...prev, i]);
              }, i * 150);
            }
          }, 200);
          
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -100px 0px'
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
    const handleScroll = () => {
      if (stepsRef.current && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Отключаем сворачивание - блоки просто исчезают
        const shouldCollapse = false; // sectionRect.top < -sectionRect.height + 200;
        
        if (shouldCollapse !== isCollapsed) {
          setIsCollapsed(shouldCollapse);
        }
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isCollapsed]);

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
    <section className="why-us" ref={sectionRef}>
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
            <div className={`why-us__steps ${isCollapsed ? 'why-us__steps--collapsed' : ''}`} ref={stepsRef}>
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`why-us__step ${animatedItems.includes(index) ? 'why-us__step--animated' : ''}`}
                >
                  <div className="why-us__step-number">{step.number}</div>
                  <div className="why-us__step-content">
                    <div className="why-us__step-title">{step.title}</div>
                    <div className="why-us__step-description">{step.description}</div>
                  </div>
                </div>
              ))}
              
              <div className={`why-us__cta ${animatedItems.includes(4) ? 'why-us__cta--animated' : ''}`}>
                <div className="why-us__cta-number">05</div>
                <div className="why-us__cta-content">
                  <div className="why-us__cta-title">
                    Оставьте заявку — подберём кофемашину и кофе под ваш кейс
                  </div>
                  <div className="why-us__cta-actions">
                    <button className="why-us__cta-button">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 