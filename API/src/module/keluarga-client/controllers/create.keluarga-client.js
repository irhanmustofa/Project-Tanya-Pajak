import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Keluarga from "../../keluarga-client/keluarga-client.entities.js";
import { generateId } from "../../../utils/functions.js";

export default async function createKeluarga(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, [
      "data_keluarga",
    ]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData =
      getData.data[0].data_keluarga?.length !== undefined
        ? getData.data[0].data_keluarga
        : [];

    const validation = new Keluarga({ ...req.body, _id: generateId() });
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData.push(validation);
    return await wrapper.update(clientId, { data_keluarga: singleData });
  } catch (err) {
    console.log("create Keluarga client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
