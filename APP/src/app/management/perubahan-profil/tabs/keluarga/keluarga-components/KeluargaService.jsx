import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const keluargaClientEndpoint = {
  all: `${base_url}/keluarga-client/`,
  create: `${base_url}/keluarga-client`,
  import: `${base_url}/keluarga-client/import`,
  deleteSome: `${base_url}/keluarga-client/delete`,
  get: (id) => `${base_url}/keluarga-client/${id}`,
  update: (id) => `${base_url}/keluarga-client/${id}`,
  delete: (id) => `${base_url}/keluarga-client/${id}`,
};

export const keluargaClientAll = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(keluargaClientEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const keluargaClientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(keluargaClientEndpoint.create)
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

export const keluargaClientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(keluargaClientEndpoint.import)
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

export const keluargaClientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(keluargaClientEndpoint.update(id))
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
