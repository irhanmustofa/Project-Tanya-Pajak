import Response from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterCoaSchema } from "./master.schema.js";
import createMasterCoa from "./controllers/create.master.js";
import updateMasterCoa from "./controllers/update.master.js";
import importMasterCoa from "./controllers/import.master.js";
import deleteSomeMasterCoa from "./controllers/deleteSome.master.js";

const wrapper = (client_id) => new MongodbWrapper(masterCoaSchema(client_id));

const all = async (req, res) => {
  return Response(res, await wrapper(req.headers.clientid).all());
};

const getById = async (req, res) => {
  const clientId = req.headers.clientid;
  const id = req.params.id;
  return Response(res, await wrapper(clientId).getByFilter(id));
};

const create = async (req, res) => {
  return Response(res, await createMasterCoa(req));
};

const update = async (req, res) => {
  return Response(res, await updateMasterCoa(req));
};

const upload = async (req, res) => {
  return Response(res, await importMasterCoa(req));
};

const remove = async (req, res) => {
  const clientId = req.headers.clientid;
  const id = req.params.id;
  return Response(res, await wrapper(clientId).delete(id));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeMasterCoa(req));
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
