const COMPONENT_SELECTOR = '.residential-price';
const ITEM_SELECTOR = '[data-residential-price-item]';
const TRIGGER_SELECTOR = '[data-residential-price-trigger]';
const PANEL_SELECTOR = '[data-residential-price-panel]';

export function initResidentialPrice() {
  const components = document.querySelectorAll(COMPONENT_SELECTOR);

  if (!components.length) {
    return;
  }

  components.forEach((component, componentIndex) => {
    const items = Array.from(component.querySelectorAll(ITEM_SELECTOR));

    const preselectedItem =
      items.find((item) => item.classList.contains('residential-price__item--active')) || items[0];

    if (preselectedItem) {
      setActiveItem(items, preselectedItem);
    }

    items.forEach((item, itemIndex) => {
      const trigger = item.querySelector(TRIGGER_SELECTOR);
      const panel = item.querySelector(PANEL_SELECTOR);

      if (!trigger || !panel) {
        return;
      }

      const triggerId = `residential-price-trigger-${componentIndex + 1}-${itemIndex + 1}`;
      const panelId = `residential-price-panel-${componentIndex + 1}-${itemIndex + 1}`;

      trigger.id = trigger.id || triggerId;
      panel.id = panel.id || panelId;

      trigger.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', trigger.id);

      const isOpen = item.classList.contains('residential-price__item--open');
      updatePanelState({ item, trigger, panel, expand: isOpen });

      trigger.addEventListener('click', () => {
        const currentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const nextExpandState = !currentlyExpanded;

        setActiveItem(items, item);

        if (nextExpandState) {
          closeAllExcept(items, item);
        }

        updatePanelState({ item, trigger, panel, expand: nextExpandState });
      });
    });
  });
}

function setActiveItem(items, activeItem) {
  items.forEach((listItem) => {
    if (listItem === activeItem) {
      listItem.classList.add('residential-price__item--active');
    } else {
      listItem.classList.remove('residential-price__item--active');
    }
  });
}

function closeAllExcept(items, exception) {
  items.forEach((listItem) => {
    if (listItem === exception) {
      return;
    }

    const trigger = listItem.querySelector(TRIGGER_SELECTOR);
    const panel = listItem.querySelector(PANEL_SELECTOR);

    if (!trigger || !panel) {
      return;
    }

    updatePanelState({ item: listItem, trigger, panel, expand: false });
  });
}

function updatePanelState({ item, trigger, panel, expand }) {
  trigger.setAttribute('aria-expanded', String(expand));

  if (expand) {
    panel.hidden = false;
    item.classList.add('residential-price__item--open');
  } else {
    panel.hidden = true;
    item.classList.remove('residential-price__item--open');
  }
}
