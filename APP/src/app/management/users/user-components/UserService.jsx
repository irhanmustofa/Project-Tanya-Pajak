import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const usersEndpoint = {
  all: `${base_url}/users`,
  create: `${base_url}/users`,
  deleteSome: `${base_url}/users/delete`,
  get: (id) => `${base_url}/users/${id}`,
  update: (id) => `${base_url}/users/${id}`,
  delete: (id) => `${base_url}/users/${id}`,
  email: (email) => `${base_url}/users/email/${email}`,
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

export const userImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(usersEndpoint.import)
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
