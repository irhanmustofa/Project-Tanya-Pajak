import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { generateId } from "../../../utils/functions.js";
import OrangTerkait from "../orang-terkait-client.entities.js";

export default async function createOrangTerkait(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var singleData =
      getData.data[0].orang_terkait.length > 0
        ? getData.data[0].orang_terkait
        : [];
    console.log("singleData:", singleData);
    const dataValid = new OrangTerkait({ ...req.body, _id: generateId() });
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    singleData.push(dataValid);
    return await wrapper.update(clientId, { orang_terkait: singleData });
  } catch (err) {
    console.log("create Related Person client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
