import Response, {
  badRequest,
  forbidden,
  success,
} from "../../app/response.js";
import { createToken } from "../../utils/functions.js";
import authRepositories from "./auth.repositories.js";
import { authorizationSchema } from "./auth.schema.js";
import authRegister from "./controllers/auth.register.js";
import authVerification from "./controllers/auth.verification.js";
import authenticationProcess from "./controllers/authentication.process.js";
import forgotPasswordController from "./controllers/forgot.password.js";
import setLogin from "./controllers/set.login.js";

const authorizationRepository = new authRepositories(authorizationSchema());

const login = async (req, res) => {
  const { email, password, company_npwp } = req.body;
  const { device } = req.headers;
  if (!email || !password || !device) {
    return Response(res, badRequest("some required fields are missing."));
  }

<<<<<<< HEAD
  const result = await setLogin({ email, password, company_npwp, device });
=======
  const result = await setLogin({ email, password, device });
>>>>>>> 0333528 (update files)
  if (!result.success) {
    return Response(res, {
      message: result.message || "Login failed.",
      status: result.status || 500,
    });
  }

  return Response(
    res,
    success({
      message: "Login successful.",
      data: {
        role: result.data.role,
        client_id: result.data._id,
        name: result.data.name,
      },
    })
  );
};

const authorization = async (req, res) => {
  const { email, device, token } = req.headers;
  return Response(
    res,
    await authorizationRepository.getAuthorization(email, device, token)
  );
};

const authentication = async (req, res) => {
  const { otp } = req.body;
  const { email, device } = req.headers;

  if (!otp || !email || !device) {
    return Response(
      res,
      badRequest({ message: "some required fields are missing." })
    );
  }

  const result = await authenticationProcess({ otp, email, device });

  if (!result.success) {
    return Response(res, result);
  }

  const { token, client_id } = result.data;
  return Response(
    res,
    success({
      message: "Authentication successful.",
      data: {
        token,
        client_id,
      },
    })
  );
};

const logout = async (req, res) => {
  const { email, device, token } = req.headers;
  return Response(
    res,
    await authorizationRepository.logout(email, device, token)
  );
};

const forgot = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return Response(res, badRequest("Email is required."));
  }

  const result = await forgotPasswordController.forgotPassword(req, res);

  if (!result.success) {
    return Response(res, result);
  }

  return Response(
    res,
    success({
      message:
        "Reset Password Success! Please check your email to reset your password",
    })
  );
};

const resetPassword = async (req, res) => {
  const result = await forgotPasswordController.resetPassword(req, res);

  if (!result.success) {
    return Response(res, result);
  }

  return Response(res, success({ message: "Password reset successful." }));
};

const verification = async (req, res) => {
  return Response(res, await authVerification(req));
};

const AuthController = {
  login,
  logout,
  register,
  authentication,
  verification,
  authorization,
  forgot,
  resetPassword,
};

export default AuthController;
