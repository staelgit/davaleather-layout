import { initSwiper } from '../../libs/swiper/swiper-init';

export function initResidentialSlider() {
  initResidentialSwiper();

  function initResidentialSwiper() {
    console.log('initResidentialSwiper');

    initSwiper('.residential-slider__gallery', {
      navigation: {
        nextEl: '.residential-slider__gallery-next',
        prevEl: '.residential-slider__gallery-prev',
      },
      slidesPerView: 1.107,
      spaceBetween: 20,
      loop: false,
      breakpoints: {
        480: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }
}
