import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const kontakClientEndpoint = {
  create: `${base_url}/kontak-client`,
  import: `${base_url}/kontak-client/import`,
  deleteSome: `${base_url}/kontak-client/delete`,
  get: (id) => `${base_url}/kontak-client/${id}`,
  update: (id) => `${base_url}/kontak-client/${id}`,
  delete: (id) => `${base_url}/kontak-client/${id}`,
};

export const kontakClientFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(kontakClientEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const kontakClientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(kontakClientEndpoint.create)
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

export const kontakClientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(kontakClientEndpoint.import)
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

export const kontakClientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(kontakClientEndpoint.update(id))
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
