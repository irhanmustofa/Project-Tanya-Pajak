import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const tarifCitEndpoint = {
  all: `${base_url}/tarif-cit`,
  create: `${base_url}/tarif-cit`,
  deleteSome: `${base_url}/tarif-cit/delete`,
  get: (id) => `${base_url}/tarif-cit/${id}`,
  update: (id) => `${base_url}/tarif-cit/${id}`,
  delete: (id) => `${base_url}/tarif-cit/${id}`,
  import: `${base_url}/tarif-cit/import`,
  upload: `${base_url}/tarif-cit/upload`,
};

export const tarifCitAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(tarifCitEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const tarifCitFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(tarifCitEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const tarifCitCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(tarifCitEndpoint.create)
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

export const tarifCitUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(tarifCitEndpoint.update(id))
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

export const tarifCitImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(tarifCitEndpoint.import)
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
