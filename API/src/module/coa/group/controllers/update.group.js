import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import Group from "../group.entities.js";
import { groupSchema } from "../group.schema.js";

export default async function updateGroup(req) {
  const clientId = req.headers.clientid;
  const id = req.params.id;

  const wrapper = new MongodbWrapper(groupSchema(clientId));
  const getDataById = await wrapper.getByFilter({ _id: id });
  if (!getDataById.success) {
    return badRequest({ message: getDataById.message });
  }

  const groupCoa = new Group(req.body);
  if (groupCoa.errors) {
    return badRequest({ message: groupCoa.errors.join(", ") });
  }

  return wrapper.update(id, groupCoa);
}
