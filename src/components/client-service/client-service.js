import { initSwiper } from '../../libs/swiper/swiper-init';

export function initClientService() {
  console.log('initClientService');

  // Инициализация Swiper для галереи about-hero

  initClientServiceSwiper();

  function initClientServiceSwiper() {
    console.log('initClientServiceSwiper');

    initSwiper('.client-service__gallery', {
      navigation: {
        nextEl: '.client-service__gallery-next',
        prevEl: '.client-service__gallery-prev',
      },
      slidesPerView: 1.107,
      spaceBetween: 20,
      loop: false,
    });
  }
}
