import { authConfig } from "../../../config/config.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import {
  createToken,
  generateId,
  passwordHash,
} from "../../../utils/functions.js";
import NodeMailer from "../../../utils/node.mailer.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { userSchema } from "../../master-user/user.schema.js";

export default async function authRegister(req) {
  const { nama, email, password } = req.body;
  const hashPass = passwordHash(password);
  const inputUser = {
    email: email,
    nama: nama,
    role: 1,
    password: hashPass,
    status: 0,
    token: createToken(),
    expired: new Date(Date.now() + authConfig.expirationOtp),
  };

  const inputClient = {
    id_client:
      "ID" +
      new Date().getFullYear() +
      "" +
      new Date().getMonth() +
      "" +
      new Date().getDate() +
      "" +
      new Date().getHours() +
      "" +
      new Date().getMinutes() +
      "" +
      new Date().getSeconds() +
      generateId(),
    status: 1,
  };

  var result = { success: false, message: "Register Failed, Try again!" };
  result = await new MongodbWrapper(userSchema()).create(inputUser);
  if (result.success) {
    const sendEmail = new NodeMailer();
    try {
      sendEmail
        .to(inputUser.email)
        .subject("TOKEN LU BANG")
        .body(
          "this is your verification link: http://localhost:5173/verification/" +
            inputUser.token
        )
        .send();
      console.log("email:", sendEmail);
    } catch (err) {
      console.log("err:", err);
    }
    result = await new MongodbWrapper(masterClientSchema()).create(inputClient);
  }

  return result;
}
