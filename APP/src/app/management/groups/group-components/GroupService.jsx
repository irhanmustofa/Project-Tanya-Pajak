import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const groupEndpoint = {
  all: `${base_url}/client-group`,
  create: `${base_url}/client-group`,
  deleteSome: `${base_url}/client-group/delete`,
  get: (id) => `${base_url}/client-group/${id}`,
  update: (id) => `${base_url}/client-group/${id}`,
  delete: (id) => `${base_url}/client-group/${id}`,
};

export const groupAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(groupEndpoint.all)
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
      .url(groupEndpoint.get(id))
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
      .url(groupEndpoint.create)
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
      .url(groupEndpoint.update(id))
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
