import React, { useState, useEffect, useRef } from 'react';
import './HowItWorksForm.scss';

interface HowItWorksFormProps {
  onOpenSuccessModal: () => void;
}

const HowItWorksForm: React.FC<HowItWorksFormProps> = ({ onOpenSuccessModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consent: false
  });

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    
    console.log('HowItWorksForm submitted:', formData);
    
    // Сброс формы
    setFormData({
      name: '',
      phone: '',
      email: '',
      consent: false
    });
    
    // Открытие модального окна успеха
    onOpenSuccessModal();
  };

  return (
    <div className={`howitworksform-block ${isVisible ? 'howitworksform-block--visible' : ''}`} ref={formRef}>
      <div className="howitworksform-phonebar">
        <span>+7 (909) 945-76-04</span>
      </div>
      <div className="howitworksform-content">
        <div className="howitworksform-title">Попробуйте кофе,<br />который клиенты запомнят</div>
        <div className="howitworksform-desc">
          Оставьте заявку — подберем зерно и пригласим на дегустацию под ваш формат бизнеса
        </div>
        <form className="howitworksform-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Введите ваше имя" 
            className="howitworksform-input howitworksform-input--1"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="+7 (___)-___-__-__" 
            className="howitworksform-input howitworksform-input--2"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Введите вашу почту" 
            className="howitworksform-input howitworksform-input--3"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <button 
            type="submit" 
            className="howitworksform-submit"
            disabled={!formData.consent}
          >
            Записаться на дегустацию
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 5L12 10L7 15" stroke="#273889" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>
        <div className="howitworksform-policy">
          <input 
            type="checkbox" 
            id="policy"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
          />
          <label htmlFor="policy">Я согласен на обработку персональных данных. <a href="#">Политика конфиденциальности</a></label>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksForm; 