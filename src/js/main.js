// Точка входа для JS. Здесь будут импортироваться скрипты компонентов и страниц.
import { initHeader } from '../components/header/header.js';
import { initAboutHero } from '../components/about-hero/about-hero.js';
import { initMainHero } from '../components/main-hero/main-hero.js';
import { initContacts } from '../components/contacts/contacts.js';
import { initFooter } from '../components/footer/footer.js';
import { initPhoneModal } from '../components/modals/modal-phone/modal-phone.js';
import { initZipcodeModal } from '../components/modals/modal-zipcode/modal-zipcode.js';
import { initFormModal } from '../components/modals/modal-form/modal-form.js';
import { initSuccessModal } from '../components/modals/modal-success/modal-success.js';
import { initHelpRequest } from '../components/help-request/help-request.js';
import { initReviews } from '../components/reviews/reviews.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('initMain');

  // Инициализируем модалы в первую очередь
  initPhoneModal();
  initZipcodeModal();
  initFormModal();
  initSuccessModal();

  // Затем остальные компоненты
  initHeader();
  initAboutHero();
  initMainHero();
  initReviews();
  initHelpRequest();
  initContacts();
  initFooter();
});
