import { smoothScrollToElement } from '../../js/utils/smoothScroll';
import { isElementFullyInViewport } from '../../js/utils/viewport-utils';

export function initFooter() {
  console.log('initFooter');

  addContactLinkHandler();
  addReviewsLinkHandler();

  function addContactLinkHandler() {
    console.log('addContactLinkHandler');
    const contactsLink = document.querySelector('.footer__contacts-link');
    const contactsSection = document.querySelector('.contacts__info');

    contactsLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Проверяем, полностью ли элемент виден во viewport
      const isFullyVisible = isElementFullyInViewport(contactsSection);

      if (isFullyVisible) {
        // Элемент уже полностью виден - просто запускаем анимацию
        triggerHighlightAnimation(contactsSection);
      } else {
        // Элемент не виден или виден частично - прокручиваем и затем анимируем
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Элемент стал видимым после прокрутки - запускаем анимацию
                triggerHighlightAnimation(contactsSection);
                observer.disconnect(); // Отключаем observer после выполнения
              }
            });
          },
          { threshold: 1.0 }
        ); // Сработает, когда 100% элемента будет видно

        // Начинаем наблюдение
        observer.observe(contactsSection);

        // Прокрутка к секции контактов
        smoothScrollToElement(contactsSection);
      }
    });
  }

  // Функция для запуска анимации
  function triggerHighlightAnimation(element) {
    element.classList.add('contacts__highlight');

    setTimeout(function () {
      element.classList.remove('contacts__highlight');
    }, 2000);
  }

  function addReviewsLinkHandler() {
    console.log('addReviewsLinkHandler');
    const reviewsLink = document.querySelector('.footer__reviews-link');
    const reviewsSection = document.querySelector('.reviews');

    if (!reviewsLink || !reviewsSection) return;

    reviewsLink.addEventListener('click', function (e) {
      const isMainPage =
        window.location.pathname === '/' ||
        window.location.pathname === '/davaleather-layout' ||
        window.location.pathname === '/davaleather-layout/';

      if (isMainPage) {
        e.preventDefault();
        console.log('reviewsLink clicked');

        smoothScrollToElement(reviewsSection);
      }
    });
  }
}
