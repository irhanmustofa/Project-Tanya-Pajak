import Response, { badRequest, notFound, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import Group from "./master-group.entities.js";
import { masterGroupSchema } from "./master-group.schema.js";

const wrapper = new MongodbWrapper(masterGroupSchema());

const all = async (req, res) => {
  return Response(res, await wrapper.all());
};

const getById = async (req, res) => {
  return Response(res, await wrapper.getByFilter({ _id: req.params.id }));
};

const create = async (req, res) => {
  const group = new Group(req.body);
  if (group.errors) {
    return Response(res, badRequest({ message: group.errors.join(", ") }));
  }

  return Response(res, await wrapper.create(group));
};

const update = async (req, res) => {
  const getData = await wrapper.getByFilter({ _id: req.params.id });
  if (getData.length === 0) {
    return Response(res, notFound({ message: "Group not found" }));
  }

  const data = getData.data[0];

  const newData = {
    name: req.body.name || data.name,
    status: req.body.status || data.status,
  };

  const group = new Group(newData);
  if (group.errors) {
    return Response(res, badRequest({ message: group.errors.join(", ") }));
  }

  return Response(res, await wrapper.update(req.params.id, group));
};

const remove = async (req, res) => {
  return Response(res, await wrapper.delete(req.params.id));
};

const deleteSome = async (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids)) {
    return Response(
      res,
      badRequest({ message: "Invalid request body. Expected an array of IDs." })
    );
  }

  ids.forEach(async (id) => {
    const destroy = await wrapper.delete(id);
    if (!destroy.success) {
      return Response(res, notFound({ message: destroy.message }));
    }
  });

  return Response(res, success());
};

const groupController = {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome
};

export default groupController;
