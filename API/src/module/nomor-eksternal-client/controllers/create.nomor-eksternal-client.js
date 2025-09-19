import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import NomorEksternal from "../nomor-eksternal-client.entities.js";
import { generateId } from "../../../utils/functions.js";

export default async function createNomorEksternal(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, [
      "nomor_eksternal",
    ]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData =
      getData.data[0].nomor_eksternal?.length !== undefined
        ? getData.data[0].nomor_eksternal
        : [];

    const validation = new NomorEksternal({ ...req.body, _id: generateId() });
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData.push(validation);
    return await wrapper.update(clientId, { nomor_eksternal: singleData });
  } catch (err) {
    console.log("Create nomor eksternal error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
