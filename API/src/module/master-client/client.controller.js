import Response from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "./master-client.schema.js";
import createClient from "./controllers/create.client.js";
import updateClient from "./controllers/update.client.js";

const wrapper = new MongodbWrapper(masterClientSchema());

const all = async (req, res) => {
  return Response(res, await wrapper.all());
};

const getById = async (req, res) => {
  const result = await wrapper.getByFilter({ _id: req.params.id });
  return Response(res, result);
};

const create = async (req, res) => {
  return Response(res, await createClient(req));
};

const update = async (req, res) => {
  return Response(res, await updateClient(req));
};

const remove = async (req, res) => {
  return Response(res, await wrapper.delete(req.params.id));
};

const deleteSome = async (req, res) => {
  const result = await wrapper.delete(ids);
  return Response(res, result);
};

const MasterClientController = {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome,
};

export default MasterClientController;
