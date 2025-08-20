import Validator from "../../database/database.validator.js";

export default class EkonomiClient {
  constructor(input) {
    const {
      merek,
      jumlah_karyawan,
      metode_pembukuan,
      mata_uang_pembukuan,
      periode_pembukuan,
      omset_pertahun,
      bruto,
    } = input;

    const data = {
      merek,
      jumlah_karyawan,
      metode_pembukuan,
      mata_uang_pembukuan,
      periode_pembukuan,
      omset_pertahun,
      bruto,
    };

    const baseRules = {
      merek: "string",
      jumlah_karyawan: "string",
      metode_pembukuan: "string",
      mata_uang_pembukuan: "string",
      periode_pembukuan: "string",
      omset_pertahun: "string",
      bruto: "number",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this.merek = merek;
    this.jumlah_karyawan = jumlah_karyawan;
    this.metode_pembukuan = metode_pembukuan;
    this.mata_uang_pembukuan = mata_uang_pembukuan;
    this.periode_pembukuan = periode_pembukuan;
    this.omset_pertahun = omset_pertahun;
    this.bruto = Number(bruto);

    if (result.error.length > 0) this.errors = result.error;
  }
}
