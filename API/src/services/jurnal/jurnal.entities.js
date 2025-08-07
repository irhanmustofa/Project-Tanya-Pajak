import Validator from "../../database/database.validator.js";
import { parseTanggal } from "../../utils/functions.js";

export default class Jurnal {
  constructor(payload) {
    const rules = {
      buku: "required|string",
      buku_id: "required|string",
      voucher: "required|string",
      tanggal: "required|string",
      tahun: "required|number",
      masa: "required|number",
      vendor: "required|string",
      keterangan: "required|string",
      akun_credit: "required|string",
      akun_debet: "required|string",
      debet: "required|number",
      credit: "required|number",
    };

    Object.entries(payload).forEach(([key, value]) => {
      this[key] = key === "tanggal" ? parseTanggal(value) : value;
    });

    const validator = new Validator(payload, rules);
    const result = validator.getResult();

    if (result.error.length > 0) this.errors = result.error;
  }
}
