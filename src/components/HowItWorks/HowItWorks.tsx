import React from 'react';
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
  return (
    <section className="howitworks">
      <div className="container">
        <h2 className="howitworks__title">Запускаем кофе в вашем бизнесе за 3 шага</h2>
        <div className="howitworks__steps">
          {steps.map((step, _) => (
            <div className="howitworks__step" key={step.number}>
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