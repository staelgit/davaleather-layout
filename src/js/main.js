// Точка входа для JS. Здесь будут импортироваться скрипты компонентов и страниц.
import { initHeader } from '../components/header/header.js';
import { initFooter } from '../components/footer/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  // Ваш JS-код
  console.log('main.js загружен');
});
