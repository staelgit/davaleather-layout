import { Modal, modalManager } from '../modal/modal.js';

/**
 * Класс для модального окна zip code
 */
export class ZipcodeModal extends Modal {
  constructor(modalElement) {
    super(modalElement);

    // Элементы формы
    this.form = this.modal.querySelector('.modal-zipcode__form');
    this.input = this.modal.querySelector('.modal-zipcode__input');
    this.errorElement = this.modal.querySelector('.modal-zipcode__error');
    this.submitButton = this.modal.querySelector('.modal-zipcode__confirm');

    // Состояние валидации
    this.isValid = false;
    this.lastValidZipcode = '';

    this.initZipcodeModal();
  }

  initZipcodeModal() {
    this.bindFormEvents();

    // Добавляем обработчики специфичные для модала zipcode
    this.onOpen(() => {
      console.log('Zipcode modal opened');
      this.resetForm();
      // Фокус на поле ввода при открытии
      setTimeout(() => {
        this.input.focus();
      }, 100);
    });

    this.onClose(() => {
      console.log('Zipcode modal closed');
      this.resetForm();
    });
  }

  bindFormEvents() {
    // Обработчик отправки формы
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Обработчики ввода
    if (this.input) {
      // Валидация в реальном времени
      this.input.addEventListener('input', (e) => {
        this.handleInput(e);
      });

      // Очистка ошибок при фокусе
      this.input.addEventListener('focus', () => {
        this.clearError();
      });

      // Валидация при потере фокуса
      this.input.addEventListener('blur', () => {
        if (this.input.value.trim()) {
          this.validateZipcode(this.input.value.trim());
        }
      });

      // Обработка Enter
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSubmit();
        }
      });
    }
  }

  handleInput(e) {
    let value = e.target.value;

    // Разрешаем только цифры и дефис
    value = value.replace(/[^\d-]/g, '');

    // Ограничиваем длину (максимум 10 символов для формата 12345-6789)
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Автоматическое форматирование для расширенного zip code
    if (value.length === 6 && !value.includes('-')) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }

    e.target.value = value;

    // Валидация в реальном времени только если введено достаточно символов
    if (value.length >= 5) {
      this.validateZipcode(value);
    } else {
      this.clearError();
    }
  }

  handleSubmit() {
    const zipcode = this.input.value.trim();

    if (!zipcode) {
      this.showError('Please enter a zip code');
      this.input.focus();
      return;
    }

    if (this.validateZipcode(zipcode)) {
      this.submitZipcode(zipcode);
    } else {
      this.input.focus();
    }
  }

  /**
   * Валидация US zip code
   * Поддерживает форматы: 12345 и 12345-6789
   */
  validateZipcode(zipcode) {
    // Убираем лишние пробелы
    zipcode = zipcode.trim();

    // Регулярное выражение для US zip code
    // 5 цифр или 5 цифр-4 цифры
    const zipPattern = /^(\d{5})(-\d{4})?$/;

    if (!zipPattern.test(zipcode)) {
      this.showError('Please enter a valid US zip code (e.g., 12345 or 12345-6789)');
      this.isValid = false;
      return false;
    }

    // Дополнительная проверка на существующие zip code диапазоны США
    const mainZip = zipcode.split('-')[0];
    const firstDigit = parseInt(mainZip[0]);
    const firstTwoDigits = parseInt(mainZip.substring(0, 2));

    // Базовая проверка диапазонов US zip codes
    if (firstDigit === 0 && firstTwoDigits > 8) {
      this.showError('Please enter a valid US zip code');
      this.isValid = false;
      return false;
    }

    // Zip codes starting with 00 are generally not valid
    if (mainZip.startsWith('00')) {
      this.showError('Please enter a valid US zip code');
      this.isValid = false;
      return false;
    }

    this.clearError();
    this.isValid = true;
    this.lastValidZipcode = zipcode;
    return true;
  }

  showError(message) {
    if (this.errorElement) {
      this.errorElement.textContent = message;
      this.errorElement.classList.add('modal-zipcode__error--visible');
    }

    if (this.input) {
      this.input.classList.add('modal-zipcode__input--error');
    }

    this.isValid = false;
  }

  clearError() {
    if (this.errorElement) {
      this.errorElement.textContent = '';
      this.errorElement.classList.remove('modal-zipcode__error--visible');
    }

    if (this.input) {
      this.input.classList.remove('modal-zipcode__input--error');
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
    }

    this.clearError();
    this.isValid = false;
    this.lastValidZipcode = '';

    // Сбрасываем состояние кнопки
    if (this.submitButton) {
      this.submitButton.disabled = false;
    }
  }

  /**
   * Отправка zip code (здесь можно добавить логику отправки на сервер)
   */
  async submitZipcode(zipcode) {
    try {
      // Блокируем кнопку во время отправки
      if (this.submitButton) {
        this.submitButton.disabled = true;
      }

      console.log('Submitting zip code:', zipcode);

      // Имитация отправки на сервер
      await this.simulateApiCall(zipcode);

      // Успешная отправка
      this.handleSubmitSuccess(zipcode);
    } catch (error) {
      console.error('Error submitting zip code:', error);
      this.handleSubmitError(error);
    } finally {
      // Разблокируем кнопку
      if (this.submitButton) {
        this.submitButton.disabled = false;
      }
    }
  }

  /**
   * Имитация API вызова
   */
  simulateApiCall(zipcode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Имитируем успешный ответ для большинства zip codes
        // В реальном приложении здесь был бы настоящий API вызов
        if (Math.random() > 0.1) {
          // 90% успеха
          resolve({
            zipcode: zipcode,
            serviceAvailable: true,
            city: 'Example City',
            state: 'CA',
          });
        } else {
          reject(new Error('Service not available in this area'));
        }
      }, 1000);
    });
  }

  handleSubmitSuccess(zipcode) {
    console.log('Zip code submitted successfully:', zipcode);

    // Показываем сообщение об успехе или закрываем модал
    // В реальном приложении здесь может быть переход к следующему шагу
    alert(`Thank you! We provide service in ${zipcode} area.`);

    // Закрываем модал
    this.close();

    // Генерируем событие для внешних обработчиков
    this.modal.dispatchEvent(
      new CustomEvent('zipcode:submitted', {
        detail: {
          zipcode: zipcode,
          modal: this,
        },
        bubbles: true,
      })
    );
  }

  handleSubmitError(error) {
    console.error('Zip code submission error:', error);

    // Показываем ошибку пользователю
    this.showError(error.message || "Sorry, we don't provide service in this area yet.");
  }

  // Дополнительные методы для внешнего API
  getZipcode() {
    return this.input ? this.input.value.trim() : '';
  }

  setZipcode(zipcode) {
    if (this.input) {
      this.input.value = zipcode;
      this.validateZipcode(zipcode);
    }
  }

  getLastValidZipcode() {
    return this.lastValidZipcode;
  }

  isFormValid() {
    return this.isValid;
  }
}

/**
 * Инициализация модального окна zip code
 */
export function initZipcodeModal() {
  // Ищем существующий модал в DOM (который рендерится из шаблона)
  const zipcodeModalElement = document.querySelector('[data-modal="zipcode"]');

  if (!zipcodeModalElement) {
    console.error('Zipcode modal element not found in DOM');
    return null;
  }

  // Создаем экземпляр модала и регистрируем в менеджере
  const zipcodeModal = new ZipcodeModal(zipcodeModalElement);
  modalManager.register('zipcode', zipcodeModal);

  return zipcodeModal;
}

/**
 * Функция для программного открытия модала zip code
 */
export function openZipcodeModal() {
  modalManager.open('zipcode');
}

/**
 * Функция для программного закрытия модала zip code
 */
export function closeZipcodeModal() {
  modalManager.close('zipcode');
}
