import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const jurnalsEndpoint = {
  all: `${base_url}/jurnal`,
  create: `${base_url}/jurnal`,
  deleteSome: `${base_url}/jurnal/delete`,
  get: (id) => `${base_url}/jurnal/${id}`,
  update: (id) => `${base_url}/jurnal/${id}`,
  delete: (id) => `${base_url}/jurnal/${id}`,
  import: `${base_url}/jurnal/import`,
};

export const jurnalAll = async (params = {}) => {
  if (params.tahun) {
    params.tahun = Number(params.tahun);
  }
  if (params.masa) {
    params.masa = Number(params.masa);
  }
  try {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${jurnalsEndpoint.all}?${query}` : jurnalsEndpoint.all;
    const request = await HttpRequest.method("GET")
      .url(url)
      .headers({
        clientId: useLocalStorage.get("clientId"),
      })
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jurnalDelete = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(jurnalsEndpoint.delete(id))
      .headers({
        clientId: useLocalStorage.get("clientId"),
      })
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jurnalFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(jurnalsEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jurnalCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(jurnalsEndpoint.create)
      .headers({
        clientId: useLocalStorage.get("clientId"),
      })
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

export const jurnalUpdate = async (id, data) => {
  console.log("Updating Jurnal with ID:", id, "and data:", data);
  try {
    const request = await HttpRequest.method("PUT")
      .url(jurnalsEndpoint.update(id))
      .headers({
        clientId: useLocalStorage.get("clientId"),
      })
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
