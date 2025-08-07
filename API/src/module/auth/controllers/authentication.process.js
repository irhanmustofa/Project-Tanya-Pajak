import {
  badRequest,
  error,
  forbidden,
  success,
  unauthorized,
} from "../../../app/response.js";
import { authConfig } from "../../../config/config.js";
import { createToken } from "../../../utils/functions.js";
import authRepositories from "../auth.repositories.js";
import ErrorHandler from "../../../utils/error.handler.js";
import { authenticationSchema, authorizationSchema } from "../auth.schema.js";

const authenticationProcess = async (data) => {
  const authenticationRepository = new authRepositories(authenticationSchema());
  const authorizationRepository = new authRepositories(authorizationSchema());

  const { otp, email, device } = data;

  const getAuthentication = await authenticationRepository.getAuthentication(
    email,
    device
  );

  if (!getAuthentication.success) {
    return forbidden({ message: "Unauthenticated user" });
  }

  const { expired, group_id, client_id } = getAuthentication.data[0];

  if (getAuthentication.data[0].otp !== otp) {
    return badRequest({ message: "Invalid OTP." });
  }

  if (expired < new Date()) {
    return unauthorized({ message: "OTP expired." });
  }

  const token = createToken();

  const setAuthorization = await authorizationRepository.setAuthorization({
    email,
    device,
    token,
    expired: new Date(Date.now() + authConfig.expirationOtp),
  });

  if (!setAuthorization.success) {
    ErrorHandler({
      message: "Failed to authenticate.",
      error: setAuthorization.message,
    });

    return error();
  }

  return success({
    message: "Authentication successful.",
    data: {
      token,
      group_id,
      client_id,
    },
  });
};

export default authenticationProcess;
