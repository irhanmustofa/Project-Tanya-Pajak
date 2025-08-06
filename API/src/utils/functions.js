import crypto from "crypto";

export const generateId = () => {
  return "xxxx4xxxyxxxxyxxyxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const randomInt = (digits = 6) => {
  return Math.floor(
    Math.pow(10, digits - 1) + Math.random() * 9 * Math.pow(10, digits - 1)
  );
};

export const randomString = (number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const createToken = () => {
  return "xxxx-xxxx-4xxxyxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const passwordHash = (password) => {
  return crypto
    .createHash("md5")
    .update(
      crypto
        .createHash("sha256")
        .update(crypto.createHash("sha1").update(password).digest("hex"))
        .digest("hex")
    )
    .digest("hex");
};

export const passwordCompare = (plain, hashed) => {
  return passwordHash(plain) === hashed;
};

export const parseTanggal = (tanggal) => {
  // Jika null, undefined, atau empty string, return null
  if (!tanggal || tanggal === "" || tanggal === "undefined" || tanggal === "null") {
    return null;
  }

  // Jika sudah Date, langsung return
  if (tanggal instanceof Date) {
    return isNaN(tanggal.getTime()) ? null : tanggal;
  }

  // Jika format YYYY-MM-DD (ISO), Date bisa langsung parse
  if (/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) {
    const date = new Date(tanggal);
    return isNaN(date.getTime()) ? null : date;
  }

  // Jika format YYYY/MM/DD
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(tanggal)) {
    const date = new Date(tanggal.replace(/\//g, "-"));
    return isNaN(date.getTime()) ? null : date;
  }
  // Jika format YYYY-MM-DD HH:mm:ss
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(tanggal)) {
    const date = new Date(tanggal);
    return isNaN(date.getTime()) ? null : date;
  }
  // Jika format DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(tanggal)) {
    const [day, month, year] = tanggal.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? null : date;
  }
  // Jika format DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(tanggal)) {
    const [day, month, year] = tanggal.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? null : date;
  }
  // Jika format MM-DD-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(tanggal)) {
    const [month, day, year] = tanggal.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? null : date;
  }
  // Jika format MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(tanggal)) {
    const [month, day, year] = tanggal.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? null : date;
  }

  // Jika gagal, return null
  return null;
};

export const getDateToday = () => {
  let date = new Date();
  let dateToday =
    date.getYear() +
    "" +
    date.getMonth() +
    "" +
    date.getDate() +
    "" +
    date.getHours() +
    "" +
    date.getMinutes() +
    "" +
    date.getSeconds();
  return dateToday;
};
