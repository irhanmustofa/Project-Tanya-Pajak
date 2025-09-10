import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const konsepSptEndpoint = {
  all: `${base_url}/konsep-spt`,
  create: `${base_url}/konsep-spt`,
  deleteSome: `${base_url}/konsep-spt/delete`,
  get: (id) => `${base_url}/konsep-spt/${id}`,
  update: (id) => `${base_url}/konsep-spt/${id}`,
  delete: (id) => `${base_url}/konsep-spt/${id}`,
};

export const sptAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(konsepSptEndpoint.all)
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

export const sptFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(konsepSptEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sptCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(konsepSptEndpoint.create)
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

export const sptUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(konsepSptEndpoint.update(id))
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
