import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const usersEndpoint = {
  all: `${base_url}/user`,
  create: `${base_url}/user`,
  deleteSome: `${base_url}/user/delete`,
  get: (id) => `${base_url}/user/${id}`,
  update: (id) => `${base_url}/user/${id}`,
  delete: (id) => `${base_url}/user/${id}`,
  email: (email) => `${base_url}/user/email/${email}`,
};

export const userAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(usersEndpoint.all)
      .send();

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
