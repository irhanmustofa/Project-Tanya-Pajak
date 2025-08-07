import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const coaEndpoint = {
  all: `${base_url}/coa/master`,
  create: `${base_url}/coa/master`,
  deleteSome: `${base_url}/coa/master/delete`,
  get: (id) => `${base_url}/coa/master/${id}`,
  update: (id) => `${base_url}/coa/master/${id}`,
  delete: (id) => `${base_url}/coa/master/${id}`,
  import: `${base_url}/coa/master/import`,
};

export const coaAll = async () => {
  try {
    const request = await HttpRequest.method("GET").url(coaEndpoint.all).send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(coaEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaEndpoint.create)
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

export const coaUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(coaEndpoint.update(id))
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

export const coaImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaEndpoint.import)
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
