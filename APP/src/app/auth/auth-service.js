import HttpRequest from "@/api/http-request";
import { authEndpoint } from "@/app/auth/auth-endpoint";

export const register = async (data = {}) => {
  const name = data.name;
  const email = data.email;
  const password = data.password;

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.signup)
      .body({ name, email, password })
      .send();
    console.log(request);
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const verify = async (token) => {
  console.log("Verifying token:", token);
  try {
    const request = await HttpRequest.method("GET")
      .url(authEndpoint.verify(token))
      .send();
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.login)
      .body({ email, password })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const reset = async (formData) => {
  const password = formData.get("password");
  const pathname = window.location.pathname;
  const token = pathname.split("/")[2];

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.reset(token))
      .body({ password })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const forgot = async (formData) => {
  const email = formData.get("email");

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.forgot)
      .body({ email })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};
