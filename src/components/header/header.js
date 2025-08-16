export function initHeader() {
  console.log('initHeader');
  const header = document.querySelector('.header');
  const burgerBtn = header?.querySelector('.header__action-btn--burger');
  const servicesDropdown = header?.querySelector('.header__nav-item--has-dropdown');
  const body = document.body;
  const searchManager = initSearch();

  function initSearch(searchId = 'header__search') {
    console.log('initSearch');
    const search = document.querySelector(`.${searchId}`);
    const searchInput = search?.querySelector('.header__search-input');
    const searchCloseBtn = search?.querySelector('.header__search-close');
    const body = document.body;

    if (!search) {
      console.warn('Search component not found');
      return null;
    }

    // Функция открытия поиска
    function openSearch() {
      search.classList.add('header__search--active');
      body.classList.add('header__search-open');

      // На мобильных блокируем скролл
      if (window.innerWidth < 768) {
        body.style.overflow = 'hidden';
      }

      // Фокусируемся на поле ввода с небольшой задержкой
      setTimeout(() => {
        searchInput?.focus();
      }, 100);

      // Добавляем обработчики для закрытия
      document.addEventListener('keydown', handleEscapeKey);
      search.addEventListener('click', handleOverlayClick);
    }

    // Функция закрытия поиска
    function closeSearch() {
      search.classList.remove('header__search--active');
      body.classList.remove('header__search-open');

      // Восстанавливаем скролл
      body.style.overflow = '';

      // Очищаем поле ввода
      if (searchInput) {
        searchInput.value = '';
        searchInput.blur();
      }

      // Удаляем обработчики
      document.removeEventListener('keydown', handleEscapeKey);
      search.removeEventListener('click', handleOverlayClick);
    }

    // Переключение состояния поиска
    function toggleSearch() {
      if (search.classList.contains('header__search--active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    // Обработчик нажатия Escape
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closeSearch();
      }
    }

    // Обработчик клика по overlay (только для мобильных)
    function handleOverlayClick(event) {
      // Закрываем только если кликнули по overlay или самому контейнеру поиска
      if (event.target === search || event.target.classList.contains('header__search-overlay')) {
        closeSearch();
      }
    }

    // Обработчик кнопки закрытия
    function handleCloseClick(event) {
      event.preventDefault();
      event.stopPropagation();
      closeSearch();
    }

    // Обработчик отправки формы (пока просто логируем)
    function handleSubmit(event) {
      event.preventDefault();
      const query = searchInput?.value.trim();
      if (query) {
        console.log('Search query:', query);
        // Здесь будет логика поиска
        closeSearch();
      }
    }

    // Обработчик нажатия Enter в поле ввода
    function handleInputKeydown(event) {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    }

    // Обработчик изменения размера окна
    function handleResize() {
      if (search.classList.contains('header__search--active')) {
        // Если окно изменилось на десктоп, убираем блокировку скролла
        if (window.innerWidth >= 768) {
          body.style.overflow = '';
        } else {
          // На мобильных блокируем скролл
          body.style.overflow = 'hidden';
        }
      }
    }

    // Инициализация обработчиков
    function initEventListeners() {
      if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', handleCloseClick);
      }

      if (searchInput) {
        searchInput.addEventListener('keydown', handleInputKeydown);
      }

      // Обработчик изменения размера окна
      window.addEventListener('resize', handleResize);
    }

    // Инициализация
    initEventListeners();

    // Возвращаем публичные методы
    return {
      openSearch,
      closeSearch,
      toggleSearch,
    };
  }

  // Функция открытия мобильного меню
  function openMobileMenu() {
    if (!header) return;

    // Закрываем поиск если он открыт
    if (searchManager) {
      searchManager.closeSearch();
    }

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
      // Открываем поиск
      if (searchManager) {
        searchManager.toggleSearch();
      } else {
        console.warn('Search manager not initialized');
      }
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
      // Закрываем поиск если он открыт (будет перерисован в правильном стиле)
      if (searchManager) {
        searchManager.closeSearch();
      }
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
      searchManager,
    };
  }

  return null;
}
