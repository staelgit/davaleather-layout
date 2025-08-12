/**
 * Базовый класс для модальных окон
 */
export class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.backdrop = this.modal.querySelector('.modal__backdrop');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.content = this.modal.querySelector('.modal__content');

    this.isOpen = false;
    this.onOpenCallbacks = [];
    this.onCloseCallbacks = [];

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Закрытие по клику на backdrop
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Закрытие по кнопке
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Закрытие по Escape
    this.handleEscape = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };

    // Предотвращение закрытия при клике на контент
    if (this.content) {
      this.content.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;

    // Сохраняем и компенсируем ширину scrollbar
    this.lockBodyScroll();

    // Показываем модал
    this.modal.classList.add('modal--active');

    // Добавляем обработчик Escape
    document.addEventListener('keydown', this.handleEscape);

    // Фокус на модале для доступности
    this.modal.setAttribute('tabindex', '-1');
    this.modal.focus();

    // Вызываем коллбеки
    this.onOpenCallbacks.forEach((callback) => callback());

    // Событие для внешних обработчиков
    this.modal.dispatchEvent(
      new CustomEvent('modal:open', {
        detail: { modal: this },
      })
    );
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Восстанавливаем скролл
    this.unlockBodyScroll();

    // Скрываем модал
    this.modal.classList.remove('modal--active');

    // Удаляем обработчик Escape
    document.removeEventListener('keydown', this.handleEscape);

    // Убираем фокус
    this.modal.removeAttribute('tabindex');

    // Вызываем коллбеки
    this.onCloseCallbacks.forEach((callback) => callback());

    // Событие для внешних обработчиков
    this.modal.dispatchEvent(
      new CustomEvent('modal:close', {
        detail: { modal: this },
      })
    );
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  // Методы для добавления коллбеков
  onOpen(callback) {
    this.onOpenCallbacks.push(callback);
    return this;
  }

  onClose(callback) {
    this.onCloseCallbacks.push(callback);
    return this;
  }

  // Методы для работы со скроллом
  lockBodyScroll() {
    // Получаем ширину scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Сохраняем текущие стили body
    this.originalBodyStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    // Сохраняем стили positioned элементов
    this.originalFixedElementsStyles = [];

    // Список известных positioned элементов для оптимизации
    const positionedSelectors = [
      '.header',
      '.header__nav', // мобильная навигация
      '[style*="position: fixed"]',
      '[style*="position:fixed"]',
      '[style*="position: absolute"]',
      '[style*="position:absolute"]',
    ];

    const positionedElements = [];

    // Собираем элементы по селекторам
    positionedSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!positionedElements.includes(element)) {
          positionedElements.push(element);
        }
      });
    });

    // Дополнительно проверяем computed styles для найденных элементов
    const finalElements = positionedElements.filter((element) => {
      const computedStyle = getComputedStyle(element);
      const position = computedStyle.position;
      return position === 'fixed' || position === 'absolute' || position === 'sticky';
    });

    finalElements.forEach((element) => {
      this.originalFixedElementsStyles.push({
        element,
        paddingRight: element.style.paddingRight,
      });
    });

    // Блокируем скролл и компенсируем ширину scrollbar
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Компенсируем ширину scrollbar для positioned элементов
      finalElements.forEach((element) => {
        const currentPaddingRight = parseInt(getComputedStyle(element).paddingRight, 10) || 0;
        element.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      });
    }

    // Добавляем класс для дополнительных стилей
    document.body.classList.add('modal-open');
  }

  unlockBodyScroll() {
    // Восстанавливаем оригинальные стили body
    if (this.originalBodyStyle) {
      document.body.style.overflow = this.originalBodyStyle.overflow;
      document.body.style.paddingRight = this.originalBodyStyle.paddingRight;
    }

    // Восстанавливаем стили fixed элементов
    if (this.originalFixedElementsStyles) {
      this.originalFixedElementsStyles.forEach(({ element, paddingRight }) => {
        element.style.paddingRight = paddingRight;
      });
      this.originalFixedElementsStyles = [];
    }

    // Убираем класс
    document.body.classList.remove('modal-open');
  }

  // Уничтожение модала
  destroy() {
    this.close();
    document.removeEventListener('keydown', this.handleEscape);

    // Удаляем из DOM
    if (this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
  }
}

/**
 * Менеджер модальных окон
 */
export class ModalManager {
  constructor() {
    this.modals = new Map();
    this.init();
  }

  init() {
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Обработчик для атрибута data-modal-open
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-open]');
      if (trigger) {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal-open');
        this.open(modalId);
      }
    });

    // Обработчик для атрибута data-modal-close
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-close]');
      if (trigger) {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal-close');
        if (modalId) {
          this.close(modalId);
        } else {
          // Закрываем все открытые модалы
          this.closeAll();
        }
      }
    });
  }

  register(modalId, modalInstance) {
    this.modals.set(modalId, modalInstance);
    return this;
  }

  unregister(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.destroy();
      this.modals.delete(modalId);
    }
    return this;
  }

  get(modalId) {
    return this.modals.get(modalId);
  }

  open(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.open();
    } else {
      console.warn(`Modal with id "${modalId}" not found`);
    }
    return this;
  }

  close(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.close();
    }
    return this;
  }

  closeAll() {
    this.modals.forEach((modal) => modal.close());
    return this;
  }

  toggle(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.toggle();
    }
    return this;
  }
}

// Создаем глобальный экземпляр менеджера
export const modalManager = new ModalManager();

// Экспортируем для глобального доступа
window.modalManager = modalManager;
