import { Modal, modalManager } from '../modal/modal.js';

/**
 * Класс для модального окна звонка
 */
export class PhoneModal extends Modal {
  constructor(modalElement) {
    super(modalElement);

    // Дополнительная логика для модала звонка
    this.initPhoneModal();
  }

  initPhoneModal() {
    // Добавляем обработчики специфичные для модала звонка
    this.onOpen(() => {
      console.log('Phone modal opened');
      // Здесь можно добавить аналитику, отправку событий и т.д.
    });

    this.onClose(() => {
      console.log('Phone modal closed');
    });
  }

  // Дополнительные методы для модала звонка
  getPhoneNumber() {
    const title = this.modal.querySelector('.modal-phone__title');
    return title ? title.textContent.trim() : '';
  }
}

/**
 * Инициализация модального окна звонка
 */
export function initPhoneModal() {
  // Ищем существующий модал в DOM
  let phoneModalElement = document.querySelector('[data-modal="phone"]');

  // Если модал не найден, создаем его
  if (!phoneModalElement) {
    phoneModalElement = createPhoneModal();
    document.body.appendChild(phoneModalElement);
  }

  // Создаем экземпляр модала и регистрируем в менеджере
  const phoneModal = new PhoneModal(phoneModalElement);
  modalManager.register('phone', phoneModal);

  return phoneModal;
}

/**
 * Создание DOM элемента модального окна звонка
 */
function createPhoneModal() {
  const modalHTML = `
    <div class="modal" data-modal="phone">
      <div class="modal__backdrop"></div>
      <div class="modal__container">
        <div class="modal__content">
          <button class="modal__close" aria-label="Close modal">
            <svg class="modal__close-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1"/>
            </svg>
          </button>
          
          <div class="modal__body">
            <div class="modal-phone">
              <div class="modal-phone__content">
                <h2 class="modal-phone__title">+1 (323) 513 47 57</h2>
                <p class="modal-phone__description">Give us a call — we're here every day 8 am — 8 pm.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modalHTML.trim();
  return tempDiv.firstChild;
}

/**
 * Функция для программного открытия модала звонка
 */
export function openPhoneModal() {
  modalManager.open('phone');
}

/**
 * Функция для программного закрытия модала звонка
 */
export function closePhoneModal() {
  modalManager.close('phone');
}
