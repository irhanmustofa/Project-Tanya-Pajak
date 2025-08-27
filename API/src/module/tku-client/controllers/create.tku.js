import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { generateId } from "../../../utils/functions.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import TKU from "../tku.entities.js";

export default async function createTku(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData =
      getData.data[0].tempat_kegiatan_usaha.length < 1
        ? []
        : tempat_kegiatan_usaha;

    const input = { ...req.body, _id: generateId() };
    const dataValidation = new TKU(input);

    if (dataValidation.errors) {
      return badRequest({ message: dataValidation.errors.join(", ") });
    }

    singleData.push(dataValidation);
    return await wrapper.update(clientId, {
      tempat_kegiatan_usaha: singleData,
    });
  } catch (err) {
    console.log("Create TKU client error:", err);
    return error({
      message:
        "An error occurred while the system was running, Refresh your page!",
    });
  }
}
