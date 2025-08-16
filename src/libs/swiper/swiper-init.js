import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export function initSwiper(selector, options = {}) {
  return new Swiper(selector, {
    modules: [Navigation, Pagination],
    ...options,
  });
}
