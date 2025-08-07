import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const periodeLaporanEndpoint = {
  all: `${base_url}/periode-laporan`,
  create: `${base_url}/periode-laporan`,
  deleteSome: `${base_url}/periode-laporan/delete`,
  get: (id) => `${base_url}/periode-laporan/${id}`,
  update: (id) => `${base_url}/periode-laporan/${id}`,
  delete: (id) => `${base_url}/periode-laporan/${id}`,
  import: `${base_url}/periode-laporan/import`,
};

export const periodeLaporanAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(periodeLaporanEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const periodeLaporanFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(periodeLaporanEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const periodeLaporanCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(periodeLaporanEndpoint.create)
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

export const periodeLaporanUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(periodeLaporanEndpoint.update(id))
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

export const periodeLaporanImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(periodeLaporanEndpoint.import)
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
