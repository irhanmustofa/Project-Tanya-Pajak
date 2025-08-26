import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const orangTerkaitEndpoint = {
  create: `${base_url}/orang-terkait`,
  import: `${base_url}/orang-terkait/import`,
  deleteSome: `${base_url}/orang-terkait/delete`,
  get: (id) => `${base_url}/orang-terkait/${id}`,
  update: (id) => `${base_url}/orang-terkait/${id}`,
  delete: (id) => `${base_url}/orang-terkait/${id}`,
};

export const orangTerkaitFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(orangTerkaitEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const orangTerkaitCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(orangTerkaitEndpoint.create)
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

export const orangTerkaitImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(orangTerkaitEndpoint.import)
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

export const orangTerkaitUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(orangTerkaitEndpoint.update(id))
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
