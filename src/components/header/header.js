export function initHeader() {
  console.log('initHeader');
  const header = document.querySelector('.header');
  const burgerBtn = header?.querySelector('.header__action-btn--burger');
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

  // Обработчик клика по ссылкам в навигации
  function handleNavLinkClick(event) {
    const link = event.target.closest('.header__nav-link');
    if (link && !link.classList.contains('header__nav-link--services')) {
      // Закрываем мобильное меню только на мобильных устройствах
      if (window.innerWidth < 768) {
        closeMobileMenu();
      }
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
      // Логика для звонка
      console.log('Phone clicked');
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
    };
  }

  return null;
}

// // Автоматическая инициализация при загрузке DOM
// document.addEventListener('DOMContentLoaded', () => {
//   initHeader();
// });
