import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import Head from "../head.entities.js";
import { headSchema } from "../head.schema.js";

export default async function updateHead(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;

  const wrapper = new MongodbWrapper(headSchema(clientId));
  const getData = await wrapper.getByFilter({ _id: id });
  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  const headCoa = new Head(req.body);
  if (headCoa.errors) {
    return badRequest({ message: headCoa.errors.join(", ") });
  }

  return await wrapper.update(id, headCoa);
}
