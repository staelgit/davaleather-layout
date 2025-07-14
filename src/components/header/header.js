export function initHeader() {
  console.log('initHeader');
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('header__nav--open');
      document.body.classList.toggle('menu-open');
    });
  }
}
