import Response from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { unlinkFile } from "../../utils/uploadHandler.js";
import { masterClientSchema } from "../master-client/master-client.schema.js";
import createAlamat from "./controllers/create.alamat.js";
import updateAlamat from "./controllers/update.alamat.js";

const wrapper = new MongodbWrapper(masterClientSchema());

const getById = async (req, res) => {
  const result = await wrapper.getByFilter({ _id: req.params.id });
  return Response(res, result);
};

const create = async (req, res) => {
  return Response(res, await createAlamat(req));
};

const update = async (req, res) => {
  return Response(res, await updateAlamat(req));
};

const remove = async (req, res) => {
  return Response(res, await wrapper.delete(req.params.id));
};

const deleteSome = async (req, res) => {
  const ids = req.body;

  const clientLogos = [];
  for (const id of ids) {
    try {
      const getClient = await wrapper.getByFilter({ _id: id });
      if (getClient.status && getClient.data && getClient.data[0]?.logo) {
        clientLogos.push(getClient.data[0].logo);
      }
    } catch (error) {
      console.error(`Error getting client ${id}:`, error);
    }
  }

  const result = await wrapper.delete(ids);
  return Response(res, result);
};

const MasterClientController = {
  getById,
  create,
  update,
  remove,
  deleteSome,
};

export default MasterClientController;
