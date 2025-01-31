import './js/dark-theme.js';
import { refs } from './js/refs.js';
import { renderTask } from './js/render-tasks.js';

const onFormSubmit = event => {
  event.preventDefault();

  const inputValue = refs.formEl.elements.task.value.trim();

  if (inputValue === '') return;

  renderTask(inputValue);
  refs.textContentOfEmptyList.classList.add('is-hidden');

  event.currentTarget.reset();
};

refs.formEl.addEventListener('submit', onFormSubmit);

// if (refs.tasksListEl.childElementCount > 1) {
//   refs.clearTasksBtn.disabled = false;
//   refs.clearTasksBtn.addEventListener('click', () => {
//     refs.tasksListEl.innerHTML =
//       '<p class="epmty-item js-empty-item">List is empty</p>';
//   });
// }
