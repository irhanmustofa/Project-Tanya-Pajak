import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const clientEndpoint = {
  all: `${base_url}/client`,
  create: `${base_url}/client`,
  import: `${base_url}/client/import`,
  status: `${base_url}/client/status`,
  deleteSome: `${base_url}/client/delete`,
  get: (id) => `${base_url}/client/${id}`,
  update: (id) => `${base_url}/client/${id}`,
  delete: (id) => `${base_url}/client/${id}`,
};

export const clientAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(clientEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const clientFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(clientEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const clientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(clientEndpoint.create)
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

export const clientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(clientEndpoint.import)
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

export const clientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(clientEndpoint.update(id))
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
