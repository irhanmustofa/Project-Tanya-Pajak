import Response from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { unlinkFile } from "../../utils/uploadHandler.js";
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

const create = createClient;

const update = updateClient;
const remove = async (req, res) => {
  const client = await wrapper.getByFilter({ _id: req.params.id });
  if (client.data[0]?.logo) {
    await unlinkFile(client.data[0].logo);
  }

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

  if (clientLogos.length > 0) {
    for (const logoPath of clientLogos) {
      try {
        const deleteResult = await unlinkFile(logoPath);
        if (!deleteResult.status) {
          console.error("Failed to delete logo:", deleteResult.message);
        }
      } catch (deleteError) {
        console.error("Error deleting logo file:", deleteError);
      }
    }
  }

  const result = await wrapper.delete(ids);
  return Response(res, result);
};

const MasterClientController = {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome
};

export default MasterClientController;
