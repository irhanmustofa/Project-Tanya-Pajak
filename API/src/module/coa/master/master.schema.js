import { mongoConfig } from "../../../database/mongo/mongo.config.js";
import { createConnection } from "../../../database/mongo/mongo.connection.js";

export const masterCoaSchema = (client_id) => {
  const collection = mongoConfig.collection.master_coa;
  const schema = {
    nama_akun: {
      type: String,
      require: true,
    },
    kode_akun: {
      type: String,
      require: true,
    },
    kode_head: {
      type: String,
      require: true,
    },
    kode_group: {
      type: String,
      require: true,
    },
    jenis_asset: {
      type: String,
      require: true,
    },
    klasifikasi_pajak: {
      type: String,
    },
    pph: {
      type: String,
    },
    laba_kotor: {
      type: String,
    },
    ebt: {
      type: String,
    },
    arus_bank: {
      type: String,
    },
    cf: {
      type: String,
    },
  };
  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
