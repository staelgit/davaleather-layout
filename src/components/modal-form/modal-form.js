import { Modal, modalManager } from '../modal/modal.js';
import { openSuccessModal } from '../modal-success/modal-success.js';

/**
 * Класс для модального окна формы записи
 */
export class FormModal extends Modal {
  constructor(modalElement) {
    super(modalElement);

    // Элементы формы
    this.form = this.modal.querySelector('.modal-form__form');
    this.issueTextarea = this.modal.querySelector('#issue-input');
    this.nameInput = this.modal.querySelector('#name-input');
    this.phoneInput = this.modal.querySelector('#phone-input');
    this.emailInput = this.modal.querySelector('#email-input');
    this.fileInput = this.modal.querySelector('#file-input');
    this.fileButton = this.modal.querySelector('.modal-form__file-button');
    this.submitButton = this.modal.querySelector('.modal-form__submit');

    // Элементы ошибок
    this.nameError = this.modal.querySelector('#name-error');
    this.phoneError = this.modal.querySelector('#phone-error');
    this.emailError = this.modal.querySelector('#email-error');

    // Состояние формы
    this.formData = {
      zipcode: '',
      issue: '',
      name: '',
      phone: '',
      email: '',
      files: [],
    };

    this.validationState = {
      name: false,
      phone: false,
      email: false,
    };

    this.initFormModal();
  }

