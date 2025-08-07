import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const clientsEndpoint = {
  all: `${base_url}/client`,
  create: `${base_url}/client`,
  deleteSome: `${base_url}/client/delete`,
  get: (id) => `${base_url}/client/${id}`,
  update: (id) => `${base_url}/client/${id}`,
  delete: (id) => `${base_url}/client/${id}`,
  email: (email) => `${base_url}/client/email/${email}`,
  updatePassword: `${base_url}/client/update-password`,
  import: `${base_url}/client/import`,
  firstClient: `${base_url}/client/first-client`,
};

export const clientAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(clientsEndpoint.all)
      .send();
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const clientFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(clientsEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const clientCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(clientsEndpoint.create)
      .headers({
        groupId: useLocalStorage.get("groupId"),
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

export const clientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(clientsEndpoint.update(id))
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

export const updatePassword = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(clientsEndpoint.updatePassword)
      .headers({
        email: useLocalStorage.get("email"),
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

export const clientImport = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(clientsEndpoint.import)
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
