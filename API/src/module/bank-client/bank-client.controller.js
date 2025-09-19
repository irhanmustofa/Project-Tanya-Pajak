import Response from "../../app/response.js";
import createBank from "./controllers/create.bank-client.js";
import deleteBank from "./controllers/delete.bank-client.js";
import deleteSomeBank from "./controllers/deleteSome.bank-client.js";
import updateBank from "./controllers/update.bank-client.js";
import allBank from "./controllers/all.bank-client.js";

const all = async (req, res) => {
  return Response(res, await allBank(req));
};

const create = async (req, res) => {
  return Response(res, await createBank(req));
};

const update = async (req, res) => {
  return Response(res, await updateBank(req));
};

const remove = async (req, res) => {
  return Response(res, await deleteBank(req));
};

const deleteSome = async (req, res) => {
  const result = await deleteSomeBank(req);
  return Response(res, result);
};

const BankController = {
  all,
  create,
  update,
  remove,
  deleteSome,
};

export default BankController;
