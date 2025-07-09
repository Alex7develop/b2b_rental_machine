// Номер счетчика Яндекс.Метрики
const METRIKA_COUNTER_ID = 102940459;
//Андрей тут полный список целей, которые мы обсцждали и плюс я делал все на оснеове твоего файла из Альхайс, по примеру

// Функция для отправки цели в Яндекс.Метрику
function sendYandexGoal(goalName) {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName);
    console.log('Яндекс цель отправлена:', goalName);
  } else {
    console.warn('Яндекс.Метрика не загружена');
  }
}

// Функция для копирования текста в буфер обмена
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  
  // ========== 1. ЦЕЛИ НА УСПЕШНУЮ ОТПРАВКУ ФОРМ ==========

  // Главная форма ContactForm - "Записаться на дегустацию"
  const contactForm = document.querySelector('.contact-form__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      sendYandexGoal('contact_form_submit');
      sendYandexGoal('form_submit_any');
    });
  }

  // Форма HowItWorksForm - "Записаться на дегустацию"
  const howItWorksForm = document.querySelector('.howitworksform-form');
  if (howItWorksForm) {
    howItWorksForm.addEventListener('submit', function (event) {
      sendYandexGoal('how_it_works_form_submit');
      sendYandexGoal('form_submit_any');
    });
  }

  // Модальная форма - "Записаться" (подбор кофемашины)
  const modalForm = document.querySelector('.modal__form');
  if (modalForm) {
    modalForm.addEventListener('submit', function (event) {
      sendYandexGoal('modal_form_submit');
      sendYandexGoal('form_submit_any');
    });
  }

  // ========== 2. ЦЕЛИ НА ОТКРЫТИЕ ФОРМ ==========

  // Кнопка "Оставить заявку" в хедере (десктопная)
  const headerCta = document.querySelector('.header__cta--desktop');
  if (headerCta) {
    headerCta.addEventListener('click', function (event) {
      sendYandexGoal('header_cta_click');
      sendYandexGoal('modal_open');
    });
  }

  // Кнопка "Оставить заявку" в мобильном меню
  const headerMobileCta = document.querySelector('.header__mobile-cta');
  if (headerMobileCta) {
    headerMobileCta.addEventListener('click', function (event) {
      sendYandexGoal('header_mobile_cta_click');
      sendYandexGoal('modal_open');
    });
  }

  // Кнопка "Оставить заявку" в Hero секции
  const heroButton = document.querySelector('.hero__button');
  if (heroButton) {
    heroButton.addEventListener('click', function (event) {
      sendYandexGoal('hero_button_click');
      sendYandexGoal('modal_open');
    });
  }

  // Кнопки в AboutUs секции
  const tastingButton = document.querySelector('.about-us__tasting-button');
  if (tastingButton) {
    tastingButton.addEventListener('click', function (event) {
      sendYandexGoal('tasting_button_click');
      sendYandexGoal('modal_open');
    });
  }

  const signupButton = document.querySelector('.about-us__signup-button');
  if (signupButton) {
    signupButton.addEventListener('click', function (event) {
      sendYandexGoal('signup_button_click');
      sendYandexGoal('modal_open');
    });
  }

  // Кнопки в секции кофемашин
  const coffeeMachineButtons = document.querySelectorAll('.coffee-machines__card-button');
  coffeeMachineButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      sendYandexGoal('coffee_machine_card_button_click');
      sendYandexGoal('modal_open');
    });
  });

  // Кнопки в WhyUs секции
  const whyUsCta = document.querySelector('.why-us__cta-button');
  if (whyUsCta) {
    whyUsCta.addEventListener('click', function (event) {
      sendYandexGoal('why_us_cta_click');
      sendYandexGoal('modal_open');
    });
  }

  const whyUsAccordion = document.querySelector('.why-us__accordion-button');
  if (whyUsAccordion) {
    whyUsAccordion.addEventListener('click', function (event) {
      sendYandexGoal('why_us_accordion_click');
      sendYandexGoal('modal_open');
    });
  }

  // Иконка в Hero (открытие модального окна)
  const heroIcon = document.querySelector('.hero__iconblock--topright');
  if (heroIcon) {
    heroIcon.addEventListener('click', function (event) {
      sendYandexGoal('hero_icon_click');
      sendYandexGoal('modal_open');
    });
  }

  // ========== 3. КЛИКИ ПО ТЕЛЕФОНУ ==========

  // Все телефонные номера на сайте
  const phoneSelectors = [
    '.contact-form__phone', 
    '.hero__phone', 
    '.howitworksform-phonebar span',
    '.howitworksform-phonebar', 
    '.contact-form__contact-text',
    '.why-us__cta-phone',
    '.why-us__accordion-phone'
  ];
  
  phoneSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(function (phone) {
      // Проверяем, содержит ли элемент телефонный номер
      if (phone.textContent && phone.textContent.includes('+7')) {
        console.log(`✅ Добавлен обработчик для телефона: "${phone.textContent.trim()}"`);
        phone.addEventListener('click', function (event) {
          console.log('📞 Клик по телефону:', phone.textContent.trim());
          sendYandexGoal('phone_click');
        });
      } else {
        console.log(`❌ Элемент не содержит телефон: "${phone.textContent?.trim() || 'пустой'}"`);
      }
    });
  });

  // Кнопки-иконки для звонков
  const phoneIcons = document.querySelectorAll('.contact-form__contact-icon');
  phoneIcons.forEach(function (icon) {
    icon.addEventListener('click', function (event) {
      const contactBlock = icon.closest('.contact-form__contact-block');
      if (contactBlock) {
        const subtitle = contactBlock.querySelector('.contact-form__contact-subtitle');
        if (subtitle && subtitle.textContent.trim() === 'позвонить') {
          console.log('📞 Клик по иконке телефона');
          sendYandexGoal('phone_click');
        }
      }
    });
  });

  // ========== 4. КЛИКИ ПО EMAIL И КОПИРОВАНИЕ ==========

  // Обработчики для email в Hero
  const heroEmail = document.querySelector('.hero__email');
  if (heroEmail) {
    // Клик по email
    heroEmail.addEventListener('click', function (event) {
      console.log('📧 Клик по email в Hero');
      sendYandexGoal('email_choice');
    });

    // Копирование email (Ctrl+C)
    heroEmail.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'c') {
        event.preventDefault();
        copyToClipboard(heroEmail.textContent)
          .then(() => {
            console.log('📧 Email скопирован в Hero');
            sendYandexGoal('email_copy');
            console.log('Email скопирован в буфер обмена');
          })
          .catch((err) => {
            console.error('Ошибка копирования:', err);
          });
      }
    });

    // Правая кнопка мыши для копирования
    heroEmail.addEventListener('contextmenu', function (event) {
      console.log('📧 Контекстное меню email в Hero');
      sendYandexGoal('email_context_menu');
    });

    // Выделение email
    heroEmail.addEventListener('selectstart', function (event) {
      console.log('📧 Выделение email в Hero');
      sendYandexGoal('email_select');
    });
  }

  // Обработчики для email в ContactForm
  const contactEmail = document.querySelector('.contact-form__contact-text-mail');
  if (contactEmail) {
    // Клик по email
    contactEmail.addEventListener('click', function (event) {
      console.log('📧 Клик по email в ContactForm');
      sendYandexGoal('email_choice');
    });

    // Копирование email (Ctrl+C)
    contactEmail.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'c') {
        event.preventDefault();
        copyToClipboard(contactEmail.textContent)
          .then(() => {
            console.log('📧 Email скопирован в ContactForm');
            sendYandexGoal('email_copy');
            console.log('Email скопирован в буфер обмена');
          })
          .catch((err) => {
            console.error('Ошибка копирования:', err);
          });
      }
    });

    // Правая кнопка мыши для копирования
    contactEmail.addEventListener('contextmenu', function (event) {
      console.log('📧 Контекстное меню email в ContactForm');
      sendYandexGoal('email_context_menu');
    });

    // Выделение email
    contactEmail.addEventListener('selectstart', function (event) {
      console.log('📧 Выделение email в ContactForm');
      sendYandexGoal('email_select');
    });
  }

  // Кнопка-иконка для email
  const emailIcons = document.querySelectorAll('.contact-form__contact-icon');
  emailIcons.forEach(function (icon) {
    icon.addEventListener('click', function (event) {
      const contactBlock = icon.closest('.contact-form__contact-block');
      if (contactBlock) {
        const subtitle = contactBlock.querySelector('.contact-form__contact-subtitle');
        if (subtitle && subtitle.textContent.trim() === 'написать на почту') {
          console.log('📧 Клик по иконке email');
          sendYandexGoal('email_choice');
        }
      }
    });
  });

  // ========== 5. КЛИКИ ПО WHATSAPP ==========

  // Кнопка-иконка для WhatsApp
  const whatsappIcons = document.querySelectorAll('.contact-form__contact-icon');
  whatsappIcons.forEach(function (icon) {
    icon.addEventListener('click', function (event) {
      const contactBlock = icon.closest('.contact-form__contact-block');
      if (contactBlock) {
        const subtitle = contactBlock.querySelector('.contact-form__contact-subtitle');
        if (subtitle && subtitle.textContent.trim() === 'написать в мессенджер') {
          console.log('💬 Клик по WhatsApp');
          sendYandexGoal('whatsapp_click');
        }
      }
    });
  });

  // ========== ДОПОЛНИТЕЛЬНЫЕ ЦЕЛИ ==========

  // Навигация по карточкам кофе
  const coffeeNavButtons = document.querySelectorAll('.about-us__nav-button');
  coffeeNavButtons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      sendYandexGoal('coffee_navigation_click');
    });
  });

  // Скролл к секциям через навигацию
  const navLinks = document.querySelectorAll('.header__nav-link, .header__mobile-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      sendYandexGoal('navigation_click');
    });
  });

  // Клик по адресу
  const addressIcons = document.querySelectorAll('.contact-form__contact-icon');
  addressIcons.forEach(function (icon) {
    icon.addEventListener('click', function (event) {
      const contactBlock = icon.closest('.contact-form__contact-block');
      if (contactBlock) {
        const subtitle = contactBlock.querySelector('.contact-form__contact-subtitle');
        if (subtitle && subtitle.textContent.trim() === 'наш главный офис') {
          console.log('📍 Клик по адресу');
          sendYandexGoal('address_click');
        }
      }
    });
  });

});

// ========== ФУНКЦИИ ДЛЯ REACT КОМПОНЕНТОВ ==========

// Функция для отправки цели при успешной отправке формы (вызывается из React компонентов)
window.sendFormSuccessGoal = function (formType) {
  // Отправляем специфичную цель для типа формы
  switch (formType) {
    case 'contact':
      sendYandexGoal('contact_form_success');
      break;
    case 'howitworks':
      sendYandexGoal('how_it_works_form_success');
      break;
    case 'modal':
      sendYandexGoal('modal_form_success');
      break;
    default:
      sendYandexGoal('form_success');
  }

  // Отправляем общую цель для любой успешной отправки формы
  sendYandexGoal('form_success_any');
};

// Функция для отправки цели при переходе на страницу благодарности
window.sendThanksPageGoal = function () {
  sendYandexGoal('thanks_page_view');
  sendYandexGoal('form_success_any'); // Также считаем как успешную отправку формы
};
