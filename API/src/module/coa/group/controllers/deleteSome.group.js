import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import { groupSchema } from "../group.schema.js";

export default async function deleteSomeGroup(req) {
  const ids = req.body;
  const clientId = req.headers.clientid;

  // let result = { success: false, message: "Failed to delete some items" };
  if (!Array.isArray(ids) || ids.length === 0) {
    return badRequest({ message: "Invalid or empty IDs array" });
  }

  const wrapper = new MongodbWrapper(groupSchema(clientId));
  return await wrapper.deleteSome(ids);
}
