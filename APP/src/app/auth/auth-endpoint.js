import { base_url } from "@/api/http-endpoints";

export const authEndpoint = {
  forgot: `${base_url}/auth/forgot`,
  setReset: (token) => `${base_url}/auth/${token}`,
  login: `${base_url}/auth/login`,
  logout: `${base_url}/auth/logout`,
  signup: `${base_url}/register`,
  verify: (token) => `${base_url}/register/verify/${token}`,
  setAuthentication: `${base_url}/auth/authentication`,
};
