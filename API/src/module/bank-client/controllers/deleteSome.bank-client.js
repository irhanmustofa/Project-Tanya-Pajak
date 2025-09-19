import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeBank(req) {
  const newData = [];
  const ids = req.body;
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
        message: "Delete some Bank client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    for (let i = 0; i < ids.length; i++) {
      if (dataId.indexOf(ids[i]) < 0) {
        return badRequest({
          message: "Delete some Bank client failed! data not found",
        });
      }
    }

    singleData.map((item) => {
      if (ids.indexOf(item._id) < 0) {
        newData.push(item);
      }
    });

    return await wrapper.update(clientId, { data_bank: newData });
  } catch (err) {
    console.log("delete Some Bank client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
