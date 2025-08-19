export const dateShort = (date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const dateLong = (date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export const dateToday = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};

export const dateStrip = (date) => {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const dateSlash = (date) => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    year: "numeric",
    month: "2-digit",
  });
};
