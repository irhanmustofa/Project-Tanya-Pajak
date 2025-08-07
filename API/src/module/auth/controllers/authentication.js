import Response, {
  badRequest,
  success,
  unauthorized,
} from "../../../app/response.js";
import { authConfig } from "../../../config/config.js";
import { createToken } from "../../../utils/functions.js";
import authModel from "../auth.repositories.js";

const authentication = async (req, res) => {
  const { otp } = req.body;
  const { email, device } = req.headers;

  if (!otp || !email || !device) {
    return Response(res, badRequest("OTP, email, and device are required."));
  }

  const getAuthentication = await authModel.getAuthentication(email, device);

  if (!getAuthentication.success) {
    return Response(
      res,
      unauthorized({
        message: "Authentication not found. Please login again.",
      })
    );
  }
  if (getAuthentication.data[0].otp !== otp) {
    return Response(
      res,
      unauthorized({
        message: "Invalid OTP. Please try again.",
      })
    );
  }
  if (getAuthentication.data[0].expired < new Date()) {
    return Response(
      res,
      unauthorized({
        message: "OTP expired. Please request a new OTP.",
      })
    );
  }
  const token = createToken();
  const setAuthentication = await authModel.setAuthorization({
    email,
    device,
    token,
    expired: new Date(Date.now() + authConfig.expirationOtp),
  });

  const isSuccess = setAuthentication.success;

  return Response(
    res,
    isSuccess
      ? success({
        message: "Authentication successful.",
        data: {
          token,
        },
      })
      : unauthorized({
        message: "Failed to authenticate. Please try again.",
      })
  );
};

export default authentication;
