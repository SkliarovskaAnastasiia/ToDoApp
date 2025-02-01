import {
  addDataToLocalstorage,
  removeDataFromLocalStorage,
  getDataFromLocalStorage,
} from './localstorage';

const enableDarkmode = () => {
  document.body.classList.add('dark-theme');
  addDataToLocalstorage('darkmode', 'active');
};

const disableDarkmode = () => {
  document.body.classList.remove('dark-theme');
  removeDataFromLocalStorage('darkmode');
};

let darkTheme = getDataFromLocalStorage('darkmode');
if (darkTheme === 'active') enableDarkmode();

document.querySelector('.js-theme-btn').addEventListener('click', () => {
  darkTheme = getDataFromLocalStorage('darkmode');
  darkTheme !== 'active' ? enableDarkmode() : disableDarkmode();
});
