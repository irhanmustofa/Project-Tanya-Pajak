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
<<<<<<< HEAD
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("sb");
  localStorage.removeItem("lastAccess");
  return;
=======
  if (!administrator.includes(localStorage.getItem("email"))) {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("sb");
    localStorage.removeItem("lastAccess");
    return;
  }
>>>>>>> fd410b4 (update-register)
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
<<<<<<< HEAD
export const useLocalStorage = { set, get, reset, destroy, remove };
=======

const administrator = [
  "pa@mytaxindonesia.org",
  "masdirah.gs@gmail.com",
  "info@mytaxindonesia.org",
];
const isAdmin = () => administrator.includes(localStorage.getItem("email"));
export const useLocalStorage = { set, get, reset, destroy, remove, isAdmin };
>>>>>>> fd410b4 (update-register)
