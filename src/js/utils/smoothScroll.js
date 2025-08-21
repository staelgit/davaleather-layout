/**
 * Smoothly scroll to the specified element
 *
 * @param {HTMLElement} element - Element to scroll to
 * @param {number} [duration=400] - Duration of the scroll in milliseconds
 * @param {number} [offset=0] - Offset from the top of the element to scroll to
 */
export function smoothScrollToElement(element, duration = 400, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);

    window.scrollTo(0, startPosition + distance * percentage);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
