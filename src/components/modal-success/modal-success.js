import { Modal, modalManager } from '../modal/modal.js';

/**
 * Класс для модального окна успеха
 */
export class SuccessModal extends Modal {
  constructor(modalElement) {
    super(modalElement);

    // Данные для отображения
    this.formData = null;

    this.initSuccessModal();
  }

  initSuccessModal() {
    // Добавляем обработчики специфичные для модала успеха
    this.onOpen(() => {
      console.log('Success modal opened');

      // Автоматически закрываем модал через 5 секунд
      this.autoCloseTimer = setTimeout(() => {
        this.close();
      }, 5000);
    });

    this.onClose(() => {
      console.log('Success modal closed');

      // Очищаем таймер автозакрытия
      if (this.autoCloseTimer) {
        clearTimeout(this.autoCloseTimer);
        this.autoCloseTimer = null;
      }
    });
  }

  // Методы для установки данных формы (если нужно для персонализации)
  setFormData(formData) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }

  // Метод для принудительного закрытия без таймера
  forceClose() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
    this.close();
  }
}

/**
 * Инициализация модального окна успеха
 */
export function initSuccessModal() {
  // Ищем существующий модал в DOM
  const successModalElement = document.querySelector('[data-modal="success"]');

  if (!successModalElement) {
    console.error('Success modal element not found in DOM');
    return null;
  }

  // Создаем экземпляр модала и регистрируем в менеджере
  const successModal = new SuccessModal(successModalElement);
  modalManager.register('success', successModal);

  return successModal;
}

/**
 * Функция для программного открытия модала успеха
 */
export function openSuccessModal(formData = null) {
  const modal = modalManager.get('success');
  if (modal && formData) {
    modal.setFormData(formData);
  }
  modalManager.open('success');
}

/**
 * Функция для программного закрытия модала успеха
 */
export function closeSuccessModal() {
  modalManager.close('success');
}
