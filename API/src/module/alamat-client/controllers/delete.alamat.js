import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteAlamat(req) {
  var newData = [];
  let alamatUnique = "";
  const id = req.params.id;
  const clientId = req.params.clientId;
  const wrapper = new MongodbWrapper(masterClientSchema());
  const getData = await wrapper.getByFilter({ _id: clientId });
  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  try {
    var singleData = getData.data[0].data_alamat;
    var arrayNum = -1;
    for (let i = 0; i < singleData.length; i++) {
      alamatUnique = singleData[i]._id;
      if (alamatUnique !== undefined && alamatUnique == id) {
        arrayNum = i;
      }
    }

    if (arrayNum < 0) {
      return badRequest({ message: "Delete Alamat Failed! data not found" });
    }

    for (let i = 0; i < singleData.length; i++) {
      alamatUnique = singleData[i]._id;
      if (alamatUnique !== undefined && alamatUnique !== id) {
        newData.push(singleData[i]);
      }
    }

    return await wrapper.update(clientId, { data_alamat: newData });
  } catch (err) {
    console.log("Error delete client address:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
