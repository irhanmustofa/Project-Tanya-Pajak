import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import MasterCoa from "../master.entities.js";
import { masterCoaSchema } from "../master.schema.js";

export default async function updateMasterCoa(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid ?? "";
  const wrapper = new MongodbWrapper(masterCoaSchema(clientId));
  const masterCoa = new MasterCoa(req.body);

  if (masterCoa.errors) {
    return badRequest({ message: masterCoa.errors.join(", ") });
  }

  const getCoa = await wrapper.getByFilter({ _id: id });
  if (!getCoa.success) {
    return badRequest({ message: getCoa.message });
  }

  return await wrapper.update(id, masterCoa);
}
