/**
 *  DOM helper functions.
 */

/**
 * Convert an array of class names into a string for the `class`
 * attribute.
 *
 * @param classes Array of css classes to convert for html attribute.
 */
export const expandClasses = (classes: Array<string>): string =>
  classes.join(' ');

/**
 * Search the parent nodes of the element to find an parent
 * that has the given class.
 *
 * @param element DOM element to start search from.
 * @param classname CSS class to search for.
 */
export const findParentByClassname = (
  element: HTMLElement | null,
  classname: string
): HTMLElement | null => {
  while (element && !element.classList.contains(classname)) {
    element = element.parentElement;
  }
  return element;
};

export const findParentDraggable = (
  target: HTMLElement | null
): HTMLElement | null => {
  // Use the event target to traverse until the draggable element is found.
  let isDraggable = false;
  while (target && !isDraggable) {
    isDraggable = target.getAttribute('draggable') === 'true';
    if (!isDraggable) {
      target = target.parentElement;
    }
  }
  return target;
};
