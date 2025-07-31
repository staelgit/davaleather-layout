export function initHeader() {
  console.log('initHeader');
  const header = document.querySelector('.header');
  const burgerBtn = header?.querySelector('.header__mobile-btn--burger');
  const closeBtn = header?.querySelector('.header__mobile-menu-btn--close');
  const mobileMenu = header?.querySelector('.header__mobile-menu');
  const body = document.body;

  // Функция открытия мобильного меню
  function openMobileMenu() {
    if (!header || !mobileMenu) return;

    header.classList.add('header--mobile-menu-open');
    mobileMenu.classList.add('header__mobile-menu--active');
    body.style.overflow = 'hidden';

    // Добавляем обработчик для закрытия по клику вне меню
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
  }

  // Функция закрытия мобильного меню
  function closeMobileMenu() {
    if (!header || !mobileMenu) return;

    header.classList.remove('header--mobile-menu-open');
    mobileMenu.classList.remove('header__mobile-menu--active');
    body.style.overflow = '';

    // Удаляем обработчики
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscapeKey);
  }

  // Обработчик клика вне мобильного меню
  function handleOutsideClick(event) {
    if (!mobileMenu?.contains(event.target) && !burgerBtn?.contains(event.target)) {
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

  // Обработчик клика по кнопке закрытия
  function handleCloseClick(event) {
    event.preventDefault();
    event.stopPropagation();
    closeMobileMenu();
  }

  // Обработчик клика по ссылкам в мобильном меню
  function handleMobileLinkClick(event) {
    const link = event.target.closest('.header__mobile-nav-link');
    if (link && !link.classList.contains('header__mobile-nav-link--services')) {
      closeMobileMenu();
    }
  }

  // Обработчик клика по иконкам поиска и телефона
  function handleActionClick(event) {
    const btn = event.target.closest('.header__action-btn, .header__mobile-btn');
    if (!btn) return;

    event.preventDefault();

    if (
      btn.classList.contains('header__action-btn--search') ||
      btn.classList.contains('header__mobile-btn--search')
    ) {
      // Логика для поиска
      console.log('Search clicked');
    } else if (
      btn.classList.contains('header__action-btn--phone') ||
      btn.classList.contains('header__mobile-btn--phone')
    ) {
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

    // Кнопка закрытия
    if (closeBtn) {
      closeBtn.addEventListener('click', handleCloseClick);
    }

    // Ссылки в мобильном меню
    if (mobileMenu) {
      mobileMenu.addEventListener('click', handleMobileLinkClick);
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
