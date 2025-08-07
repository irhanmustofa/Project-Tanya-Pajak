import { badRequest } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import MongodbORM from "../../database/mongo/mongodb.orm.js";
import Asset from "./asset.entities.js";
import { AssetSchema } from "./asset.schema.js";

export default class AssetService {
  constructor(client_id) {
    this.client_id = client_id;
    this.model = new MongodbWrapper(AssetSchema(client_id));
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
    const model = JurnalSchema(this.client_id);
    const db = MongodbORM.collection(model);
    db.where("masa", ">=", masaAwal);
    db.where("masa", "<=", masaAkhir);
    return await db.get();
  }

  async create(data) {
    const buku = new Asset(data);
    if (buku.errors) {
      return badRequest({ message: buku.errors.join(", ") });
    }
    return await this.model.create(buku);
  }

  async update(id, data) {
    const buku = data;
    if (buku.errors) {
      return badRequest({ message: buku.errors.join(", ") });
    }
    return await this.model.update(id, buku);
  }

  async delete(id) {
    return await this.model.delete(id);
  }
}
