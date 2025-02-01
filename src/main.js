import './js/dark-theme.js';
import { refs } from './js/refs.js';
import { renderFilteredTasks } from './js/render-tasks.js';
import {
  addDataToLocalstorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from './js/localstorage.js';

let tasksArr = getDataFromLocalStorage('tasks') || [];
let currentFilter = 'all';

if (tasksArr.length) {
  refs.textContentOfEmptyList.classList.add('is-hidden');
  renderFilteredTasks(tasksArr, currentFilter);

  refs.clearTasksBtn.disabled = false;

  refs.clearTasksBtn.addEventListener('click', () => {
    tasksArr = [];
    refs.tasksListEl.innerHTML = '';
    refs.textContentOfEmptyList.classList.remove('is-hidden');
    removeDataFromLocalStorage('tasks');
    refs.clearTasksBtn.disabled = true;
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const inputValue = refs.formEl.elements.task.value.trim();

  if (inputValue === '') return;

  const taskObj = {
    text: inputValue,
    completed: false,
  };

  tasksArr.push(taskObj);

  renderFilteredTasks(tasksArr, currentFilter);
  refs.textContentOfEmptyList.classList.add('is-hidden');

  addDataToLocalstorage('tasks', tasksArr);

  if (tasksArr.length) {
    refs.clearTasksBtn.disabled = false;

    refs.clearTasksBtn.addEventListener('click', () => {
      tasksArr = [];
      refs.tasksListEl.innerHTML = '';
      refs.textContentOfEmptyList.classList.remove('is-hidden');
      removeDataFromLocalStorage('tasks');
      refs.clearTasksBtn.disabled = true;
    });
  }

  event.currentTarget.reset();
}

refs.formEl.addEventListener('submit', onFormSubmit);

export function delateTask(tasks, idx) {
  tasksArr = tasks.filter((_, i) => i !== idx);

  addDataToLocalstorage('tasks', tasksArr);
  renderFilteredTasks(tasksArr, currentFilter);

  if (!refs.tasksListEl.children.length) {
    refs.textContentOfEmptyList.classList.remove('is-hidden');
  }
}

refs.filters.forEach(btn => {
  btn.addEventListener('click', event => {
    document.querySelector('.js-filter-btn.active').classList.remove('active');
    event.target.classList.add('active');

    currentFilter = event.target.id;
    renderFilteredTasks(tasksArr, currentFilter);
  });
});
