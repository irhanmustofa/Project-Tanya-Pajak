import Response from "../../app/response.js";
import createKontak from "./controllers/create.kontak-client.js";
import updateKontak from "./controllers/update.kontak-client.js";
import deleteKontak from "./controllers/delete.kontak-client.js";
import deleteSomeKontak from "./controllers/deleteSome.kontak-client.js";

const create = async (req, res) => {
  return Response(res, await createKontak(req));
};

const update = async (req, res) => {
  return Response(res, await updateKontak(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteKontak(req));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeKontak(req));
};

const kontakController = {
  create,
  update,
  remove,
  deleteSome,
};

export default kontakController;
