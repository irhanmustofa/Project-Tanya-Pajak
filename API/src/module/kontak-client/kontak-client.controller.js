import Response from "../../app/response.js";
import createKontakClient from "./controllers/create.kontak-client.js";
import updateKontakClient from "./controllers/update.kontak-client.js";
import deleteKontakClient from "./controllers/delete.kontak-client.js";
import deleteSomeKontakClient from "./controllers/deleteSome.kontak-client.js";

const create = async (req, res) => {
  return Response(res, await createKontakClient(req));
};

const update = async (req, res) => {
  return Response(res, await updateKontakClient(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteKontakClient(req));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeKontakClient(req));
};

const MasterClientController = {
  create,
  update,
  remove,
  deleteSome,
};

export default MasterClientController;
