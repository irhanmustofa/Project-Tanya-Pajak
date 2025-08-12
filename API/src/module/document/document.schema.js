import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const documentSchema = (client_id) => {
  const collection = mongoConfig.collection.documents;
  const schema = {
    nama_jenis_dokumen: { type: String, required: true },
    nomor_dokumen: { type: String },
    nik_npwp: { type: String },
    nama_wp: { type: String },
    paspor: { type: String },
    tanggal_dokumen: { type: Date },
    tanda_terima_dokumen: { type: Date },
    perihal_dokumen: { type: String },
    pengirim_dokumen: { type: String },
    keaslian_dokumen: { type: String },
    deskripsi_dokumen: { type: String },
    penerima: { type: String },
    catatan_komentar: { type: String },
    tag_dokumen: { type: String },
    klasifikasi: { type: String },
    bahasa: { type: String },
    jenis_pajak: { type: String },
    tahun_pajak: { type: Number },
    bulan_pajak: { type: Number },
    file: { type: String },
  };

  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
