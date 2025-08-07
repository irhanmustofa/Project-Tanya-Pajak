import { createConnection } from "../../database/mongo/mongo.connection.js";

const schema = {
  _id: {
    type: String,
    require: true,
  },
  buku: {
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
  refference: {
    type: String,
  },
  currency: {
    type: String,
  },
  kurs: {
    type: Number,
  },
  valas: {
    type: Number,
  },
  kode_barang: {
    type: String,
  },
  nama_barang: {
    type: String,
  },
  jumlah: {
    type: Number,
  },
  satuan: {
    type: String,
  },
  harga: {
    type: Number,
  },
  amount_1: {
    type: Number,
    require: true,
  },
  akun_credit_1: {
    type: String,
    require: true,
  },
  akun_debet_1: {
    type: String,
    require: true,
  },
  amount_2: {
    type: Number,
  },
  akun_credit_2: {
    type: String,
  },
  akun_debet_2: {
    type: String,
  },
  amount_3: {
    type: Number,
  },
  akun_credit_3: {
    type: String,
  },
  akun_debet_3: {
    type: String,
  },
  amount_4: {
    type: Number,
  },
  akun_credit_4: {
    type: String,
  },
  akun_debet_4: {
    type: String,
  },
};

export default function BukuSchema(client_id, collection) {
  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
}
