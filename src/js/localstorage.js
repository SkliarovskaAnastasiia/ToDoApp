export function addDataToLocalstorage(key, value) {
  try {
    const normolaizedValue = JSON.stringify(value);
    localStorage.setItem(key, normolaizedValue);
  } catch (error) {
    console.log(error);
  }
}

export function getDataFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? undefined : JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
}

export function removeDataFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}
