import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import MasterCoa from "../master.entities.js";
import { masterCoaSchema } from "../master.schema.js";

export default async function createMasterCoa(req) {
  const wrapper = new MongodbWrapper(masterCoaSchema(req.headers.clientid));
  console.log("mastercoa:", req.body);
  const masterCoa = new MasterCoa(req.body);

  if (masterCoa.errors) {
    return badRequest({ message: masterCoa.errors.join(", ") });
  }

  const getDataId = await wrapper.getByFilter({
    kode_akun: req.body.kode_akun,
  });

  if (getDataId.success) {
    return {
      success: false,
      message: "kode akun sudah pernah diinputkan, coba lagi",
    };
  }
  return await wrapper.create(masterCoa);
}
