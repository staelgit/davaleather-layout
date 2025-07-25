export function initAboutHero() {
  // Здесь можно добавить интерактив для about-компонента
  // Например, обработчик кнопки "Let’s work together!"
  console.log('initAboutHero');
  const btn = document.querySelector('.about-hero__cta');
  if (btn) {
    btn.addEventListener('click', () => {
      // TODO: добавить действие (например, скролл к контактам или форма)
      // window.location.href = '/#contacts';
      console.log('clicked "Let’s work together!"');
    });
  }
}
