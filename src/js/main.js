// Точка входа для JS. Здесь будут импортироваться скрипты компонентов и страниц.
import { initHeader } from '../components/header/header.js';
import { initFooter } from '../components/footer/footer.js';
import { initContacts } from '../components/contacts/contacts.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('initMain');
  initHeader();
  initContacts();
  initFooter();
});
