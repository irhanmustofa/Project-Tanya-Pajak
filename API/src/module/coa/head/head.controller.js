import Response, { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { headSchema } from "./head.schema.js";
import updateHead from "./controllers/update.head.js";
import createHead from "./controllers/create.head.js";
import deleteSomeHead from "./controllers/deletesome.head.js";

const wrapper = (client_id) => new MongodbWrapper(headSchema(client_id));

const all = async (req, res) => {
  const clientId = req.headers.clientid;
  return Response(res, await wrapper(clientId).allOrder("kode_head", "ASC"));
};

const getById = async (req, res) => {
  const clientId = req.headers.clientid;
  const id = req.params.id;
  return Response(res, await wrapper(clientId).getByFilter(id));
};

const create = async (req, res) => {
  return Response(res, await createHead(req));
};

const update = async (req, res) => {
  return Response(res, await updateHead(req));
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
  return Response(res, await deleteSomeHead(req));
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
