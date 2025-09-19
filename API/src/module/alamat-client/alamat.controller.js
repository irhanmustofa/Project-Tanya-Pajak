import Response from "../../app/response.js";
import createAlamat from "./controllers/create.alamat.js";
import deleteAlamat from "./controllers/delete.alamat.js";
import deleteSomeAlamat from "./controllers/deleteSome.alamat.js";
import updateAlamat from "./controllers/update.alamat.js";

const create = async (req, res) => {
  return Response(res, await createAlamat(req));
};

const update = async (req, res) => {
  return Response(res, await updateAlamat(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteAlamat(req));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeAlamat(req));
};

const alamatController = {
  create,
  update,
  remove,
  deleteSome,
};

export default alamatController;
