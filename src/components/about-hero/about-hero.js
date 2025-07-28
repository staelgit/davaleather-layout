import { initSwiper } from '../../js/swiper-init';

// объявляем функцию для инициализации компонента about-hero
export function initAboutHero() {
  console.log('initAboutHero');
  const btn = document.querySelector('.about-hero__cta');
  if (btn) {
    btn.addEventListener('click', () => {
      console.log('clicked "Let’s work together!"');
    });
  }

  // Инициализация Swiper для галереи about-hero
  const swiperMediaQuery = window.matchMedia('(max-width: 767px)');
  let aboutHeroSwiper;

  function handleSwiperChange(e) {
    if (e.matches && !aboutHeroSwiper) {
      aboutHeroSwiper = initSwiper('.about-hero__gallery-slider', {
        navigation: {
          nextEl: '.about-hero__gallery-next',
          prevEl: '.about-hero__gallery-prev',
        },
        slidesPerView: 1.2,
        spaceBetween: 25,
        loop: true,
      });
    } else if (!e.matches && aboutHeroSwiper) {
      aboutHeroSwiper.destroy(true, true);
      aboutHeroSwiper = undefined;
    }
  }

  // Слушаем изменения
  swiperMediaQuery.addEventListener('change', handleSwiperChange);

  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', function () {
    handleSwiperChange(swiperMediaQuery);
  });
}
