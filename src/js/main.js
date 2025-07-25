// Точка входа для JS. Здесь будут импортироваться скрипты компонентов и страниц.
import { initHeader } from '../components/header/header.js';
import { initAboutHero } from '../components/about-hero/about-hero.js';
import { initContacts } from '../components/contacts/contacts.js';
import { initFooter } from '../components/footer/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('initMain');
  initHeader();
  initAboutHero();
  initContacts();
  initFooter();
});
