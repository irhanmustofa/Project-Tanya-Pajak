import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const coaHeadEndpoint = {
  all: `${base_url}/coa/head`,
  create: `${base_url}/coa/head`,
  deleteSome: `${base_url}/coa/head/delete`,
  get: (id) => `${base_url}/coa/head/${id}`,
  update: (id) => `${base_url}/coa/head/${id}`,
  delete: (id) => `${base_url}/coa/head/${id}`,
  import: `${base_url}/coa/head/import`,
};

export const coaHeadAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(coaHeadEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaHeadFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(coaHeadEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaHeadCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaHeadEndpoint.create)
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

export const coaHeadUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(coaHeadEndpoint.update(id))
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

export const coaHeadImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaHeadEndpoint.import)
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
