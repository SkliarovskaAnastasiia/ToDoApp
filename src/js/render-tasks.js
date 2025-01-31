import { refs } from './refs';

function generateId() {
  return `${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export const renderTask = taskText => {
  const taskId = generateId();
  const taskCard = `<li class="list-item" id="task-${taskId}">
                <input
                  class="checkbox visually-hidden"
                  type="checkbox"
                  id="${taskId}"
                />
                <label class="checkbox-label" for="${taskId}">
                  <span class="custom-checkbox">
                    <svg
                      class="custom-checkbox-icon"
                      width="10px"
                      height="10px"
                    >
                      <use
                        href=".//img/icons/symbol-defs.svg#icon-icon-check"
                      ></use>
                    </svg>
                  </span>
                  <p class="task-text">${taskText}</p>
                </label>
              <button class="delate-btn js-delate-btn" id="btn-${taskId}">
                <svg class="btn-icon">
                  <use href="./img/icons/symbol-defs.svg#icon-icon-cross"></use>
                </svg>
              </button>
            </li>`;

  refs.tasksListEl.insertAdjacentHTML('beforeend', taskCard);

  document.querySelector(`#btn-${taskId}`).addEventListener('click', () => {
    refs.tasksListEl.children[`task-${taskId}`].remove();
    if (refs.tasksListEl.childElementCount === 1) {
      refs.textContentOfEmptyList.classList.remove('is-hidden');
    }
  });
  console.dir(refs.tasksListEl);
};
