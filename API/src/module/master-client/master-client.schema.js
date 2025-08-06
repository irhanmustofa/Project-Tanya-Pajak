import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterClientSchema = () => {
  const collection = mongoConfig.collection.master_client;
  const schema = {
    group_id: {
      type: String,
      required: true
    },
    company_name: {
      type: String,
      required: true
    },
    address_company: {
      type: String,
      required: true
    },
    no_npwp: {
      type: String,
      required: true
    },
    no_pkp: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      default: ""
    },
    director_name: {
      type: String,
      required: true
    },
    no_ktp_director: {
      type: String,
      required: true
    },
    address_director: {
      type: String,
      required: true
    },
    rups_akhir_tahun: {
      type: String
    },
    legalitas_perusahaan: [
      {
        jenis_akta: { type: String },
        nomor_akta: { type: String },
        tanggal: { type: String },
        nomor_sk: { type: String },
        nomor_nib: { type: String },
        nomor_kbli: { type: String },
        alamat_perusahaan: { type: String },
        total_saham: { type: Number },
        harga_saham: { type: Number },
        jumlah_saham: { type: Number },
        link_akta: { type: String },
        link_sk: { type: String },
        link_nib: { type: String },
        pemegang_saham: [
          {
            nama: { type: String },
            no_ktp: { type: String },
            npwp: { type: String },
            address: { type: String },
            tempat_lahir: { type: String },
            tanggal_lahir: { type: String },
            jabatan: { type: String },
            jumlah_saham: { type: Number },
            persentase: { type: Number }
          }
        ]
      }
    ],
    status: {
      type: Number,
      default: 1
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    deletedAt: {
      type: Date,
      default: null
    }
  };

  return createConnection({
    collection,
    schema,
  });
};
