import React, { useEffect, useState } from 'react';
import './SuccessModal.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
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

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReturnToSite = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="success-modal-backdrop" 
      onClick={handleBackdropClick}
    >
      <div className={`success-modal ${isVisible ? 'success-modal--visible' : ''}`}>
        <button className="success-modal__close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="success-modal__content">
          <div className="success-modal__icon">
            <img src="/succes.svg" alt="Успешная отправка" />
          </div>

          <h2 className="success-modal__title">Заявка принята</h2>
          
          <p className="success-modal__text">
            Мы свяжемся с вами в ближайшее время<br />
            — специалист уточнит детали, подберёт<br />
            зерно и согласует формат дегустации.
          </p>

          <button 
            className="success-modal__button"
            onClick={handleReturnToSite}
          >
            Вернуться на сайт
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 