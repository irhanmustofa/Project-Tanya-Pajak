import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const bukusEndpoint = {
  all: `${base_url}/buku`,
  create: `${base_url}/buku`,
  deleteSome: `${base_url}/buku/delete`,
  get: (id) => `${base_url}/buku/${id}`,
  getBuku: (buku) => `${base_url}/buku/${buku}`,
  update: (id) => `${base_url}/buku/${id}`,
  delete: (id) => `${base_url}/buku/${id}`,
  import: `${base_url}/buku/import`,
};

export const bukuAll = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${bukusEndpoint.all}?${query}` : bukusEndpoint.all;
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

export const bukuDelete = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(bukusEndpoint.delete(id))
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

export const bukuFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(bukusEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const bukuCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(bukusEndpoint.create)
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

export const bukuUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(bukusEndpoint.update(id))
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

export const bukuImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(bukusEndpoint.import)
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