  initFormModal() {
    this.bindFormEvents();

    // Добавляем обработчики специфичные для модала формы
    this.onOpen(() => {
      console.log('Form modal opened');
      this.resetForm();
      // Фокус на первое поле при открытии
      setTimeout(() => {
        this.issueTextarea.focus();
      }, 100);
    });

    this.onClose(() => {
      console.log('Form modal closed');
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

    // Обработчики полей формы
    if (this.issueTextarea) {
      this.issueTextarea.addEventListener('input', (e) => {
        this.formData.issue = e.target.value;
      });
    }

    if (this.nameInput) {
      this.nameInput.addEventListener('input', (e) => {
        this.handleNameInput(e);
      });

      this.nameInput.addEventListener('blur', () => {
        this.validateName();
      });

      this.nameInput.addEventListener('focus', () => {
        this.clearFieldError('name');
      });
    }

    if (this.phoneInput) {
      this.phoneInput.addEventListener('input', (e) => {
        this.handlePhoneInput(e);
      });

      this.phoneInput.addEventListener('blur', () => {
        this.validatePhone();
      });

      this.phoneInput.addEventListener('focus', () => {
        this.clearFieldError('phone');
      });
    }

    if (this.emailInput) {
      this.emailInput.addEventListener('input', (e) => {
        this.handleEmailInput(e);
      });

      this.emailInput.addEventListener('blur', () => {
        this.validateEmail();
      });

      this.emailInput.addEventListener('focus', () => {
        this.clearFieldError('email');
      });
    }

    // Обработчик загрузки файлов
    if (this.fileButton) {
      this.fileButton.addEventListener('click', () => {
        this.fileInput.click();
      });
    }

    if (this.fileInput) {
      this.fileInput.addEventListener('change', (e) => {
        this.handleFileUpload(e);
      });
    }
  }

  handleNameInput(e) {
    let value = e.target.value;

    // Разрешаем только буквы, пробелы, дефисы и апострофы
    value = value.replace(/[^a-zA-Z\s\-']/g, '');

    // Ограничиваем длину
    if (value.length > 50) {
      value = value.slice(0, 50);
    }

    e.target.value = value;
    this.formData.name = value;

    // Валидация в реальном времени
    if (value.length > 0) {
      this.validateName();
    }
  }

  handlePhoneInput(e) {
    let value = e.target.value;

    // Убираем все символы кроме цифр
    const digitsOnly = value.replace(/\D/g, '');

    // Форматируем номер телефона США: +1 (XXX) XXX-XXXX
    let formatted = '+1 (';

    if (digitsOnly.length > 1) {
      formatted += digitsOnly.substring(1, 4);
    }

    if (digitsOnly.length >= 4) {
      formatted += ') ' + digitsOnly.substring(4, 7);
    }

    if (digitsOnly.length >= 7) {
      formatted += '-' + digitsOnly.substring(7, 11);
    }

    // Если введен только +1 (, то показываем placeholder
    if (digitsOnly.length <= 1) {
      formatted = '+1 (';
    }

    e.target.value = formatted;
    this.formData.phone = formatted;

    // Валидация в реальном времени
    if (digitsOnly.length >= 11) {
      this.validatePhone();
    }
  }

  handleEmailInput(e) {
    let value = e.target.value;

    // Базовая очистка - убираем пробелы в начале и конце
    value = value.trim();

    e.target.value = value;
    this.formData.email = value;

    // Валидация в реальном времени
    if (value.length > 0 && value.includes('@')) {
      this.validateEmail();
    }
  }

  handleFileUpload(e) {
    const files = Array.from(e.target.files);

    // Проверяем размер файлов (максимум 10MB на файл)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    this.formData.files = [...this.formData.files, ...validFiles];
    this.updateFileList();
  }

  updateFileList() {
    // Создаем или обновляем список файлов
    let fileList = this.modal.querySelector('.modal-form__file-list');

    if (!fileList) {
      fileList = document.createElement('div');
      fileList.className = 'modal-form__file-list';
      this.fileButton.parentNode.appendChild(fileList);
    }

    fileList.innerHTML = '';

    this.formData.files.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'modal-form__file-item';

      fileItem.innerHTML = `
        <span>${file.name}</span>
        <button type="button" class="modal-form__file-remove" data-index="${index}">×</button>
      `;

      // Обработчик удаления файла
      const removeBtn = fileItem.querySelector('.modal-form__file-remove');
      removeBtn.addEventListener('click', () => {
        this.removeFile(index);
      });

      fileList.appendChild(fileItem);
    });
  }

  removeFile(index) {
    this.formData.files.splice(index, 1);
    this.updateFileList();
  }

  validateName() {
    const name = this.formData.name.trim();

    if (!name) {
      this.showFieldError('name', 'This field is required');
      return false;
    }

    if (name.length < 2) {
      this.showFieldError('name', 'Name must be at least 2 characters long');
      return false;
    }

    this.clearFieldError('name');
    this.validationState.name = true;
    return true;
  }

  validatePhone() {
    const phone = this.formData.phone;

    if (!phone || phone === '+1 (') {
      this.showFieldError('phone', 'This field is required');
      return false;
    }

    // Проверяем формат US телефона
    const phonePattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

    if (!phonePattern.test(phone)) {
      this.showFieldError('phone', 'Please enter a valid US phone number');
      return false;
    }

    this.clearFieldError('phone');
    this.validationState.phone = true;
    return true;
  }

  validateEmail() {
    const email = this.formData.email.trim();

    if (!email) {
      this.showFieldError('email', 'This field is required');
      return false;
    }

    // Проверяем формат email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      this.showFieldError('email', 'Please enter a valid email address');
      return false;
    }

    this.clearFieldError('email');
    this.validationState.email = true;
    return true;
  }

  showFieldError(field, message) {
    const input = this[`${field}Input`];
    const errorElement = this[`${field}Error`];

    if (input) {
      input.classList.add(`modal-form__input--error`);
    }

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('modal-form__error--visible');
    }

    this.validationState[field] = false;
    this.updateSubmitButton();
  }

