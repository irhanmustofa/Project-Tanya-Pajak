import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const userClientsEndpoint = {
  all: `${base_url}/user-client`,
};

export const userClientAll = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(userClientsEndpoint.all)
      .headers({
        email: useLocalStorage.get("email"),
      })
      .send();
    console.log("userClientAll - API request sent:", request);
    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
