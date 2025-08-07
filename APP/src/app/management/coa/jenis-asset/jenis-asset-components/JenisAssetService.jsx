import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const jenisAssetEndpoint = {
  all: `${base_url}/jenis-asset`,
  create: `${base_url}/jenis-asset`,
  deleteSome: `${base_url}/jenis-asset/delete`,
  get: (id) => `${base_url}/jenis-asset/${id}`,
  update: (id) => `${base_url}/jenis-asset/${id}`,
  delete: (id) => `${base_url}/jenis-asset/${id}`,
  import: `${base_url}/jenis-asset/import`,
};

export const jenisAssetAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(jenisAssetEndpoint.all)
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jenisAssetFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(jenisAssetEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jenisAssetCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(jenisAssetEndpoint.create)
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

export const jenisAssetUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(jenisAssetEndpoint.update(id))
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

export const jenisAssetImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(jenisAssetEndpoint.import)
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
