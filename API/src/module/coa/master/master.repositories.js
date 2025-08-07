import MongodbORM from "../../../database/mongo/mongodb.orm.js";
import { uuid } from "../../../utils/functions.js";
import masterCoaModel from "./master.model.js";

const masterCoaRepositories = {
  getAllCoa: async (clientId) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel).all();
  },

  getCustom: async (clientId, params) => {
    const myModel = masterCoaModel(clientId);
    const orm = MongodbORM.collection(myModel);
    return await orm.getCustom(params);
  },

  getCoaById: async (clientId, id) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel).where("_id", "=", id).first();
  },

  getCoaByCoaId: async (clientId, id = {}) => {
    const myModel = masterCoaModel(clientId);
    const orm = MongodbORM.collection(myModel);
    Object.entries(id).forEach(([key, value]) => {
      orm.where(key, "=", value);
    });
    return await orm.get();
  },

  coaId: async () => {
    return uuid();
  },

  createCoa: async (clientId, coa) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel).create(coa);
  },

  importCoa: async (clientId, coa) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel).bulkCreate(coa);
  },

  updateCoa: async (clientId, id, coa) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel)
      .where("_id", "=", id)
      .update(coa);
  },

  deleteCoa: async (clientId, id) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);
    return await MongodbORM.collection(myModel).where("_id", "=", id).delete();
  },

  deleteSomeCoa: async (clientId, ids) => {
    const myModel = masterCoaModel(clientId);
    MongodbORM.collection(myModel);

    return await MongodbORM.collection(myModel)
      .where("_id", "in", ids)
      .delete();
  },
};

export default masterCoaRepositories;
