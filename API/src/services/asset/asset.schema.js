import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

const collection = mongoConfig.collection.master_asset;
const schema = {
  buku: { type: String, required: true },
  jenis_asset: { type: String, required: true },
  kategori_asset: { type: String, required: true },
  golongan_asset: { type: String, required: true },
  jenis_harta: { type: String, required: true },
  nomor_fa: { type: String, required: true },
  nama_aktiva_tetap: { type: String, required: true },
  qty: { type: Number, required: true },
  satuan: { type: String, required: true },
  kode_akun: { type: String, required: true },
  periode_manfaat_k: { type: Number, required: true },
  periode_manfaat_f: { type: Number, required: true },
  tanggal_perolehan: { type: Date, required: true },
  harga_perolehan: { type: Number, required: true },
  metode_penyusutan: { type: String, required: true },
  tanggal_penjualan_aktiva_tetap: { type: Date, required: false },
  tanggal_penyusutan_sebelumnya: { type: Date, required: false },
  voucher_asset_terjual: { type: String, required: false },
  harga_jual_aktiva_tetap: { type: Number, required: false },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
};

export const AssetSchema = (client_id) => {
  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
