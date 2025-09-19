import Validator from "../../database/database.validator.js";

export default class NomorEksternal {
  constructor(input) {
    const { _id, tipe, nomor_identifikasi, tanggal_mulai, tanggal_berakhir } =
      input;

    const data = {
      _id,
      tipe,
      nomor_identifikasi,
      tanggal_mulai,
      tanggal_berakhir,
    };

    const baseRules = {
      _id: "required|string|min:7",
      tipe: "string",
      nomor_identifikasi: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.tipe = tipe;
    this.nomor_identifikasi = nomor_identifikasi;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;

    if (result.error.length > 0) this.errors = result.error;
  }
}
