import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const pajakKeluaransEndpoint = {
  all: `${base_url}/pajak-keluaran`,
  create: `${base_url}/pajak-keluaran`,
  deleteSome: `${base_url}/pajak-keluaran/delete`,
  get: (id) => `${base_url}/pajak-keluaran/${id}`,
  update: (id) => `${base_url}/pajak-keluaran/${id}`,
  delete: (id) => `${base_url}/pajak-keluaran/${id}`,
  import: `${base_url}/pajak-keluaran/import`,
};

export const pajakKeluaranAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(pajakKeluaransEndpoint.all)
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

export const pajakKeluaranGet = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(pajakKeluaransEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const pajakKeluaranCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(pajakKeluaransEndpoint.create)
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

export const pajakKeluaranUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(pajakKeluaransEndpoint.update(id))
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

export const pajakKeluaranImport = async (data) => {
  console.log("Importing data:", data);
  try {
    const request = await HttpRequest.method("POST")
      .url(pajakKeluaransEndpoint.import)
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
