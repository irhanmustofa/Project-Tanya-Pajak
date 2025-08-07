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
import { authenticationSchema, forgotPasswordSchema, tryLoginSchema } from "../auth.schema.js";

const userRepository = new MongodbWrapper(userSchema());
const forgotRepository = new authRepositories(forgotPasswordSchema());

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return forbidden({
      message: "Email is required!"
    });
  }

  const getUserActive = await userRepository.getByFilter({
    email: email,
    status: 1
  });

  if (!getUserActive.success) {
    return forbidden({
      message: "User not found or inactive."
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
      message: "Failed to send reset email."
    });
  }

  const createResetData = await forgotRepository.setForgotPassword({
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
      message: "Failed to process reset request."
    });
  }

  return success({
    message: "Reset Password Success! Please check your email to reset your password"
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
      message: "Invalid or expired reset token."
    });
  }

  const resetData = getResetData.data[0];
  if (resetData.expired < new Date()) {
    return badRequest({
      message: "Reset token has expired."
    });
  }

  try {
    const getUsersWithEmail = await userRepository.getByFilter({
      email: resetData.email
    });

    if (!getUsersWithEmail.success) {
      return error({
        message: "Failed to find users with this email."
      });
    }

    const hashedPassword = passwordHash(password);
    let updatedCount = 0;

    for (const user of getUsersWithEmail.data) {
      try {
        const updateResult = await userRepository.update(user._id, {
          password: hashedPassword
        });

        if (updateResult.success) {
          updatedCount++;
        }
      } catch (error) {
        console.error(`Failed to update user ${user._id}:`, error);
      }
    }

    if (updatedCount === 0) {
      return error({
        message: "Failed to update any user passwords."
      });
    }

    await forgotRepository.deleteForgotPassword({
      token: token,
    });

    return success({
      message: `Password reset successfully for ${updatedCount} account(s) with this email.`
    });
  } catch (e) {
    ErrorHandler({ message: "Failed to reset password", error: e.message });
    return error({
      message: "Failed to reset password."
    });
  }
};

const forgotPasswordController = {
  forgotPassword,
  resetPassword
};

export default forgotPasswordController;