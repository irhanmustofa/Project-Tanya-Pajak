import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteKontakClient(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const arrayKontak = getData.data[0].data_kontak || [];
    if (arrayKontak.length < 1) {
      return badRequest({ message: "Data not found" });
    }

    const dataId = arrayKontak.map((item) => item._id);
    if (dataId.indexOf(id) < 0) {
      return badRequest({ message: "Data not found" });
    }

    arrayKontak.splice(dataId.indexOf(id), 1);
    return await wrapper.update(clientId, { data_kontak: arrayKontak });
  } catch (err) {
    console.log("Delete Contact client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
