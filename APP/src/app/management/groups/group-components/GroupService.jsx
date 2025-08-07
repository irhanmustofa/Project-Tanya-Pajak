import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const groupsEndpoint = {
  all: `${base_url}/group`,
  create: `${base_url}/group`,
  deleteSome: `${base_url}/group/delete`,
  get: (id) => `${base_url}/group/${id}`,
  update: (id) => `${base_url}/group/${id}`,
  delete: (id) => `${base_url}/group/${id}`,
};

export const groupAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(groupsEndpoint.all)
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const groupFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(groupsEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const groupCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(groupsEndpoint.create)
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

export const groupUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(groupsEndpoint.update(id))
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
