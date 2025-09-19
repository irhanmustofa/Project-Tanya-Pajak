import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeKontak(req) {
  const ids = req.body;
  const clientId = req.headers.clientid;
  var newData = [];
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var arrayKontak = getData.data[0].data_kontak;
    if (arrayKontak.length < 1) {
      return badRequest({ message: "Data not found" });
    }

    const dataId = arrayKontak.map((item) => item._id);
    for (let i = 0; i < ids.length; i++) {
      if (dataId.indexOf(ids[i]) < 0) {
        return badRequest({ message: "Data not found" });
      }
    }

    arrayKontak.map((item) => {
      if (ids.indexOf(item._id) < 0) {
        newData.push(item);
      }
    });

    return await wrapper.update(clientId, { data_kontak: newData });
  } catch (err) {
    console.log("Delete Some Contact client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
