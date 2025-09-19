import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { generateId } from "../../../utils/functions.js";
import KontakClient from "../kontak-client.entities.js";

export default async function createKontak(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var singleData = getData.data[0].data_kontak || [];
    const dataValid = new KontakClient({ ...req.body, _id: generateId() });
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    singleData.push(dataValid);
    return await wrapper.update(clientId, { data_kontak: singleData });
  } catch (err) {
    console.log("cretae Contact client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
