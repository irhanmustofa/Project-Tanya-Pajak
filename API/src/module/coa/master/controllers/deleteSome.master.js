import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import { masterCoaSchema } from "../master.schema.js";

export default async function deleteSomeMasterCoa(req) {
  const ids = req.body;
  const clientId = req.headers.clientid;

  let result = {
    success: false,
    message: "Failed delete some items, try again!",
  };

  if (!Array.isArray(ids) || ids.length === 0) {
    return badRequest({ message: "Invalid or empty IDs array" });
  }

  for (const id of ids) {
    result = await new MongodbWrapper(masterCoaSchema(clientId)).delete(id);
    console.log("id:", id);
  }

  return result;
}
