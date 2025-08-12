export function initHeader() {
  console.log('initHeader');
  const header = document.querySelector('.header');
  const burgerBtn = header?.querySelector('.header__action-btn--burger');
  const servicesDropdown = header?.querySelector('.header__nav-item--has-dropdown');
  const body = document.body;

  // Функция открытия мобильного меню
  function openMobileMenu() {
    if (!header) return;

    header.classList.add('header--mobile-menu-open');
    body.style.overflow = 'hidden';

    // Добавляем обработчик для закрытия по клику вне меню
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
  }

  // Функция закрытия мобильного меню
  function closeMobileMenu() {
    if (!header) return;

    header.classList.remove('header--mobile-menu-open');
    body.style.overflow = '';

    // Удаляем обработчики
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscapeKey);
  }

  // Обработчик клика вне мобильного меню
  function handleOutsideClick(event) {
    const nav = header?.querySelector('.header__nav');
    if (!nav?.contains(event.target) && !burgerBtn?.contains(event.target)) {
      closeMobileMenu();
    }
  }

  // Обработчик клика вне выпадающего меню Services
  function handleServicesOutsideClick(event) {
    if (servicesDropdown && !servicesDropdown.contains(event.target)) {
      closeServicesDropdown();
    }
  }

  // Обработчик нажатия клавиши Escape
  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  }

  // Обработчик клика по бургер-кнопке
  function handleBurgerClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (header?.classList.contains('header--mobile-menu-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Функция закрытия выпадающего меню Services
  function closeServicesDropdown() {
    if (servicesDropdown) {
      servicesDropdown.classList.remove('header__nav-item--expanded');
    }
  }

  // Функция переключения выпадающего меню Services
  function toggleServicesDropdown() {
    if (servicesDropdown) {
      servicesDropdown.classList.toggle('header__nav-item--expanded');
    }
  }

  // Обработчик клика по ссылкам в навигации
  function handleNavLinkClick(event) {
    const link = event.target.closest('.header__nav-link');
    if (link && !link.classList.contains('header__nav-link--dropdown-trigger')) {
      // Закрываем мобильное меню только на мобильных устройствах
      if (window.innerWidth < 768) {
        // closeMobileMenu();
      }
    }
  }

  // Обработчик клика по выпадающему меню Services
  function handleServicesDropdownClick(event) {
    const toggleBtn = event.target.closest('[data-dropdown-toggle]');
    if (toggleBtn) {
      event.preventDefault();
      event.stopPropagation();
      toggleServicesDropdown();
    }
  }

  // Обработчик клика по иконкам действий
  function handleActionClick(event) {
    const btn = event.target.closest('.header__action-btn');
    if (!btn) return;

    event.preventDefault();

    if (btn.classList.contains('header__action-btn--search')) {
      // Логика для поиска
      console.log('Search clicked');
    } else if (btn.classList.contains('header__action-btn--phone')) {
      // Открываем модал звонка
      if (window.modalManager) {
        window.modalManager.open('phone');
      } else {
        console.warn('Modal manager not initialized');
      }
    }
  }

  // Инициализация обработчиков событий
  function initEventListeners() {
    // Бургер-кнопка
    if (burgerBtn) {
      burgerBtn.addEventListener('click', handleBurgerClick);
    }

    // Ссылки в навигации
    const nav = header?.querySelector('.header__nav');
    if (nav) {
      nav.addEventListener('click', handleNavLinkClick);
    }

    // Выпадающее меню Services
    if (header) {
      header.addEventListener('click', handleServicesDropdownClick);
      // Обработчик клика вне выпадающего меню
      document.addEventListener('click', handleServicesOutsideClick);
    }

    // Иконки действий
    if (header) {
      header.addEventListener('click', handleActionClick);
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
  }

  // Обработчик изменения размера окна
  function handleResize() {
    if (window.innerWidth >= 768) {
      // lg-up breakpoint
      closeMobileMenu();
    } else {
      // На мобильных устройствах закрываем выпадающее меню Services
      closeServicesDropdown();
    }
  }

  // Функция для программного открытия/закрытия меню (для внешнего использования)
  function toggleMobileMenu() {
    if (header?.classList.contains('header--mobile-menu-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Инициализация
  if (header) {
    initEventListeners();

    // Возвращаем публичные методы
    return {
      openMobileMenu,
      closeMobileMenu,
      toggleMobileMenu,
      closeServicesDropdown,
      toggleServicesDropdown,
    };
  }

  return null;
}
