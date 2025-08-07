import { adminconfig } from "../../config/config.js";
import MongodbORM from "../../database/mongo/mongodb.orm.js";
import { GenerateClientId } from "../../utils/functions.js";

export default class masterClientRepositories {
  constructor(model) {
    this.model = model;
  }

  async all() {

    return await MongodbORM.collection(this.model).all();
  }

  async getByFilter(filter) {
    const orm = MongodbORM.collection(this.model);
    Object.entries(filter).forEach(([key, value]) => {
      orm.where(key, "=", value);
    });
    return await orm.get();
  }

  async create(data) {
    const result = await MongodbORM.collection(this.model).create(data);
    let newId = null;

    if (result.success) {
      const lastData = await MongodbORM.collection(this.model)
        .orderBy("created_at", "asc")
        .first();
      newId = lastData.data[0]._id;
    }

    return {
      success: true,
      message: "Client created successfully",
      id: newId,
    };
  }

  async update(id, data) {
    return await MongodbORM.collection(this.model)
      .where("_id", "=", id)
      .update(data);
  }

  async delete(id) {
    return await MongodbORM.collection(this.model)
      .where("_id", "=", id)
      .delete();
  }

  async deleteSome(ids) {
    return await MongodbORM.collection(this.model)
      .where("_id", "in", ids)
      .delete();
  }
}
