import { badRequest } from "../../../../app/response.js";
import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import Head from "../head.entities.js";
import { headSchema } from "../head.schema.js";

export default async function createHead(req) {
  const clientId = req.headers.clientid;
  const headCoa = new Head(req.body);

  if (headCoa.errors) {
    return badRequest({ message: headCoa.errors.join(", ") });
  }

  const wrapper = new MongodbWrapper(headSchema(clientId));
  return await wrapper.create(headCoa);
}
