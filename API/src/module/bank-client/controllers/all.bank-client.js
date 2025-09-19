import { error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function allBank(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  try {
    return await wrapper.getByFilter({ _id: clientId }, ["data_bank"]);
  } catch (err) {
    console.log("Get all bank error:", err);
    return error({
      message:
        "An error occured while the system was running, refresh your page!",
    });
  }
}
