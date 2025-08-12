export function initMainHero() {
  console.log('initMainHero');

  const primaryButton = document.querySelector('.main-hero__cta-button--primary');

  if (primaryButton) {
    primaryButton.addEventListener('click', handlePrimaryButtonClick);
  }

  function handlePrimaryButtonClick() {
    // Обработка клика по основной кнопке
    console.log('Primary button clicked');
  }
}
