import './js/dark-theme.js';
import { refs } from './js/refs.js';
import { renderFilteredTasks } from './js/render-tasks.js';
import {
  addDataToLocalstorage,
  getDataFromLocalStorage,
} from './js/localstorage.js';

export let tasksArr = getDataFromLocalStorage('tasks') || [];
export let currentFilter = 'all';

if (tasksArr.length) {
  refs.textContentOfEmptyList.classList.add('is-hidden');
  renderFilteredTasks(currentFilter);

  refs.clearTasksBtn.addEventListener('click', onClearBtn);
}

function onFormSubmit(event) {
  event.preventDefault();

  const inputValue = refs.formEl.elements.task.value.trim();

  if (inputValue === '') return;

  const taskObj = {
    id: Date.now(),
    text: inputValue,
    completed: false,
  };

  tasksArr.push(taskObj);

  renderFilteredTasks(currentFilter);
  refs.textContentOfEmptyList.classList.add('is-hidden');

  addDataToLocalstorage('tasks', tasksArr);

  refs.clearTasksBtn.addEventListener('click', onClearBtn);

  event.currentTarget.reset();
}

refs.formEl.addEventListener('submit', onFormSubmit);

function onClearBtn() {
  if (currentFilter === 'all') {
    tasksArr = [];
  } else if (currentFilter === 'active') {
    tasksArr = tasksArr.filter(task => task.completed);
  } else if (currentFilter === 'completed') {
    tasksArr = tasksArr.filter(task => !task.completed);
  }

  addDataToLocalstorage('tasks', tasksArr);
  renderFilteredTasks(currentFilter);

  if (!tasksArr.length) {
    refs.textContentOfEmptyList.classList.toggle('is-hidden');

    refs.clearTasksBtn.disabled = true;
  }
}

export function delateTask(taskId) {
  tasksArr = tasksArr.filter(task => task.id !== taskId);

  addDataToLocalstorage('tasks', tasksArr);
  renderFilteredTasks(currentFilter);

  if (!refs.tasksListEl.children.length) {
    refs.textContentOfEmptyList.classList.remove('is-hidden');
  }
}

refs.filters.forEach(btn => {
  btn.addEventListener('click', event => {
    document.querySelector('.js-filter-btn.active').classList.remove('active');
    event.target.classList.add('active');

    currentFilter = event.target.id;
    renderFilteredTasks(currentFilter);
  });
});

export function updateTaskList() {
  tasksArr = [...refs.tasksListEl.querySelectorAll('.js-list-item')].map(
    item => {
      return {
        id: item.id,
        text: item.querySelector('.task-text').textContent,
        completed: item.querySelector('.js-checkbox').checked,
      };
    }
  );

  console.log(tasksArr);

  addDataToLocalstorage('tasks', tasksArr);
}
