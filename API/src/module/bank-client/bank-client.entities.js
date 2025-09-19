import Validator from "../../database/database.validator.js";

export default class Bank {
  constructor(input) {
    const {
      _id,
      nama_bank,
      nomor_rekening,
      jenis_rekening,
      nama_pemilik_rekening,
      tanggal_mulai,
      tanggal_berakhir,
    } = input;

    const data = {
      _id,
      nama_bank,
      nomor_rekening,
      jenis_rekening,
      nama_pemilik_rekening,
      tanggal_mulai,
      tanggal_berakhir,
    };

    const baseRules = {
      _id: "required|string|min:7",
      nama_bank: "string",
      nomor_rekening: "string",
      jenis_rekening: "string",
      nama_pemilik_rekening: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.nama_bank = nama_bank;
    this.nomor_rekening = nomor_rekening;
    this.jenis_rekening = jenis_rekening;
    this.nama_pemilik_rekening = nama_pemilik_rekening;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;

    if (result.error.length > 0) this.errors = result.error;
  }
}
