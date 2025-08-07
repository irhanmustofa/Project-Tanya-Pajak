import Response, { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import createGroup from "./controllers/create.group.js";
import deleteSomeGroup from "./controllers/deleteSome.group.js";
import updateGroup from "./controllers/update.group.js";
import { groupSchema } from "./group.schema.js";

const wrapper = (client_id) => new MongodbWrapper(groupSchema(client_id));

const all = async (req, res) => {
  const clientId = req.headers.clientid;
  return Response(res, await wrapper(clientId).allOrder("kode_group", "ASC"));
};

const getById = async (req, res) => {
  const clientId = req.headers.clientid;
  const id = req.params.id;
  return Response(res, await wrapper(clientId).getByFilter({ _id: id }));
};

const create = async (req, res) => {
  return Response(res, await createGroup(req));
};

const update = async (req, res) => {
  return Response(res, await updateGroup(req));
};

const upload = async (req, res) => {
  const clientId = req.headers.clientid;
  return Response(res, await wrapper(clientId).import(req.body));
};

const remove = async (req, res) => {
  const clientId = req.headers.clientid;
  const id = req.params.id;
  return Response(res, await wrapper(clientId).delete(id));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeGroup(req));
};

export default {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome,
  upload,
};
