import { badRequest, success, unauthorized } from "../app/response.js";
import { authConfig } from "../config/config.js";
import authRepositories from "../module/auth/auth.repositories.js";
import { authorizationSchema } from "../module/auth/auth.schema.js";

export const validatingUser = async (headers) => {
  const { email, device, token } = headers;

  if (!email || !device || !token) {
    return unauthorized({ message: "some required fields are missing." });
  }

  const auth = new authRepositories(authorizationSchema());

  const getAuthorization = await auth.getAuthorization(email, device, token);

  if (!getAuthorization.success) {
    return unauthorized({ message: "Authentication Failed" });
  }

  const authorization = getAuthorization.data[0];

  if (authorization.token !== token) {
    return unauthorized({ message: "Invalid token" });
  }

  if (authorization.expired < new Date()) {
    return unauthorized({ message: "Token expired" });
  }

  if (authorization.device !== device) {
    return unauthorized({ message: "Invalid device" });
  }

  const setAuthorization = await auth.setAuthorization({
    email,
    device,
    token,
    expired: new Date(Date.now() + authConfig.expirationToken),
  });

  if (!setAuthorization.success) {
    return badRequest({ message: "Failed to update authorization" });
  }

  return success({ message: "User authorized" });
};
