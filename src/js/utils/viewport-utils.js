/**
 * Проверяет, полностью ли элемент виден во viewport
 * @param {HTMLElement} element - DOM элемент для проверки
 * @returns {boolean} - true если элемент полностью в viewport
 */
export function isElementFullyInViewport(element) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth
  );
}

/**
 * Проверяет, частично ли элемент виден во viewport
 * @param {HTMLElement} element - DOM элемент для проверки
 * @param {number} threshold - порог видимости (0-1)
 * @returns {boolean} - true если элемент хотя бы частично в viewport
 */
export function isElementInViewport(element, threshold = 0) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalVisible = rect.top <= windowHeight && rect.bottom >= 0;
  const horizontalVisible = rect.left <= windowWidth && rect.right >= 0;

  if (threshold > 0) {
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight / elementHeight;

    return verticalVisible && horizontalVisible && visibleRatio >= threshold;
  }

  return verticalVisible && horizontalVisible;
}
