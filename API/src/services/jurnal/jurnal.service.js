import { badRequest } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import MongodbORM from "../../database/mongo/mongodb.orm.js";
import Jurnal from "./jurnal.entities.js";
import JurnalSchema from "./jurnal.schema.js";

export default class JurnalService {
  constructor(client_id, collection) {
    this.client_id = client_id;
    this.collection = collection;
    this.model = new MongodbWrapper(JurnalSchema(client_id, collection));
  }

  async all() {
    return await this.model.all();
  }

  async getByFilter(filter) {
    return await this.model.getByFilter(filter);
  }

  async getByBukuId(buku_id) {
    return await this.getByFilter({ buku_id });
  }

  async getByVoucher(voucher) {
    return await this.getByFilter({ voucher });
  }

  async getByBuku(buku) {
    return await this.getByFilter({ buku });
  }

  async getByMasa(masaAwal, masaAkhir, buku = null) {
    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);

    db.where("masa", ">=", masaAwal);
    db.where("masa", "<=", masaAkhir);

    if (buku) db.where("buku", buku);

    return await db.get();
  }

  async create(jurnal) {
    const entry = new Jurnal(jurnal);
    if (entry.errors) {
      return badRequest({ message: entry.errors.join(", ") });
    }

    return await this.model.create(entry);
  }

  async bulkCreate(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return badRequest({ message: "Expected an array of data." });
    }

    const entries = [];
    for (const item of data) {
      const entry = new Jurnal(item);
      if (entry.errors) {
        return badRequest({ message: entry.errors.join(", ") });
      }
      entries.push(entry);
    }

    return await this.model.bulkCreate(entries);
  }

  async update(buku_id, jurnal) {
    const entries = [];
    for (const item of jurnal) {
      const entry = new Jurnal(item);
      if (entry.errors) {
        return badRequest({ message: entry.errors.join(", ") });
      }
      entries.push(entry);
    }

    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("buku_id", buku_id);

    const deleteResult = await db.hardDelete();
    if (!deleteResult.success) {
      return badRequest({ message: deleteResult.error });
    }

    return await this.model.bulkCreate(entries);
  }

  async delete(buku_id) {
    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("buku_id", buku_id);

    return await db.delete();
  }

  async deleteSome(buku_ids) {
    if (!Array.isArray(buku_ids) || buku_ids.length === 0) {
      return badRequest({ message: "Expected an array of buku_ids." });
    }

    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("buku_id", "in", buku_ids);

    return await db.delete();
  }

  async hardDelete(buku_id) {
    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("buku_id", buku_id);
    return await db.hardDelete();
  }

  async hardDeleteSome(buku_ids) {
    if (!Array.isArray(buku_ids) || buku_ids.length === 0) {
      return badRequest({ message: "Expected an array of buku_ids." });
    }

    const model = JurnalSchema(this.client_id, this.collection);
    const db = MongodbORM.collection(model);
    db.where("buku_id", "in", buku_ids);
    return await db.hardDelete();
  }
}
