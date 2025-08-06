import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const usersEndpoint = {
<<<<<<< HEAD
  all: `${base_url}/users`,
  create: `${base_url}/users`,
  deleteSome: `${base_url}/users/delete`,
  get: (id) => `${base_url}/users/${id}`,
  update: (id) => `${base_url}/users/${id}`,
  delete: (id) => `${base_url}/users/${id}`,
  email: (email) => `${base_url}/users/email/${email}`,
=======
  all: `${base_url}/user`,
  create: `${base_url}/user`,
  deleteSome: `${base_url}/user/delete`,
  get: (id) => `${base_url}/user/${id}`,
  update: (id) => `${base_url}/user/${id}`,
  delete: (id) => `${base_url}/user/${id}`,
  email: (email) => `${base_url}/user/email/${email}`,
>>>>>>> 2cd1356 (update-register)
};

export const userAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(usersEndpoint.all)
      .headers({
        clientid: useLocalStorage.get("clientId"),
      })
      .send();
    console.log("User All Request:", request);
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(usersEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userByEmail = async (email) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(usersEndpoint.email(email))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(usersEndpoint.create)
      .body(data)
      .headers({
        clientid: useLocalStorage.get("clientId"),
      })
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(usersEndpoint.update(id))
      .body(data)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
