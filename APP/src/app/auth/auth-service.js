import HttpRequest from "@/api/http-request";
import { authEndpoint } from "@/app/auth/auth-endpoint";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Navigate } from "react-router-dom";

export const register = async (data = {}) => {
  const name = data.name;
  const email = data.email;
  const password = data.password;

  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.signup)
      .body({ name, email, password })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const verify = async (token) => {
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

export const verifyOtp = async (otp) => {
  const email = useLocalStorage.get("email");
  const device = useLocalStorage.get("device");
  try {
    const request = await HttpRequest.method("POST")
      .url(authEndpoint.setAuthentication)
      .headers({
        email: email,
        device: device
      })
      .body({ otp })
      .send();

    return request;
  } catch (error) {
    console.error(error);
  }
}

export const getAuthorization = async () => {
  try {
    const request = await HttpRequest.method("GET")
      .url(authEndpoint.getAuthorization)
      .headers({
        "email": useLocalStorage.get("email"),
        "device": useLocalStorage.get("device")
      })
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
