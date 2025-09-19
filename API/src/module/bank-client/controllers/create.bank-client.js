import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Bank from "../../bank-client/bank-client.entities.js";
import { generateId } from "../../../utils/functions.js";

export default async function createBank(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, ["data_bank"]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData =
      getData.data[0].data_bank?.length !== undefined
        ? getData.data[0].data_bank
        : [];

    const validation = new Bank({ ...req.body, _id: generateId() });
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData.push(validation);
    return await wrapper.update(clientId, { data_bank: singleData });
  } catch (err) {
    console.log("create Bank client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
