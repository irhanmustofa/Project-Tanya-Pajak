import Response from "../../app/response.js";
import allKeluarga from "./controllers/all.keluarga-client.js";
import createKeluarga from "./controllers/create.keluarga-client.js";
import deleteKeluarga from "./controllers/delete.keluarga-client.js";
import deleteSomeKeluarga from "./controllers/deleteSome.keluarga-client.js";
import updateKeluarga from "./controllers/update.keluarga-client.js";

const all = async (req, res) => {
  return Response(res, await allKeluarga(req));
};

const create = async (req, res) => {
  return Response(res, await createKeluarga(req));
};

const update = async (req, res) => {
  return Response(res, await updateKeluarga(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteKeluarga(req));
};

const deleteSome = async (req, res) => {
  const result = await deleteSomeKeluarga(req);
  return Response(res, result);
};

const KeluargaController = {
  all,
  create,
  update,
  remove,
  deleteSome,
};

export default KeluargaController;
