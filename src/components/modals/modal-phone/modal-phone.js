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
  // Ищем существующий модал в DOM (который рендерится из шаблона)
  const phoneModalElement = document.querySelector('[data-modal="phone"]');

  if (!phoneModalElement) {
    console.error('Phone modal element not found in DOM');
    return null;
  }

  // Создаем экземпляр модала и регистрируем в менеджере
  const phoneModal = new PhoneModal(phoneModalElement);
  modalManager.register('phone', phoneModal);

  return phoneModal;
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
