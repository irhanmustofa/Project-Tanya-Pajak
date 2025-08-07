import Validator from "../../database/database.validator.js";
import { parseTanggal } from "../../utils/functions.js";

export default class Buku {
  constructor(payload) {
    const rules = {
      _id: "required|string",
      buku: "required|string",
      voucher: "required|string",
      tanggal: "required|string",
      tahun: "required|number",
      masa: "required|number",
      vendor: "required|string",
      keterangan: "required|string",
      refference: "string",
      currency: "string",
      kurs: "number",
      kode_barang: "string",
      nama_barang: "string",
      jumlah: "number",
      satuan: "string",
      harga: "number",
      amount_1: "number",
      akun_credit_1: "string",
      akun_debet_1: "string",
      amount_2: "number",
      akun_credit_2: "string",
      akun_debet_2: "string",
      amount_3: "number",
      akun_credit_3: "string",
      akun_debet_3: "string",
      amount_4: "number",
      akun_credit_4: "string",
      akun_debet_4: "string",
    };

    const validator = new Validator(payload, rules);
    const result = validator.getResult();

    Object.entries(payload).forEach(([key, value]) => {
      this[key] = key === "tanggal" ? parseTanggal(value) : value;
    });

    if (result.error.length > 0) this.errors = result.error;
  }
}
