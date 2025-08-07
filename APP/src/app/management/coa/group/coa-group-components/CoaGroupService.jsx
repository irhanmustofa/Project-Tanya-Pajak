import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const coaGroupEndpoint = {
  all: `${base_url}/coa/group`,
  create: `${base_url}/coa/group`,
  deleteSome: `${base_url}/coa/group/delete`,
  get: (id) => `${base_url}/coa/group/${id}`,
  update: (id) => `${base_url}/coa/group/${id}`,
  delete: (id) => `${base_url}/coa/group/${id}`,
  import: `${base_url}/coa/group/import`,
};

export const coaGroupAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(coaGroupEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaGroupFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(coaGroupEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const coaGroupCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaGroupEndpoint.create)
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

export const coaGroupUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(coaGroupEndpoint.update(id))
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

export const coaGroupImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(coaGroupEndpoint.import)
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
