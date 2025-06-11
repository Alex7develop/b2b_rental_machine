import React, { useState, useEffect, useRef } from 'react';
import './HowItWorks.scss';
import HowItWorksForm from './HowItWorksForm';

const steps = [
  {
    number: '01',
    title: 'Заявка и консультация',
    description: 'Оставляете заявку — мы связываемся, уточняем задачи и рекомендуем оптимальную модель под ваш формат.'
  },
  {
    number: '02',
    title: 'Подбор и дегустация',
    description: 'Вы пробуете кофе, мы настраиваем вкус, показываем машину в деле. Подбираем оптимальный бленд и оборудование.'
  },
  {
    number: '03',
    title: 'Договор и запуск',
    description: 'Утверждаем условия, подписываем договор, доставляем оборудование и запускаем в работу — с обслуживанием и поставками.'
  }
];

const HowItWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`howitworks ${isVisible ? 'howitworks--visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <h2 className="howitworks__title">Запускаем кофе в вашем бизнесе за 3 шага</h2>
        <div className="howitworks__steps">
          {steps.map((step, index) => (
            <div className={`howitworks__step howitworks__step--${index + 1}`} key={step.number}>
              <div className="howitworks__step-number">{step.number}</div>
              <div className="howitworks__step-content">
                <div className="howitworks__step-title">{step.title}</div>
                <div className="howitworks__step-desc">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
        <HowItWorksForm />
      </div>
    </section>
  );
};

export default HowItWorks; 