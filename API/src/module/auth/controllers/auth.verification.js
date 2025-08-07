import { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { userSchema } from "../../master-user/user.schema.js";

export default async function authVerification(req) {
  const wrapper = new MongodbWrapper(userSchema());
  const checkToken = await wrapper.getByFilter({
    token: req.params.token,
  });

  if (!checkToken.success) {
    return badRequest({ message: checkToken.message });
  }

  if (checkToken.data[0].expired < new Date(Date.now())) {
    return badRequest({ message: "Your link verification is expired" });
  }

  if (checkToken.data[0].status < 1) {
    return badRequest({ message: "Your link verification is Deactived" });
  }

  return checkToken;
}
