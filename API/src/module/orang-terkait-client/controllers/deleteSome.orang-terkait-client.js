import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeOrangTerkait(req) {
  const ids = req.body;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  var newData = [];
  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].orang_terkait || [];
    if (singleData.length < 1) {
      return badRequest({
        message: "Delete related person failed! Data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    for (let i = 0; i < ids.length; i++) {
      if (dataId.indexOf(ids[i]) < 0) {
        return badRequest({
          message: "Delete related person failed! Data not found",
        });
      }
    }

    singleData.map((item) => {
      if (ids.indexOf(item._id) < 0) {
        newData.push(item);
      }
    });

    return await wrapper.update(clientId, { orang_terkait: newData });
  } catch (err) {
    console.log("Delete related person Error:", err);
    return error({
      message: "An error occurred while the system was running ",
    });
  }
}
