import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const userClientsEndpoint = {
  all: `${base_url}/user-client`,
  permissions: `${base_url}/permission`,
};

export const userClientAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(userClientsEndpoint.all)
      .headers({
        email: useLocalStorage.get("email"),
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

export const dataPermissions = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(userClientsEndpoint.permissions)
      .headers({
        email: useLocalStorage.get("email"),
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
