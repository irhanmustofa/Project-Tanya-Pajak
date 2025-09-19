import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeNomorEksternal(req) {
  const newData = [];
  const ids = req.body;
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
        message: "Delete some nomor eksternal client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    for (let i = 0; i < ids.length; i++) {
      if (dataId.indexOf(ids[i]) < 0) {
        return badRequest({
          message: "Delete some nomor eksternal client failed! data not found",
        });
      }
    }

    singleData.map((item) => {
      if (ids.indexOf(item._id) < 0) {
        newData.push(item);
      }
    });

    return await wrapper.update(clientId, { nomor_eksternal: newData });
  } catch (err) {
    console.log("Delete Some nomor eksternal error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
