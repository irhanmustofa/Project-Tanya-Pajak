import { badRequest } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import MongodbORM from "../../database/mongo/mongodb.orm.js";
import Buku from "./buku.entities.js";
import BukuSchema from "./buku.schema.js";

export default class BukuService {
  constructor(client_id, collection) {
    this.client_id = client_id;
    this.collection = collection;
    this.model = new MongodbWrapper(BukuSchema(client_id, collection));
  }

  async all() {
    return await this.model.all();
  }

  async getByFilter(filter) {
    return await this.model.getByFilter(filter);
  }

  async getById(id) {
    return await this.model.getByFilter({ _id: id });
  }

  async getByVoucher(voucher) {
    return await this.model.getByFilter({ voucher: voucher });
  }

  async getByMasa(masaAwal, masaAkhir) {
    const model = BukuSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("masa", ">=", masaAwal);
    db.where("masa", "<=", masaAkhir);
    return await db.get();
  }

  async create(data) {
    const buku = new Buku(data);

    if (buku.errors) {
      return badRequest({ message: buku.errors.join(", ") });
    }

    return await this.model.create(buku);
  }

  async bulkCreate(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return badRequest({ message: "Expected an array of data." });
    }
    const entries = [];
    for (const item of data) {
      const buku = new Buku(item);
      if (buku.errors) {
        return badRequest({ message: buku.errors.join(", ") });
      }
      entries.push(buku);
    }

    return await this.model.bulkCreate(entries);
  }

  async update(id, data) {
    const buku = new Buku(data);

    if (buku.errors) {
      return badRequest({ message: buku.errors.join(", ") });
    }

    return await this.model.update(id, buku);
  }

  async delete(id) {
    return await this.model.delete(id);
  }

  async deleteSome(ids) {
    return await this.model.deleteSome(ids);
  }

  async hardDelete(id) {
    return await this.model.hardDelete(id);
  }

  async hardDeleteSome(ids) {
    return await this.model.hardDeleteSome(ids);
  }
}
