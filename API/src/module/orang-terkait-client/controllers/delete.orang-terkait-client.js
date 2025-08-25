import { badRequest, error } from "../../../app/response";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper";
import { masterClientSchema } from "../../master-client/master-client.schema";

export default async function deleteOrangTerkait(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

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
    if (dataId.indexOf(id) < 0) {
      return badRequest({
        message: "Delete related person failed! Data not found",
      });
    }

    const arrayNum = dataId.indexOf(id);
    singleData.splice(arrayNum, 1);
    return await wrapper.update(clientId, { orang_terkait: singleData });
  } catch (err) {
    console.log("Delete related person Error:", err);
    return error({
      message: "An error occurred while the system was running ",
    });
  }
}
