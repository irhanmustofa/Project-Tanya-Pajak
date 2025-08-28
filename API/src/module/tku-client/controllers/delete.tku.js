import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteTku(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].tempat_kegiatan_usaha;
    if (singleData.length < 1) {
      return badRequest({ message: "Delete TKU failed! Data not found" });
    }

    const dataId = singleData.map((item) => item._id);
    if (dataId.indexOf(id) < 0) {
      return badRequest({ message: "Delete TKU failed! Data not found" });
    }

    const arrayNum = dataId.indexOf(id);
    singleData.splice(arrayNum, 1);
    return await wrapper.update(clientId, {
      tempat_kegiatan_usaha: singleData,
    });
  } catch (err) {
    console.log("Delete TKU client error:", err);
    return error({
      message: "An error occured while system was running, Refresh your page",
    });
  }
}
