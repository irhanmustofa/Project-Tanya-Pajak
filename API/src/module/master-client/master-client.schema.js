import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterClientSchema = () => {
  const collection = mongoConfig.collection.master_client;
  const schema = {
    _id: { required: true, type: String },
    company_name: { type: String, required: true },
    company_npwp: { type: String, unique: true },
    kegiatan_utama: { type: String },
    jenis_wp: { type: Number, default: 1 },
    bentuk_badan_hukum: { type: Number },
    status_npwp: { type: Number, default: 1 },
    tanggal_daftar: { type: Date, default: new Date(Date.now()) },
    tanggal_aktivasi: { type: Date, default: new Date(Date.now()) },
    status_pkp: { type: Number },
    tanggal_pengukuhan_pkp: { type: Date },
    kantor_wilayah_djp: { type: String },
    kantor_pelayanan_pajak: { type: Number },
    seksi_pengawasan: { type: Number },
    alamat: [
      {
        negara: { type: String },
        jenis_alamat: { type: Number },
        alamat: { type: String },
        rt: { type: String },
        rw: { type: String },
        provinsi: { type: Number },
        kabupaten: { type: Number },
        kecamatan: { type: Number },
        desa: { type: Number },
        kode_area: { type: Number },
        kode_pos: { type: Number },
        data_geometrik: { type: String },
        disewa: { type: Number },
        tanggal_mulai: { type: Date },
        tanggal_berakhir: { type: Date },
        kode_kpp: { type: Number },
        bagian_pengawasan: { type: Number },
      },
    ],
    kontak: [
      {
        phone: { type: String },
        email: { type: String },
      },
    ],
    kode_klu: { type: String },
    status: { required: true, type: Number, default: 1 },
  };

  const options = {
    _id: false,
    timestamps: true,
  };

  return createConnection({
    collection,
    schema,
    options,
  });
};
