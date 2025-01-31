const enableDarkmode = () => {
  document.body.classList.add('dark-theme');
  localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
  document.body.classList.remove('dark-theme');
  localStorage.removeItem('darkmode');
};

let darkTheme = localStorage.getItem('darkmode');
if (darkTheme === 'active') enableDarkmode();

document.querySelector('.js-theme-btn').addEventListener('click', () => {
  darkTheme = localStorage.getItem('darkmode');
  darkTheme !== 'active' ? enableDarkmode() : disableDarkmode();
});
