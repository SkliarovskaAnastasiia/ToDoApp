import { refs } from './refs';

export function countActiveTasks(tasksArr) {
  const incompletedTasks = tasksArr.filter(task => !task.completed).length;
  const taskStr = incompletedTasks === 1 ? 'task' : 'tasks';

  refs.tasksQuantity.textContent = `${incompletedTasks} ${taskStr} left`;
}
