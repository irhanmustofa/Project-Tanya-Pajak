import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const tkuEndpoint = {
  create: `${base_url}/tku-client`,
  import: `${base_url}/tku-client/import`,
  deleteSome: `${base_url}/tku-client/delete`,
  get: (id) => `${base_url}/tku-client/${id}`,
  update: (id) => `${base_url}/tku-client/${id}`,
  delete: (id) => `${base_url}/tku-client/${id}`,
};

export const tkuFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(tkuEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const tkuCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(tkuEndpoint.create)
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

export const tkuImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(tkuEndpoint.import)
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

export const tkuUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(tkuEndpoint.update(id))
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
