import { initSwiper } from '../../libs/swiper/swiper-init';

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

  initAboutHeroSwiper();

  function initAboutHeroSwiper() {
    console.log('initAboutHeroSwiper');

    initSwiper('.about-hero__gallery', {
      navigation: {
        nextEl: '.about-hero__gallery-next',
        prevEl: '.about-hero__gallery-prev',
      },
      slidesPerView: 1.107,
      spaceBetween: 20,
      loop: false,
    });
  }
}
