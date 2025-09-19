import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const bankClientEndpoint = {
  all: `${base_url}/bank-client/`,
  create: `${base_url}/bank-client`,
  import: `${base_url}/bank-client/import`,
  deleteSome: `${base_url}/bank-client/delete`,
  get: (id) => `${base_url}/bank-client/${id}`,
  update: (id) => `${base_url}/bank-client/${id}`,
  delete: (id) => `${base_url}/bank-client/${id}`,
};

export const bankClientAll = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(bankClientEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const bankClientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(bankClientEndpoint.create)
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

export const bankClientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(bankClientEndpoint.import)
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

export const bankClientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(bankClientEndpoint.update(id))
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
