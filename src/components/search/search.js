export function initSearch() {
  console.log('initSearch');
  const search = document.querySelector('.search');
  const searchInput = search?.querySelector('.search__input');
  const searchCloseBtn = search?.querySelector('.search__close');
  const body = document.body;

  if (!search) {
    console.warn('Search component not found');
    return null;
  }

  // Функция открытия поиска
  function openSearch() {
    search.classList.add('search--active');

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
    search.classList.remove('search--active');

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
    if (search.classList.contains('search--active')) {
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
    if (event.target === search || event.target.classList.contains('search__overlay')) {
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
    if (search.classList.contains('search--active')) {
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
