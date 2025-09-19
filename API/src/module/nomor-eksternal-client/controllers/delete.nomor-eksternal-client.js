import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteNomorEksternal(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, [
      "nomor_eksternal",
    ]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].nomor_eksternal;
    if (singleData.length < 1) {
      return badRequest({
        message: "Delete nomor eksternal client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    const arrayNum = dataId.indexOf(id);
    if (arrayNum < 0) {
      return badRequest({
        message: "Delete nomor eksternal client failed! data not found",
      });
    }

    singleData.splice(arrayNum, 1);
    return await wrapper.update(clientId, { nomor_eksternal: singleData });
  } catch (err) {
    console.log("Delete nomor eksternal error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
