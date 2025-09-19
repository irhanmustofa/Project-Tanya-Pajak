import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteBank(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, ["data_bank"]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].data_bank;
    if (singleData.length < 1) {
      return badRequest({
        message: "Delete Bank client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    const arrayNum = dataId.indexOf(id);
    if (arrayNum < 0) {
      return badRequest({
        message: "Delete Bank client failed! data not found",
      });
    }

    singleData.splice(arrayNum, 1);
    return await wrapper.update(clientId, { data_bank: singleData });
  } catch (err) {
    console.log("delete Bank client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
