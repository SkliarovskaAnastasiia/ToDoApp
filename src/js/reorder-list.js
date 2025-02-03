import { refs } from './refs';

function addClass(event) {
  const liEl = event.target.closest('.js-list-item');
  if (liEl) setTimeout(() => liEl.classList.add('dragging'), 0);
}

function removeClass(event) {
  const liEl = event.target.closest('.js-list-item');
  if (liEl) liEl.classList.remove('dragging');
}

export function addDraggingClass() {
  refs.tasksListEl.addEventListener('dragstart', addClass);

  refs.tasksListEl.addEventListener('dragend', removeClass);

  refs.tasksListEl.addEventListener('touchstart', addClass);

  refs.tasksListEl.addEventListener('touchend', removeClass);
}

function reorderListEl(event, isTouch) {
  const draggingItem = refs.tasksListEl.querySelector('.dragging');

  const siblings = [
    ...refs.tasksListEl.querySelectorAll('.js-list-item:not(.dragging)'),
  ];

  const clientY = isTouch ? event.touches[0].clientY : event.clientY;

  let nextSibling = siblings.find(
    sibling =>
      clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2
  );

  refs.tasksListEl.insertBefore(draggingItem, nextSibling);
}

export function dragoverListEl(event) {
  event.preventDefault();
  reorderListEl(event, false);
}

export function touchmoveListEl(event) {
  reorderListEl(event, true);
}
