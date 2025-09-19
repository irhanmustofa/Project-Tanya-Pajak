import Validator from "../../database/database.validator.js";

export default class Keluarga {
  constructor(input) {
    const {
      _id,
      nik,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      nomor_kk,
      nama,
      status_keluarga,
      pekerjaan,
      status_unit_pajak,
      status_ptkp,
      tanggal_mulai,
      tanggal_berakhir,
    } = input;

    const data = {
      _id,
      nik,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      nomor_kk,
      nama,
      status_keluarga,
      pekerjaan,
      status_unit_pajak,
      status_ptkp,
      tanggal_mulai,
      tanggal_berakhir,
    };

    const baseRules = {
      _id: "required|string|min:7",
      nik: "string",
      jenis_kelamin: "string",
      tempat_lahir: "string",
      tanggal_lahir: "string",
      nomor_kk: "string",
      nama: "string",
      status_keluarga: "string",
      pekerjaan: "string",
      status_unit_pajak: "string",
      status_ptkp: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.nik = nik;
    this.jenis_kelamin = jenis_kelamin;
    this.tempat_lahir = tempat_lahir;
    this.tanggal_lahir = tanggal_lahir;
    this.nomor_kk = nomor_kk;
    this.nama = nama;
    this.status_keluarga = status_keluarga;
    this.pekerjaan = pekerjaan;
    this.status_unit_pajak = status_unit_pajak;
    this.status_ptkp = status_ptkp;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;

    if (result.error.length > 0) this.errors = result.error;
  }
}
