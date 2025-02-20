export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
