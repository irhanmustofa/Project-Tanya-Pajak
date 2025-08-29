import Response, { badRequest, success, unauthorized } from "../app/response.js";
import { authConfig } from "../config/config.js";
import MongodbWrapper from "../database/mongo/mongo.wrapper.js";
import authRepositories from "../module/auth/auth.repositories.js";
import { authorizationSchema } from "../module/auth/auth.schema.js";
import { userSchema } from "../module/master-user/user.schema.js";

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

export const checkPermission = (requiredPermissions) => {
  const userWrapper = new MongodbWrapper(userSchema());
  return async (req, res, next) => {
    try {
      const user = await userWrapper.getByFilter({
        email: req.headers.email,
        client_id: req.headers.clientid
      });

      if (!user.success || !user.data || user.data.length === 0) {
        return Response(res, badRequest({ message: "User not found" }));
      }

      const userData = user.data[0];
      if (userData.role === 0) {
        return next();
      }

      const permissionsToCheck = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const userPermissions = userData.permissions || userData.permission || [];

      const hasPermission = permissionsToCheck.every((perm) =>
        userPermissions.includes(perm)
      );

      if (hasPermission) {
        return next();
      }

      return Response(res, badRequest({
        message: 'You do not have permission to access this resource.'
      }));

    } catch (error) {
      console.error('Permission check error:', error);
      return Response(res, badRequest({ message: "Permission check failed" }));
    }
  };
};
