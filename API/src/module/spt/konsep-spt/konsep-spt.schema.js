import { mongoConfig } from "../../../database/mongo/mongo.config.js";
import { createConnection } from "../../../database/mongo/mongo.connection.js";

export const konsepSptSchema = (client_id) => {
  const collection = mongoConfig.collection.konsep_spt;
  const schema = {
    jenis_pajak: {
      type: String,
      required: true,
      trim: true,
    },
    jenis_surat_pemberitahuan: {
      type: String,
      required: true,
      trim: true,
    },
    masa_pajak: {
      type: String,
      required: true,
      trim: true,
    },
    nop: {
      type: String,
      required: false,
      trim: true,
    },
    nama_object_pajak: {
      type: String,
      required: false,
      trim: true,
    },
    model_spt: {
      type: Number,
      required: false,
      default: 0,
    },
    tanggal_jatuh_tempo: {
      type: Date,
      default: Date.now,
    },
    tanggal_dibuat: {
      type: Date,
      default: Date.now,
    },
    status_spt: {
      type: Number,
      required: false,
      default: 0,
    },
    submission_progress: {
      type: String,
      required: false,
      default: 0,
    },
  };



  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
