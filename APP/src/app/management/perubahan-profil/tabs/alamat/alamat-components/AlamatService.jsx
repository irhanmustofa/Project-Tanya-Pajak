import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const alamatClientEndpoint = {
  create: `${base_url}/alamat-client`,
  import: `${base_url}/alamat-client/import`,
  deleteSome: `${base_url}/alamat-client/delete`,
  get: (id) => `${base_url}/alamat-client/${id}`,
  update: (id) => `${base_url}/alamat-client/${id}`,
  delete: (id, clientId) => `${base_url}/alamat-client/${id}/${clientId}`,
};

export const alamatClientFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(alamatClientEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const alamatClientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(alamatClientEndpoint.create)
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

export const alamatClientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(alamatClientEndpoint.import)
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

export const alamatClientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(alamatClientEndpoint.update(id))
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
