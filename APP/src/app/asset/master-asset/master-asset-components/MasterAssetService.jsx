import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const masterAssetsEndpoint = {
  all: `${base_url}/asset`,
  create: `${base_url}/asset`,
  deleteSome: `${base_url}/asset/delete`,
  get: (id) => `${base_url}/asset/${id}`,
  update: (id) => `${base_url}/asset/${id}`,
  delete: (id) => `${base_url}/asset/${id}`,
  import: `${base_url}/asset/import`,
  jenisAsset: `${base_url}/asset/setting/jenis`,
  kategoriAsset: `${base_url}/asset/setting/kategori`,
  golonganAsset: `${base_url}/asset/setting/golongan`,
  jenisHarta: `${base_url}/asset/setting/jenis-harta`,
  metodePenyusutan: `${base_url}/asset/setting/metode`,
};

export const masterAssetAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.all)
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

export const masterAssetDelete = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.delete(id))
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

export const masterAssetFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.get(id))
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const masterAssetCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(masterAssetsEndpoint.create)
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

export const masterAssetUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(masterAssetsEndpoint.update(id))
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

export const masterAssetImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(masterAssetsEndpoint.import)
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

export const jenisAsset = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.jenisAsset)
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

export const kategoriAsset = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.kategoriAsset)
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

export const golonganAsset = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.golonganAsset)
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

export const jenisHarta = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.jenisHarta)
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

export const metodePenyusutan = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(masterAssetsEndpoint.metodePenyusutan)
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