  clearFieldError(field) {
    const input = this[`${field}Input`];
    const errorElement = this[`${field}Error`];

    if (input) {
      input.classList.remove(`modal-form__input--error`);
    }

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('modal-form__error--visible');
    }
  }

  updateSubmitButton() {
    const isFormValid = Object.values(this.validationState).every(Boolean);

    if (this.submitButton) {
      this.submitButton.disabled = !isFormValid;

      if (!isFormValid) {
        this.submitButton.classList.add('modal-form__submit--disabled');
      } else {
        this.submitButton.classList.remove('modal-form__submit--disabled');
      }
    }
  }

  handleSubmit() {
    // Валидируем все поля
    const isNameValid = this.validateName();
    const isPhoneValid = this.validatePhone();
    const isEmailValid = this.validateEmail();

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      // Фокусируемся на первом поле с ошибкой
      if (!isNameValid) {
        this.nameInput.focus();
      } else if (!isPhoneValid) {
        this.phoneInput.focus();
      } else if (!isEmailValid) {
        this.emailInput.focus();
      }
      return;
    }

    this.submitForm();
  }

  async submitForm() {
    try {
      // Блокируем кнопку во время отправки
      if (this.submitButton) {
        this.submitButton.disabled = true;
      }

      console.log('Submitting form data:', this.formData);

      // Имитация отправки на сервер
      await this.simulateApiCall(this.formData);

      // Успешная отправка
      this.handleSubmitSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
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
  simulateApiCall(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Имитируем успешный ответ
        if (Math.random() > 0.1) {
          // 90% успеха
          resolve({
            success: true,
            message: 'Form submitted successfully',
            data: formData,
          });
        } else {
          reject(new Error('Server error occurred'));
        }
      }, 1500);
    });
  }

  handleSubmitSuccess() {
    console.log('Form submitted successfully');

    // Закрываем текущий модал
    this.close();

    // Открываем модал успеха, передавая данные формы
    setTimeout(() => {
      openSuccessModal(this.formData);
    }, 300); // Небольшая задержка для плавного перехода

    // Генерируем событие для внешних обработчиков
    this.modal.dispatchEvent(
      new CustomEvent('form:submitted', {
        detail: {
          formData: this.formData,
          modal: this,
        },
        bubbles: true,
      })
    );
  }

  handleSubmitError(error) {
    console.error('Form submission error:', error);

    // Показываем ошибку пользователю
    alert(error.message || 'An error occurred while submitting the form. Please try again.');
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
    }

    // Сбрасываем данные формы
    this.formData = {
      zipcode: '',
      issue: '',
      name: '',
      phone: '',
      email: '',
      files: [],
    };

    // Сбрасываем состояние валидации
    this.validationState = {
      name: false,
      phone: false,
      email: false,
    };

    // Очищаем ошибки
    this.clearFieldError('name');
    this.clearFieldError('phone');
    this.clearFieldError('email');

    // Сбрасываем список файлов
    const fileList = this.modal.querySelector('.modal-form__file-list');
    if (fileList) {
      fileList.remove();
    }

    // Обновляем кнопку
    this.updateSubmitButton();
  }

  // Методы для внешнего API
  setZipcode(zipcode) {
    this.formData.zipcode = zipcode;
  }

  getFormData() {
    return { ...this.formData };
  }

  isFormValid() {
    return Object.values(this.validationState).every(Boolean);
  }
}

/**
 * Инициализация модального окна формы записи
 */
export function initFormModal() {
  // Ищем существующий модал в DOM
  const formModalElement = document.querySelector('[data-modal="form"]');

  if (!formModalElement) {
    console.error('Form modal element not found in DOM');
    return null;
  }

  // Создаем экземпляр модала и регистрируем в менеджере
  const formModal = new FormModal(formModalElement);
  modalManager.register('form', formModal);

  return formModal;
}

/**
 * Функция для программного открытия модала формы
 */
export function openFormModal(zipcode = '') {
  const modal = modalManager.get('form');
  if (modal && zipcode) {
    modal.setZipcode(zipcode);
  }
  modalManager.open('form');
}

/**
 * Функция для программного закрытия модала формы
 */
export function closeFormModal() {
  modalManager.close('form');
}
