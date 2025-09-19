import Response from "../../app/response.js";
import allNomorEksternal from "./controllers/all.nomor-eksternal-client.js";
import createNomorEksternal from "./controllers/create.nomor-eksternal-client.js";
import updateNomorEksternal from "./controllers/update.nomor-eksternal-client.js";
import deleteNomorEksternal from "./controllers/delete.nomor-eksternal-client.js";
import deleteSomeNomorEksternal from "./controllers/deleteSome.nomor-eksternal-client.js";

const all = async (req, res) => {
  return Response(res, await allNomorEksternal(req));
};

const create = async (req, res) => {
  return Response(res, await createNomorEksternal(req));
};

const update = async (req, res) => {
  return Response(res, await updateNomorEksternal(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteNomorEksternal(req));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeNomorEksternal(req));
};

const nomorEksternalController = {
  all,
  create,
  update,
  remove,
  deleteSome,
};

export default nomorEksternalController;
