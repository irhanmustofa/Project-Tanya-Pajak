import { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { generateId } from "../../../utils/functions.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Alamat from "../alamat.entities.js";

export default async function createAlamat(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  const getData = await wrapper.getByFilter({ _id: clientId });

  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  try {
    const singleData = getData.data[0].data_alamat;
    const inputAlamat = { ...req.body, _id: generateId() };

    const alamatClient = new Alamat(inputAlamat);
    if (alamatClient.errors) {
      return badRequest({ message: alamatClient.errors.join(", ") });
    }

    singleData.push(inputAlamat);
    return await wrapper.update(clientId, { data_alamat: singleData });
  } catch (error) {
    console.log("Error add client address:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
