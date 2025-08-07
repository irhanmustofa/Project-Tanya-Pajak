import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import Group from "../group.entities.js";
import { groupSchema } from "../group.schema.js";

export default async function createGroup(req) {
  const clientId = req.headers.clientid;
  const groupCoa = new Group(req.body);

  if (groupCoa.errors) {
    return badRequest({ message: groupCoa.errors.join(", ") });
  }

  const wrapper = new MongodbWrapper(groupSchema(clientId));
  return await wrapper.create(groupCoa);
}
