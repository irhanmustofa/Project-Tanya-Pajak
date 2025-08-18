import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const fakturPajakSchema = (client_id) => {
  const collection = mongoConfig.collection.faktur_pajak;
  const schema = {
    jenis_faktur: {
      type: Number,
      required: true,
    },
    nomor_faktur: {
      type: String,
      required: true,
      trim: true,
    },
    tanggal_faktur: {
      type: Date,
      required: true,
    },
    referensi_faktur: {
      type: String,
      trim: true,
    },

    lawan_transaksi: {
      type: {
        nama: { type: String, required: true, trim: true },
        npwp: { type: String, required: false, trim: true },
        alamat: { type: String, required: false, trim: true }
      },
    },

    items: [{
      nama: { type: String, required: true, trim: true },
      kode_barang: { type: String, required: false, trim: true },
      jumlah: { type: Number, required: true, min: 0 },
      satuan: { type: String, required: false, trim: true },
      harga: { type: Number, required: true, min: 0 },
      diskon: { type: Number, required: false, default: 0, min: 0 },
      dpp: { type: Number, required: true, min: 0 },
      ppn: { type: Number, required: true, min: 0 },
      ppnbm: { type: Number, required: false, default: 0, min: 0 }
    }],

    total_dpp: { type: Number, required: true, default: 0 },
    total_ppn: { type: Number, required: true, default: 0 },
    total_ppnbm: { type: Number, required: false, default: 0 },

    status: {
      type: Number,
      required: true,
      default: 0, // 0: draft, 1: submitted, 2: approved, 3: rejected
    },
  };



  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
