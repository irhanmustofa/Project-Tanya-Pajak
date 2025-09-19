import Response from "../../app/response.js";
import createTku from "./controllers/create.tku.js";
import deleteTku from "./controllers/delete.tku.js";
import deleteSomeTku from "./controllers/deleteSome.tku.js";
import updateTku from "./controllers/update.tku.js";

const create = async (req, res) => {
  return Response(res, await createTku(req));
};

const update = async (req, res) => {
  return Response(res, await updateTku(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteTku(req));
};

const deleteSome = async (req, res) => {
  const result = await deleteSomeTku(req);
  return Response(res, result);
};

const TkuController = {
  create,
  update,
  remove,
  deleteSome,
};

export default TkuController;
