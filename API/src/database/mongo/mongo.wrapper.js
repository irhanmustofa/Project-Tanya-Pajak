import MongodbORM from "./mongodb.orm.js";

export default class MongodbWrapper {
  constructor(model) {
    this.model = model;
  }

  async all() {
    return await MongodbORM.collection(this.model).get();
  }

  async allOrder(field, order) {
    return await MongodbORM.collection(this.model).orderBy(field, order).get();
  }

  async getByFilter(filter, column = []) {
    const orm = MongodbORM.collection(this.model);
    Object.entries(filter).forEach(([key, value]) => {
      orm.where(key, "=", value);
    });
    orm.select(column);
    return await orm.get();
  }

  async is_exist(filter) {
    const orm = MongodbORM.collection(this.model);
    Object.entries(filter).forEach(([key, value]) => {
      orm.where(key, "=", value);
    });
    return await orm.first();
  }

  async create(data) {
    return await MongodbORM.collection(this.model).create(data);
  }

  async bulkCreate(data) {
    return await MongodbORM.collection(this.model).bulkCreate(data);
  }

  async update(id, data) {
    const isExist = await this.is_exist({ _id: id });
    if (!isExist) {
      throw new Error(`Record with ID ${id} does not exist.`);
    }

    return await MongodbORM.collection(this.model)
      .where("_id", "=", id)
      .update(data);
  }

  async delete(id) {
    const isExist = await this.is_exist({ _id: id });

    if (!isExist) {
      throw new Error(`Record with ID ${id} does not exist.`);
    }
    return await MongodbORM.collection(this.model)
      .where("_id", "=", id)
      .delete();
  }

  async deleteSome(ids) {
    ids.forEach((id) => {
      const isExist = this.is_exist({ _id: id });
      if (!isExist) {
        throw new Error(`Record with ID ${id} does not exist.`);
      }
    });

    return await MongodbORM.collection(this.model)
      .where("_id", "in", ids)
      .delete();
  }

  async hardDelete(id) {
    const isExist = await this.is_exist({ _id: id });

    if (!isExist) {
      throw new Error(`Record with ID ${id} does not exist.`);
    }

    return await MongodbORM.collection(this.model)
      .where("_id", "=", id)
      .hardDelete();
  }

  async hardDeleteSome(ids) {
    ids.forEach((id) => {
      const isExist = this.is_exist({ _id: id });
      if (!isExist) {
        throw new Error(`Record with ID ${id} does not exist.`);
      }
    });

    return await MongodbORM.collection(this.model)
      .where("_id", "in", ids)
      .hardDelete();
  }

  async hardDelete() {
    return await MongodbORM.collection(this.model).hardDelete();
  }
}
