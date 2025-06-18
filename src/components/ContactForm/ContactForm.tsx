import React, { useState } from 'react';
import './ContactForm.scss';

interface ContactFormProps {
  onOpenSuccessModal: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onOpenSuccessModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agreed: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    agreed: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      agreed: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите вашу почту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.agreed) {
      newErrors.agreed = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.agreed;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Сброс формы
      setFormData({
        name: '',
        email: '',
        agreed: false
      });
      // Сброс ошибок
      setErrors({
        name: '',
        email: '',
        agreed: ''
      });
      // Открытие модального окна успеха
      onOpenSuccessModal();
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@yourcoffee.ru';
  };

  const handleAddressClick = () => {
    window.open('https://yandex.ru/maps/213/moscow/?ll=37.542964%2C55.776237&mode=routes&rtext=~55.775936%2C37.542454&rtt=mt&ruri=~&z=18', '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+79099457604';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79099457604', '_blank');
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
                  className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                  required
                />
                {errors.name && <span className="contact-form__error">{errors.name}</span>}
              </div>

              <div className="contact-form__field">
                <input
                  type="email"
                  name="email"
                  placeholder="Введите вашу почту"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                  required
                />
                <div className="contact-form__input-icon">
                  <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
                </div>
                {errors.email && <span className="contact-form__error">{errors.email}</span>}
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
                    required
                  />
                  <span className={`contact-form__checkbox-text ${errors.agreed ? 'contact-form__checkbox-text--error' : ''}`}>
                    Я согласен на обработку персональных данных. 
                    <a href="#" className="contact-form__privacy-link">
                      Политика конфиденциальности
                    </a>
                  </span>
                </label>
                {errors.agreed && <span className="contact-form__error">{errors.agreed}</span>}
              </div>
            </form>
          </div>
        </div>

        <div className="contact-form__contact-blocks">
          <div className="contact-form__contact-block">
            <button 
              className="contact-form__contact-icon" 
              onClick={handleEmailClick}
              type="button"
              aria-label="Написать на почту"
            >
              <img src="/arrow-sm-diagonally.svg" alt="Email" width="24" height="24" />
            </button>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">hello@yourcoffee.ru</span>
              <span className="contact-form__contact-subtitle">написать на почту</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <button 
              className="contact-form__contact-icon" 
              onClick={handleAddressClick}
              type="button"
              aria-label="Открыть адрес на карте"
            >
              <img src="/arrow-sm-diagonally.svg" alt="Адрес" width="24" height="24" />
            </button>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">
                Метро Беговая – 5 минут пешком
              </span>
              <span className="contact-form__contact-subtitle">наш главный офис</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <button 
              className="contact-form__contact-icon" 
              onClick={handlePhoneClick}
              type="button"
              aria-label="Позвонить"
            >
              <img src="/arrow-sm-diagonally.svg" alt="Телефон" width="24" height="24" />
            </button>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">+7 (909) 945-76-04</span>
              <span className="contact-form__contact-subtitle">позвонить</span>
            </div>
          </div>

          <div className="contact-form__contact-block">
            <button 
              className="contact-form__contact-icon" 
              onClick={handleWhatsAppClick}
              type="button"
              aria-label="Написать в WhatsApp"
            >
              <img src="/arrow-sm-diagonally.svg" alt="WhatsApp" width="24" height="24" />
            </button>
            <div className="contact-form__contact-content">
              <span className="contact-form__contact-text">WhatsApp</span>
              <span className="contact-form__contact-subtitle">написать в мессенджер</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 