import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import MasterClient from "../master-client.entities.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function createClient(req) {
  try {
    const wrapper = new MongodbWrapper(masterClientSchema());
    const masterClient = new MasterClient(req.body);

    if (masterClient.errors) {
      return badRequest({ message: masterClient.errors.join(", ") });
    }

    return await wrapper.create(masterClient);
  } catch (err) {
    console.log("create client error:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
