import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const serviceEndpoint = {
  all: `${base_url}/service`,
  create: `${base_url}/service`,
  import: `${base_url}/service/import`,
  status: `${base_url}/service/status`,
  deleteSome: `${base_url}/service/delete`,
  get: (id) => `${base_url}/service/${id}`,
  update: (id) => `${base_url}/service/${id}`,
  delete: (id) => `${base_url}/service/${id}`,
};

export const serviceAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(serviceEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const serviceFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(serviceEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const serviceCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(serviceEndpoint.create)
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

export const serviceImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(serviceEndpoint.import)
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

export const serviceUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(serviceEndpoint.update(id))
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
