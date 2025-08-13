import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const documentsEndpoint = {
  all: `${base_url}/documents`,
  create: `${base_url}/documents`,
  deleteSome: `${base_url}/documents/delete`,
  get: (id) => `${base_url}/documents/${id}`,
  update: (id) => `${base_url}/documents/${id}`,
  delete: (id) => `${base_url}/documents/${id}`,
};

export const documentAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(documentsEndpoint.all)
      .headers({
        clientid: useLocalStorage.get("clientId"),
      })
      .send();
    console.log("document All Request:", request);
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const documentFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(documentsEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const documentCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(documentsEndpoint.create)
      .body(data)
      .headers({
        clientid: useLocalStorage.get("clientId"),
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

export const documentUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(documentsEndpoint.update(id))
      .body(data)
      .headers({
        clientid: useLocalStorage.get("clientId"),
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
