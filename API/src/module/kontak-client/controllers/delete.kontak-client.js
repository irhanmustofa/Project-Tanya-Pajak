import { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteKontakClient(req) {
  const id = req.params.id;
  const clientId = req.headers.clientId;

  const wrapper = new MongodbWrapper(masterClientSchema());

  const getData = await wrapper.getByFilter({ _id: clientId });
  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  const arrKontak = getData.data[0].data_kontak;
}
