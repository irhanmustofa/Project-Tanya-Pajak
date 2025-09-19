import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const nomorEksternalEndpoint = {
  create: `${base_url}/nomor-eksternal-client`,
  import: `${base_url}/nomor-eksternal-client/import`,
  deleteSome: `${base_url}/nomor-eksternal-client/delete`,
  get: (id) => `${base_url}/nomor-eksternal-client/${id}`,
  update: (id) => `${base_url}/nomor-eksternal-client/${id}`,
  delete: (id) => `${base_url}/nomor-eksternal-client/${id}`,
};

export const nomorEksternalFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(nomorEksternalEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const nomorEksternalCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(nomorEksternalEndpoint.create)
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

export const nomorEksternalImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(nomorEksternalEndpoint.import)
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

export const nomorEksternalUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(nomorEksternalEndpoint.update(id))
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
