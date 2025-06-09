import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agreed: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact-form">
      <div className="contact-form__container">
        <div className="contact-form__header">
          <h2 className="contact-form__title">
            Открой возможности вместе с Алеф Трейд — от идеи до большой прибыли
          </h2>
        </div>

        <div className="contact-form__content">
          <div className="contact-form__image">
            <img src="/coffeefinish.jpg" alt="Готовый кофе" />
          </div>

          <div className="contact-form__form-section">
            <div className="contact-form__phone">
              +7 (909) 945-76-04
            </div>
            
            <div className="contact-form__form-header">
              <p className="contact-form__form-description">
                Оставьте заявку — обсудим формат, подберем кофемашину под задачи, 
                расскажем про условия аренды и дегустацию.
              </p>
            </div>

            <form className="contact-form__form" onSubmit={handleSubmit}>
              <div className="contact-form__field">
                <input
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="contact-form__input"
                />
              </div>

              <div className="contact-form__field">
                <input
                  type="email"
                  name="email"
                  placeholder="Введите вашу почту"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="contact-form__input"
                />
                <div className="contact-form__input-icon">
                  <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
                </div>
              </div>

              <button type="submit" className="contact-form__submit">
                Записаться на дегустацию
                <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
              </button>

              <div className="contact-form__checkbox">
                <label className="contact-form__checkbox-label">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    className="contact-form__checkbox-input"
                  />
                  <span className="contact-form__checkbox-text">
                    Я согласен на обработку персональных данных. 
                    <a href="#" className="contact-form__privacy-link">
                      Политика конфиденциальности
                    </a>
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="contact-form__contact-blocks">
          <div className="contact-form__contact-block">
            <div className="contact-form__contact-icon">
              <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="24" height="24" />
            </div>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">hello@yourcoffee.ru</span>
              <span className="contact-form__contact-subtitle">написать на почту</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <div className="contact-form__contact-icon">
              <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="24" height="24" />
            </div>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">
                Метро Беговая – 5 минут пешком
              </span>
              <span className="contact-form__contact-subtitle">наш главный офис</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <div className="contact-form__contact-icon">
              <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="24" height="24" />
            </div>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">+7 (909) 945-76-04</span>
              <span className="contact-form__contact-subtitle">позвонить</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <div className="contact-form__contact-icon">
              <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="24" height="24" />
            </div>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">
                Напишите в WhatsApp
              </span>
              <span className="contact-form__contact-subtitle">+7 (909) 945-76-04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 