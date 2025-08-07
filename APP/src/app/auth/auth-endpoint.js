import { base_url } from "@/api/http-endpoints";

export const authEndpoint = {
  forgot: `${base_url}/auth/forgot`,
  reset: (token) => `${base_url}/auth/reset/${token}`,
  login: `${base_url}/auth/login`,
  getAuthorization: `${base_url}/auth/authorization`,
  logout: `${base_url}/auth/logout`,
  setAuthentication: `${base_url}/auth/authentication`,
};
