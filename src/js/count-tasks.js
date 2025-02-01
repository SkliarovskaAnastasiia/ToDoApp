import { refs } from './refs';

export function countActiveTasks(tasksArr) {
  const combletedTasks = tasksArr.filter(
    ({ completed }) => completed === false
  );

  refs.tasksQuantity.textContent = combletedTasks.length;
}
