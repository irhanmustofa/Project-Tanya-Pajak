import { error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function createClient(req) {
  const wrapper = new MongodbWrapper(masterClientSchema());
  var alamat = [],
    kontak = [];
  try {
    if (req.body?.alamat) {
      console.log("alamat:", req.body.alamat);
    }
    return { success: true, message: "amjayyy" };
  } catch (err) {
    console.error("create client error:", err);
    return error({
      message: err.message,
    });
  }
}
