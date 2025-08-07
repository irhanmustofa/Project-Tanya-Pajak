import Response, {
  badRequest,
  error,
  forbidden,
  notFound,
  success,
  unauthorized,
} from "../../../app/response.js";
import { adminconfig, APPURL, authConfig } from "../../../config/config.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import ErrorHandler from "../../../utils/error.handler.js";
import { passwordHash, randomString } from "../../../utils/functions.js";
import Mailer from "../../../utils/mailer.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { userSchema } from "../../master-user/user.schema.js";
import authRepositories from "../auth.repositories.js";
import { forgotPasswordSchema } from "../auth.schema.js";

const userRepository = new MongodbWrapper(userSchema());
const masterClientRepository = new MongodbWrapper(masterClientSchema());
const forgotRepository = new authRepositories(forgotPasswordSchema());

const forgotPassword = async (req, res) => {
  const { email, company_npwp } = req.body;

  const getClient = await masterClientRepository.getByFilter({
    company_npwp: company_npwp,
    status: 1,
  });
  const clientId = getClient.data.length > 0 ? getClient.data[0]._id : null;

  const getUserActive = await userRepository.getByFilter({
    email: email,
    client_id: clientId,
    status: 1,
  });

  if (!getUserActive.success) {
    return forbidden({
      message: "User not found or inactive.",
    });
  }

  const code = randomString(50);

  try {
    const mailer = new Mailer();
    mailer
      .to(email)
      .subject(`Reset Password Link`)
      .body(
        "Click the link below to reset your password: " +
          APPURL +
          "/reset/" +
          code
      );

    await mailer.send();
  } catch (error) {
    console.error("Failed to send email:", error);
    return error({
      message: "Failed to send reset email.",
    });
  }

  const createResetData = await forgotRepository.setForgotPassword({
    client_id: clientId,
    email: email,
    token: code,
    expired: new Date(Date.now() + 10 * 60 * 1000),
  });

  if (!createResetData.success) {
    ErrorHandler({
      message: "Failed to create reset password request.",
      error: createResetData.message,
    });
    return error({
      message: "Failed to process reset request.",
    });
  }

  return success({
    message:
      "Reset Password Success! Please check your email to reset your password",
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const getResetData = await forgotRepository.getByFilter({
    token: token,
  });

  if (!getResetData.success || getResetData.data.length === 0) {
    return forbidden({
      message: "Invalid or expired reset token.",
    });
  }

  const resetData = getResetData.data[0];
  if (resetData.expired < new Date()) {
    return badRequest({
      message: "Reset token has expired.",
    });
  }
  const clientId = resetData.client_id;

  try {
    const getUsersWithEmail = await userRepository.getByFilter({
      email: resetData.email,
      client_id: clientId,
    });

    if (!getUsersWithEmail.success) {
      return error({
        message: "Failed to find users with this email.",
      });
    }

    const id = getUsersWithEmail.data[0]._id;

    const hashedPassword = passwordHash(password);
    const updateResult = await userRepository.update(id, {
      password: hashedPassword,
    });

    if (!updateResult.success) {
      return Response(
        res,
        badRequest({
          message: "Failed to update password.",
        })
      );
    }

    await forgotRepository.deleteForgotPassword({
      token: token,
    });

    return success({
      message: `Password reset successfully for ${updatedCount} account(s) with this email.`,
    });
  } catch (e) {
    ErrorHandler({ message: "Failed to reset password", error: e.message });
    return error({
      message: "Failed to reset password.",
    });
  }
};

const forgotPasswordController = {
  forgotPassword,
  resetPassword,
};

export default forgotPasswordController;
