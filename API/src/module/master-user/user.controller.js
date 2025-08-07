import Response, { badRequest } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import User from "./user.entities.js";
import { userSchema } from "./user.schema.js";

const wrapper = new MongodbWrapper(userSchema());

const getAll = async (req, res) => {
  return Response(res, await wrapper.all());
};

const create = async (req, res) => {
  const user = new User(req.body);
  if (user.errors && user.errors.length > 0) {
    return Response(res, badRequest({ message: user.errors.join(", ") }));
  }
  return Response(res, await wrapper.create(user));
};

const update = async (req, res) => {
  const user = new User(req.body);
  if (user.errors && user.errors.length > 0) {
    return Response(res, badRequest({ message: user.errors.join(", ") }));
  }
  return Response(res, await wrapper.update(req.params.id, user));
};

const remove = async (req, res) => {
  return Response(res, await wrapper.delete(req.params.id));
};

const deleteSome = async (req, res) => {
  const toDelete = req.body.map((id) => ({ _id: id }));

  if (!toDelete || !Array.isArray(toDelete)) {
    return Response(
      res,
      badRequest({ message: "Invalid request body. Expected an array of IDs." })
    );
  }

  if (toDelete.length === 0) {
    return Response(
      res,
      badRequest({ message: "No IDs provided in the request body." })
    );
  }

  for (const id of toDelete) {
    const result = await wrapper.delete(id._id);

    if (!result.success) {
      return Response(res, badRequest({ message: result.message }));
    }
  }

  return Response(res, success());
};

const userController = {
  getAll,
  create,
  update,
  remove,
  deleteSome,
};

export default userController;
