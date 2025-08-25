import {
  error,
  forbidden,
  notFound,
  success,
  unauthorized,
} from "../../../app/response.js";
import { adminconfig, authConfig } from "../../../config/config.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import ErrorHandler from "../../../utils/error.handler.js";
import { passwordCompare, randomInt } from "../../../utils/functions.js";
import Mailer from "../../../utils/mailer.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { userSchema } from "../../master-user/user.schema.js";
import authRepositories from "../auth.repositories.js";
import { authenticationSchema, tryLoginSchema } from "../auth.schema.js";

const clientRepository = new MongodbWrapper(masterClientSchema());
const userRepository = new MongodbWrapper(userSchema());
const tryLoginRepository = new authRepositories(tryLoginSchema());
const authenticationRepository = new authRepositories(authenticationSchema());

const setLogin = async (body) => {
  const { email, password, device, company_npwp } = body;

  const filter = { company_npwp: company_npwp, status: 1 };
  const getClient = await clientRepository.getByFilter(filter);
  if (!getClient.success) return forbidden({ message: "Client not found" });
  const clientId = getClient.data[0]?._id;

  const getData = await userRepository.getByFilter({ email: email, client_id: clientId });

  if (!getData.success) {
    return forbidden({ message: "User not found." });
  }

  const data = getData.data[0];
  if (data.status !== 1) {
    return forbidden({ message: "User not active." });
  }

  const resetInput = {
    client_id: clientId,
    email,
    device,
    hits: 1,
    expired: new Date(Date.now() + authConfig.expirationOtp),
  };

  const isPasswordValid = passwordCompare(password, data.password);
  if (!isPasswordValid) {
    const getTryLogin = await tryLoginRepository.getTryLogin(email, clientId);
    const limit = authConfig.limitLogin;

    if (!getTryLogin.success) {
      const result = await tryLoginRepository.setTryLogin(resetInput);

      if (!result.success) {
        ErrorHandler({
          message: "Failed to set try login",
          error: result.message,
        });

        return error();
      }

      return unauthorized({
        message: "Wrong password. tries left: " + (limit - 1),
      });
    }

    let { hits, expired } = getTryLogin.data[0];

    if (expired < new Date()) {
      const result = await tryLoginRepository.setTryLogin(resetInput);

      if (!result.success) {
        ErrorHandler({
          message: "Failed to set try login",
          error: result.message,
        });

        return error();
      }

      return unauthorized({
        message: "Wrong password. tries left: " + (limit - 1),
      });
    }

    hits = hits + 1;

    if (hits >= limit) {
      return unauthorized({
        message:
          "Your account is locked due to too many failed login attempts. Please try again later.",
      });
    }

    const result = await tryLoginRepository.setTryLogin({
      client_id: clientId,
      email,
      hits,
    });

    if (!result.success) {
      ErrorHandler({
        message: "Failed to set try login",
        error: result.message,
      });

      return error();
    }

    return unauthorized({
      message: "Wrong password. tries left: " + (limit - hits),
    });
  }

  const getAuthentication = await authenticationRepository.getAuthentication(
    email,
    device
  );

  if (getAuthentication.success) {
    const isExpired = getAuthentication.data[0].expired < new Date();
    const isDevice = getAuthentication.data[0].device === device;

    if (!isExpired && !isDevice) {
      return unauthorized({
        message: "You are already online on another device.",
      });
    }
  }



  if (!getClient.success || getClient.data.length === 0) {
    return notFound({ message: "Client not found or inactive." });
  }

  try {
    const newOtp = randomInt(6).toString();
    const setAuthentication = await authenticationRepository.setAuthentication({
      email,
      device,
      otp: newOtp,
      client_id: clientId,
      expired: new Date(Date.now() + authConfig.expirationOtp),
    });

    if (!setAuthentication.success) {
      ErrorHandler({
        message: "Failed to set authentication.",
        error: setAuthentication.message,
      });
      return error();
    }

    const mailer = new Mailer();

    mailer
      .to(email)
      .subject("Your OTP Code")
      .body(`Your OTP code is: ${newOtp}. It is valid for 1 minute.`);

    await mailer.send();
    console.log(`OTP is: ${newOtp}`);
    return success({
      message: "Login successfully. OTP sent to your email.",
      data: {
        _id: clientId,
        role: data.role,
        name: data.name,
      },
    });
  } catch (e) {
    ErrorHandler({ message: "Failed to set login", error: e.message });
    return error();
  }
};

export default setLogin;
