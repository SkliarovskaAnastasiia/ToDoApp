import { refs } from './refs';
import { addDataToLocalstorage } from './localstorage';
import { delateTask, tasksArr, currentFilter } from '../main';
import { countActiveTasks } from './count-tasks';
import { addDraggingClass, dragoverListEl } from './reorder-list';

function createTaskItem(task, taskIndex) {
  const taskLi = document.createElement('li');
  taskLi.className = 'list-item js-list-item';
  taskLi.id = `task-${task.id}`;
  taskLi.draggable = 'true';
  taskLi.innerHTML = `
  <input class="checkbox js-checkbox visually-hidden" type="checkbox" id="${taskIndex}"/>
  <label class="checkbox-label" for="${taskIndex}">
     <span class="custom-checkbox">
        <svg class="custom-checkbox-icon" width="10px" height="10px">
          <use href="img/icons/symbol-defs.svg#icon-icon-check"></use>
        </svg>
     </span>
     <p class="task-text">${task.text}</p>
  </label>
  <button class="delate-btn" id="btn-${task.id}">
     <svg class="btn-icon">
         <use href="img/icons/symbol-defs.svg#icon-icon-cross"></use>
     </svg>
  </button>
  `;

  return taskLi;
}

function renderTask(tasks) {
  refs.tasksListEl.innerHTML = '';

  if (!tasks.length) {
    refs.textContentOfEmptyList.classList.remove('is-hidden');
    refs.clearTasksBtn.disabled = true;
  } else {
    refs.textContentOfEmptyList.classList.add('is-hidden');
    refs.clearTasksBtn.disabled = false;
  }

  tasks.forEach((task, idx, tasks) => {
    const taskItem = createTaskItem(task, idx);

    refs.tasksListEl.append(taskItem);

    const checkbox = taskItem.querySelector('.js-checkbox');

    checkbox.addEventListener('change', event => {
      tasks[idx].completed = event.currentTarget.checked;
      addDataToLocalstorage('tasks', tasks);
      renderFilteredTasks(currentFilter);
      countActiveTasks(tasks);
    });

    checkbox.checked = task.completed;

    taskItem.querySelector(`#btn-${task.id}`).addEventListener('click', () => {
      delateTask(task.id);
    });
  });

  countActiveTasks(tasks);
}

export function renderFilteredTasks(filter) {
  let filteredTasks = [];

  switch (filter) {
    case 'active': {
      filteredTasks = tasksArr.filter(task => !task.completed);
      break;
    }
    case 'completed': {
      filteredTasks = tasksArr.filter(task => task.completed);
      break;
    }
    default: {
      filteredTasks = [...tasksArr];
    }
  }

  renderTask(filteredTasks);
  addDraggingClass();
  refs.tasksListEl.addEventListener('dragover', dragoverListEl);
  refs.tasksListEl.addEventListener('dragenter', event =>
    event.preventDefault()
  );
}
