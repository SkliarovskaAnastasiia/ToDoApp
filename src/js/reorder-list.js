import { refs } from './refs';

export function addDraggingClass() {
  refs.tasksListEl.addEventListener('dragstart', event => {
    if (event.target.tagName === 'LI')
      setTimeout(() => event.target.classList.add('dragging'), 0);
  });

  refs.tasksListEl.addEventListener('dragend', event => {
    if (event.target.tagName === 'LI')
      event.target.classList.remove('dragging');
  });
}

export function dragoverListEl(event) {
  event.preventDefault();

  const draggingItem = refs.tasksListEl.querySelector('.dragging');

  const siblings = [
    ...refs.tasksListEl.querySelectorAll('.js-list-item:not(.dragging)'),
  ];

  let nextSibling = siblings.find(
    sibling =>
      event.clientY <=
      sibling.getBoundingClientRect().top + sibling.offsetHeight / 2
  );

  refs.tasksListEl.insertBefore(draggingItem, nextSibling);
}
