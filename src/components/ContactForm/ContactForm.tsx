import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.scss';

interface ContactFormProps {
  onOpenSuccessModal: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onOpenSuccessModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreed: false
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    agreed: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для форматирования телефона
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    const normalizedNumber = phoneNumber.startsWith('8') ? '7' + phoneNumber.slice(1) : phoneNumber;
    const withCountryCode = normalizedNumber.startsWith('7') ? normalizedNumber : '7' + normalizedNumber;
    const limitedNumber = withCountryCode.slice(0, 11);
    if (limitedNumber.length >= 1) {
      let formatted = '+7';
      if (limitedNumber.length > 1) {
        formatted += ' (' + limitedNumber.slice(1, 4);
        if (limitedNumber.length >= 4) {
          formatted += ')';
          if (limitedNumber.length > 4) {
            formatted += '-' + limitedNumber.slice(4, 7);
            if (limitedNumber.length > 7) {
              formatted += '-' + limitedNumber.slice(7, 9);
              if (limitedNumber.length > 9) {
                formatted += '-' + limitedNumber.slice(9, 11);
              }
            }
          }
        }
      }
      return formatted;
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

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
      phone: '',
      agreed: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^(\+7\s?\(\d{3}\)\-\d{3}\-\d{2}\-\d{2})$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.agreed) {
      newErrors.agreed = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.agreed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const TYPE = '1';
    if (TYPE !== '1' && TYPE !== '2') {
      setError('Заполнена несуществующая форма');
      return;
    }
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          NAME: formData.name,
          PHONE: formData.phone,
          CONSENT: formData.agreed ? 1 : 0,
          TYPE,
        };
        const formDataObj = new URLSearchParams(payload as any);
        const response = await axios.post('/process-data.php', formDataObj, { responseType: 'text' });
        let data;
        try {
          // Вытаскиваем JSON из строки, даже если есть мусор
          const match = response.data.match(/\{[\s\S]*\}/);
          data = match ? JSON.parse(match[0]) : {};
        } catch (e) {
          setError('Неожиданный ответ от сервера. Попробуйте позже.');
          setIsSubmitting(false);
          return;
        }

        if (data.status === 'success') {
          setFormData({
            name: '',
            phone: '',
            agreed: false
          });
          setErrors({
            name: '',
            phone: '',
            agreed: ''
          });
          onOpenSuccessModal();
        } else if (data.status === 'error') {
          setError(data.text || 'Ошибка при отправке. Попробуйте позже.');
        } else {
          setError('Неожиданный ответ от сервера. Попробуйте позже.');
        }
        setIsSubmitting(false);
      } catch (err) {
        setError('Ошибка при отправке. Попробуйте позже.');
        setIsSubmitting(false);
      }
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
    window.open('https://wa.me/79030002392', '_blank');
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
                  placeholder="Введите имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                  required
                />
                {errors.name && <span className="contact-form__error">{errors.name}</span>}
              </div>

              <div className="contact-form__field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Введите номер телефона"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`contact-form__input ${errors.phone ? 'contact-form__input--error' : ''}`}
                  required
                  maxLength={18}
                />
                <div className="contact-form__input-icon">
                  <img src="/arrow-sm-diagonally.svg" alt="Arrow" width="16" height="16" />
                </div>
                {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
              </div>

              <button type="submit" className="contact-form__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Записаться на дегустацию'}
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
              {error && <div className="contact-form__error">{error}</div>}
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
              <span className="contact-form__contact-text">Напишите в WhatsApp</span>
              <span className="contact-form__contact-subtitle">написать в мессенджер</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 