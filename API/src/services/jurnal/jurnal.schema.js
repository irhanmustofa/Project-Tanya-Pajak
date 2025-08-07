import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

const collection = mongoConfig.collection.jurnal;
const schema = {
  buku: {
    type: String,
    require: true,
  },
  buku_id: {
    type: String,
    require: true,
  },
  voucher: {
    type: String,
    require: true,
  },
  tanggal: {
    type: Date,
    require: true,
  },
  tahun: {
    type: Number,
    require: true,
  },
  masa: {
    type: Number,
    require: true,
  },
  vendor: {
    type: String,
    require: true,
  },
  keterangan: {
    type: String,
    require: true,
  },
  urut: {
    type: Number,
    require: true,
  },
  kode_akun: {
    type: String,
    require: true,
  },
  debet: {
    type: Number,
    require: true,
  },
  credit: {
    type: Number,
    require: true,
  },
};

export default function JurnalSchema(client_id) {
  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
}
