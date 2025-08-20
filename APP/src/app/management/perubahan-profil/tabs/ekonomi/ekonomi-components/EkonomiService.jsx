import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const ekonomiClientEndpoint = {
  update: (id) => `${base_url}/ekonomi-client/${id}`,
};

export const ekonomiClientUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(ekonomiClientEndpoint.update(id))
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
