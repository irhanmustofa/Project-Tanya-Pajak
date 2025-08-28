import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeTku(req) {
  var newData = [];
  const ids = req.body;
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
    console.log("singleData:", singleData);
    return badRequest({ message: "banyak kali kuahmu!!!" });
    const dataId = singleData.map((item) => item._id);
    for (let i = 0; i < ids.length; i++) {
      if (dataId.indexOf(ids[i]) < 0) {
        return badRequest({ message: "Delete TKU failed! Data not found" });
      }
    }

    singleData.map((item) => {
      if (ids.indexOf(item._id) < 0) {
        newData.push(item);
      }
    });

    return await wrapper.update(clientId, {
      tempat_kegiatan_usaha: newData,
    });
  } catch (err) {
    console.log("Delete TKU client error:", err);
    return error({
      message: "An error occured while system was running, Refresh your page",
    });
  }
}
