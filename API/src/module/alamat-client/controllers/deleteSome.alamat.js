import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";

export default async function deleteSomeAlamat(req) {
  var newData = [];
  let alamatUnique = "";
  const ids = req.body;
  const clientId = req.headers.clientid;

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
      if (alamatUnique !== undefined && ids.indexOf(alamatUnique) > -1) {
        arrayNum = i;
      }
    }

    if (arrayNum < 0) {
      return badRequest({ message: "Delete Alamat Failed! data not found" });
    }

    for (let i = 0; i < singleData.length; i++) {
      alamatUnique = singleData[i]._id;
      if (alamatUnique !== undefined && ids.indexOf(alamatUnique) < 0) {
        newData.push(singleData[i]);
      }
    }

    return await wrapper.update(clientId, { data_alamat: newData });
  } catch (err) {
    console.log("Error delete some client address:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
