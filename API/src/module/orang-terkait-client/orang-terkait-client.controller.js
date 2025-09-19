import Response from "../../app/response.js";
import createOrangTerkait from "./controllers/create.orang-terkait-client.js";
import updateOrangTerkait from "./controllers/update.orang-terkait-client.js";
import deleteOrangTerkait from "./controllers/delete.orang-terkait-client.js";
import deleteSomeOrangTerkait from "./controllers/deleteSome.orang-terkait-client.js";

const create = async (req, res) => {
  return Response(res, await createOrangTerkait(req));
};

const update = async (req, res) => {
  return Response(res, await updateOrangTerkait(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteOrangTerkait(req));
};

const deleteSome = async (req, res) => {
  return Response(res, await deleteSomeOrangTerkait(req));
};

const orangTerkaitController = {
  create,
  update,
  remove,
  deleteSome,
};

export default orangTerkaitController;
