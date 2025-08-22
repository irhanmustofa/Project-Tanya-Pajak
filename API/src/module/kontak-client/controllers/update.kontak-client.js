import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { generateId } from "../../../utils/functions.js";
import KontakClient from "../kontak-client.entities.js";

export default async function updateKontakClient(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  const newData = [];

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var singleData = getData.data[0].data_kontak;
    const input = {};
    const dataValid = new KontakClient({ ...req.body, _id: generateId() });
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    if (singleData.length > 0) {
      singleData.push(dataValid);
    } else {
      singleData = [dataValid];
    }

    return await wrapper.update(clientId, { data_kontak: singleData });
  } catch (err) {
    console.log("cretae kontak client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
