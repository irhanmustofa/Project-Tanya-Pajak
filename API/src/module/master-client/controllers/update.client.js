import Response, { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import MasterClient from "../master-client.entities.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function updateClient(req) {
  try {
    const wrapper = new MongodbWrapper(masterClientSchema());
    const masterClient = new MasterClient(req.body);

    if (masterClient.errors) {
      return badRequest({ message: masterClient.errors.join(", ") });
    }

    return await wrapper.update(req.params.id, masterClient);
  } catch (error) {
    console.log("Error updating client:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
