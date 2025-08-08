const set = (key, value) => {
  if (value === undefined || value === null) return;
  if (key === "device") {
    value = newDevice();
  }
  localStorage.setItem(key, value);
};
const get = (key) => {
  if (key === "device") {
    return newDevice();
  }

  return localStorage.getItem(key);
};

const destroy = (key) => {
  localStorage.removeItem(key);
};

const remove = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("sb");
  localStorage.removeItem("lastAccess");
  return;
};

const reset = () => {
  localStorage.clear();
};

const newDevice = () => {
  const device_id = localStorage.getItem("device");

  if (device_id) {
    return device_id;
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  localStorage.setItem("device", randomString);

  return randomString;
};
export const useLocalStorage = { set, get, reset, destroy, remove };
