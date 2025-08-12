// Точка входа для JS. Здесь будут импортироваться скрипты компонентов и страниц.
import { initHeader } from '../components/header/header.js';
import { initAboutHero } from '../components/about-hero/about-hero.js';
import { initMainHero } from '../components/main-hero/main-hero.js';
import { initContacts } from '../components/contacts/contacts.js';
import { initFooter } from '../components/footer/footer.js';
import { initPhoneModal } from '../components/modal-phone/modal-phone.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('initMain');

  // Инициализируем модалы в первую очередь
  initPhoneModal();

  // Затем остальные компоненты
  initHeader();
  initAboutHero();
  initMainHero();
  initContacts();
  initFooter();
});
