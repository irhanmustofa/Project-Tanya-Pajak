import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterClientSchema = () => {
  const collection = mongoConfig.collection.master_client;
  const schema = {
    _id: { required: true, type: String },
    company_npwp: { type: String, unique: true },
    jenis_wp: { type: Number, default: 1 },
    company_name: { type: String, required: true },
    bentuk_badan_hukum: { type: Number },
    negara_asal: { type: String },
    kegiatan_utama: { type: String },
    kewarganegaraan: { type: String },
    bahasa: { type: String },

    status_npwp: { type: Number, default: 1 },
    tanggal_daftar: { type: Date, default: new Date(Date.now()) },
    tanggal_aktivasi: { type: Date, default: new Date(Date.now()) },
    status_pkp: { type: Number },
    tanggal_pengukuhan_pkp: { type: Date },
    kantor_wilayah_djp: { type: String },
    kantor_pelayanan_pajak: { type: Number },
    seksi_pengawasan: { type: Number },

    nomor_keputusan_pengesahan: { type: String },
    tanggal_keputusan_pengesahan: { type: Date },
    nomor_keputusan_pengesahan_perubahan: { type: String },
    tanggal_keputusan_pengesahan_perubahan: { type: Date },
    nomor_akta_pendirian: { type: String },
    tempat_pendirian: { type: String },
    tanggal_pendirian: { type: Date },
    nik_notaris: { type: String },
    nama_notaris: { type: String },
    jenis_perusahaan: { type: String },
    modal_dasar: { type: Number },
    modal_ditempatkan: { type: Number },
    modal_disetor: { type: Number },

    nomor_paspor: { type: String },
    tempat_lahir: { type: String },
    tanggal_lahir: { type: Date },
    jenis_kelamin: { type: Boolean },
    status_perkawinan: { type: String },
    status_hubungan_keluarga: { type: String },
    nama_kepala: { type: String },
    nik_kepala: { type: String },
    agama: { type: String },
    pekerjaan: { type: String },
    nama_ibu_kandung: { type: String },
    nomor_kartu_keluarga: { type: String },

    alamat: {
      _id: { type: String },
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
      identitas_pemilik: { type: String },
      nama_pemilik: { type: String },
      tanggal_mulai_sewa: { type: Date },
      tanggal_sewa_berakhir: { type: Date },
      tanggal_mulai: { type: Date },
      tanggal_berakhir: { type: Date },
      kode_kpp: { type: Number },
      bagian_pengawasan: { type: Number },

      identitas_pic: { type: String },
      nama_pic: { type: String },
      kewarganegaraan_pic: { type: String },
      nama_nitku: { type: String },
      jenis_nitku: { type: String },
      kode_klu: { type: String },
    },

    kontak: {
      phone: { type: String },
      email: { type: String },
    },
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
