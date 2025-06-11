import React, { useState, useEffect } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consent: false
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Функция для форматирования телефона
  const formatPhoneNumber = (value: string) => {
    // Удаляем все символы кроме цифр
    const phoneNumber = value.replace(/\D/g, '');
    
    // Если номер начинается с 8, заменяем на 7
    const normalizedNumber = phoneNumber.startsWith('8') ? '7' + phoneNumber.slice(1) : phoneNumber;
    
    // Если номер не начинается с 7, добавляем 7
    const withCountryCode = normalizedNumber.startsWith('7') ? normalizedNumber : '7' + normalizedNumber;
    
    // Ограничиваем длину до 11 цифр (7 + 10 цифр номера)
    const limitedNumber = withCountryCode.slice(0, 11);
    
    // Форматируем номер
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
    
    return '+7 (';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    
    console.log('Form submitted:', formData);
    
    // Сброс формы
    setFormData({
      name: '',
      phone: '',
      email: '',
      consent: false
    });
    
    // Открытие модального окна успеха
    onSuccess();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-backdrop ${isVisible ? 'modal-backdrop--visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`modal ${isVisible ? 'modal--visible' : ''}`}>
        <div className="modal__content">
          <div className="modal__left">
            <div className="modal__left-content">
              <div className="modal__logo">
                <img src="/father_icon_white.svg" alt="Алеф Трейд" className="modal__logo-icon" />
                <img src="/aleph_white.svg" alt="Алеф Трейд" className="modal__logo-text" />
              </div>

              <h2 className="modal__title">
                Работайте с кофе,<br />
                который приносит результат
              </h2>

              <p className="modal__subtitle">
                С нами вы не просто наливаете кофе<br />
                — вы увеличиваете продажи и лояльность клиентов.
              </p>

              <div className="modal__features">
                <div className="modal__feature">
                  <div className="modal__feature-icon">
                    <img src="/Icon_user.svg" alt="Индивидуальный подбор" />
                  </div>
                  <div className="modal__feature-content">
                    <h3 className="modal__feature-title">Индивидуальный подбор оборудования</h3>
                    <p className="modal__feature-text">
                      Подбираем кофемашину под задачи вашего<br />
                      бизнеса — от объёма продаж до формата точки.
                    </p>
                  </div>
                </div>

                <div className="modal__feature">
                  <div className="modal__feature-icon">
                    <img src="/icon_people.svg" alt="Настройка вкуса" />
                  </div>
                  <div className="modal__feature-content">
                    <h3 className="modal__feature-title">Настройка вкуса под вашу аудиторию</h3>
                    <p className="modal__feature-text">
                      Тестируем зерно, настраиваем рецептуру, чтобы<br />
                      вкус нравился именно вашей ЦА и вызывал<br />
                      возвращение.
                    </p>
                  </div>
                </div>

                <div className="modal__feature">
                  <div className="modal__feature-icon">
                    <img src="/logistic.svg" alt="Поддержка и поставки" />
                  </div>
                  <div className="modal__feature-content">
                    <h3 className="modal__feature-title">Поддержка и поставки без перебоев</h3>
                    <p className="modal__feature-text">
                      Берём на себя сервис, ремонт и регулярные<br />
                      поставки — вы не отвлекаетесь от бизнеса.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal__partners">
              <p className="modal__partners-title">Нам доверяют:</p>
              <div className="modal__partners-logos">
                <img src="/we_partners.png" alt="Наши партнеры" />
              </div>
            </div>
          </div>

          <div className="modal__right">
            <div className="modal__form-container">
              <button className="modal__close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="modal__form-icon">
                <img src="/icon_account.svg" alt="Отправить заявку" />
              </div>

              <h3 className="modal__form-title">Отправить заявку?</h3>
              <p className="modal__form-subtitle">
                Мы свяжемся, чтобы подобрать кофемашину<br />
                и пригласить на дегустацию.
              </p>

              <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__form-fields">
                  <p className="modal__form-label">Заполните данные:</p>

                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше Имя"
                    className="modal__input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (___)-___-__-__"
                    className="modal__input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Ваша почта"
                    className="modal__input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <label className="modal__checkbox">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                    />
                    <span className="modal__checkbox-text">
                      Я согласен на обработку персональных данных{' '}
                      <a href="/privacy" className="modal__link">
                        Политика конфиденциальности
                      </a>
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="modal__submit"
                  disabled={!formData.consent}
                >
                  Записаться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 