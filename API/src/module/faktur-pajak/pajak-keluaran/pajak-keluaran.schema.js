import { mongoConfig } from "../../../database/mongo/mongo.config.js";
import { createConnection } from "../../../database/mongo/mongo.connection.js";

export const pajakKeluaranSchema = (client_id) => {
  const collection = mongoConfig.collection.pajak_keluaran;
  const schema = {
    tipe_transaksi: {
      type: Number,
      required: true,
    },
    nomor_faktur: {
      type: String,
      required: true,
      trim: true,
    },
    kode_transaksi: {
      type: String,
      required: true,
      trim: true,
    },
    tanggal_faktur: {
      type: Date,
      required: true,
    },
    jenis_faktur: {
      type: String,
      required: true,
    },
    referensi_faktur: {
      type: String,
      trim: true,
    },
    alamat: {
      type: String,
      required: true,
      trim: true,
    },
    idtku: {
      type: String,
      required: true,
      trim: true,
    },

    lawan_transaksi: {
      type: {
        nama: { type: String, required: true, trim: true },
        npwp: { type: String, required: false, trim: true },
        alamat: { type: String, required: false, trim: true },
        idtku: { type: String, required: false, trim: true },
        email: { type: String, required: false, trim: true },
      },
    },

    items: [{
      tipe: { type: String, required: true, trim: true },
      nama: { type: String, required: true, trim: true },
      kode: { type: String, required: false, trim: true },
      qty: { type: Number, required: true, min: 0 },
      satuan: { type: String, required: false, trim: true },
      harga_satuan: { type: Number, required: true, min: 0 },
      total_harga: { type: Number, required: true, min: 0 },
      diskon: { type: Number, required: false, default: 0, min: 0 },
      tarif_ppn: { type: Number, required: true, min: 0 },
      dpp: { type: Number, required: true, min: 0 },
      ppn: { type: Number, required: true, min: 0 },
      dpp_nilai_lain: { type: Number, required: false, default: 0, min: 0 },
      tarif_ppnbm: { type: Number, required: false, default: 0, min: 0 },
      ppnbm: { type: Number, required: false, default: 0, min: 0 }
    }],

    status: {
      type: Number,
      required: true,
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
