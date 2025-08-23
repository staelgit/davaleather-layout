import { initSwiper } from '../../libs/swiper/swiper-init';

export function initReviews() {
  console.log('initReviews');

  initReviewsSwiper();
  initReviewsTabs();

  function initReviewsSwiper() {
    console.log('initReviewsSwiper');

    initSwiper('.reviews__slider', {
      navigation: {
        nextEl: '.reviews__nav-next',
        prevEl: '.reviews__nav-prev',
      },
      slidesPerView: 1,
      spaceBetween: 15,
      loop: false,
      breakpoints: {
        // when window width is <= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      },
    });
  }

  function initReviewsTabs() {
    const tabs = document.querySelector('.reviews__tabs');

    if (!tabs) return;

    tabs.addEventListener('click', (event) => {
      const target = event.target.closest('button.reviews__tab');

      if (!target || !tabs.contains(target)) return;

      if (target.classList.contains('reviews__tab--active')) return;

      const currentActive = tabs.querySelector('.reviews__tab--active');

      if (currentActive) currentActive.classList.remove('reviews__tab--active');

      target.classList.add('reviews__tab--active');

      const source = target.dataset.source;

      changeTab(source);
    });

    function changeTab(source) {
      console.log('changeTab', source);
    }
  }
}
