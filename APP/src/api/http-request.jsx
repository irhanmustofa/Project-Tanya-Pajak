import { useLocalStorage } from "@/hooks/use-local-storage";
import axios from "axios";
import { href } from "react-router-dom";

let onRequestStart = () => {};
let onRequestEnd = () => {};

export const setHttpRequestTracking = ({ start, end }) => {
  onRequestStart = start || (() => {});
  onRequestEnd = end || (() => {});
};

class HttpRequest {
  static request = {
    method: "GET",
    url: "",
    headers: {},
    body: {},
    options: {},
  };

  static method(method = "GET") {
    HttpRequest.request.method = method;
    return this;
  }

  static url(url = "") {
    HttpRequest.request.url = url;
    return this;
  }

  static headers(headers = {}) {
    HttpRequest.request.headers = headers;
    return this;
  }

  static body(body = {}) {
    HttpRequest.request.body = body;
    return this;
  }

  static options(options = {}) {
    HttpRequest.request.options = options;
    return this;
  }

  static async send() {
    onRequestStart();

    const token = useLocalStorage.get("token");
    const email = useLocalStorage.get("email");
    const device = useLocalStorage.get("device");
    const clientId = useLocalStorage.get("clientId");
    const lastAccess = useLocalStorage.get("lastAccess");

    if (token) {
      if (Date.now() > lastAccess) {
        useLocalStorage.remove();
        window.location.href = href("/");
      } else {
        useLocalStorage.set("lastAccess", Date.now() + 1000 * 60 * 30);
      }
    }

    const { method, url, headers, body, options } = HttpRequest.request;
    const fetchOptions = {
      url: url,
      method: method,
      data: body,
      ...options,
    };

    const is_formData = body instanceof FormData;
    switch (is_formData) {
      case true:
        fetchOptions.headers = {
          ...headers,
          "Content-Type": "multipart/form-data",
        };
        break;
      default:
        fetchOptions.headers = {
          ...headers,
          "Content-Type": "application/json",
        };
        break;
    }

    if (device) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        device,
      };
    }

    if (token && email) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        token,
        email,
      };
    }

    if (clientId) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        clientId,
      };
    }

    try {
      const request = await axios(fetchOptions);
      HttpRequest.reset();

      return request?.data;
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        useLocalStorage.remove();
        window.location.href = href("/");
        return;
      }

      return {
        success: false,
        message: error.response?.data.message || error.message,
      };
    } finally {
      onRequestEnd();
    }
  }

  static reset() {
    HttpRequest.request = {
      method: "GET",
      url: "",
      headers: {},
      body: {},
      options: {},
    };
  }
}

export default HttpRequest;
