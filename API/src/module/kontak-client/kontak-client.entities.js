import Validator from "../../database/database.validator.js";

export default class KontakClient {
  constructor(input) {
    const {
      _id,
      jenis_kontak,
      nomor_telepon,
      nomor_handphone,
      nomor_faksimile,
      email,
      website,
      keterangan,
      tanggal_mulai,
      tanggal_berakhir,
    } = input;

    const data = {
      _id,
      jenis_kontak,
      nomor_telepon,
      nomor_handphone,
      nomor_faksimile,
      email,
      website,
      keterangan,
      tanggal_mulai,
      tanggal_berakhir,
    };

    const baseRules = {
      _id: "required|string",
      jenis_kontak: "string",
      nomor_telepon: "string",
      nomor_handphone: "string",
      nomor_faksimile: "string",
      email: "string",
      website: "string",
      keterangan: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.jenis_kontak = jenis_kontak;
    this.nomor_telepon = String(nomor_telepon);
    this.nomor_handphone = String(nomor_handphone);
    this.nomor_faksimile = String(nomor_faksimile);
    this.email = email;
    this.website = website;
    this.keterangan = keterangan;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;

    if (result.error.length > 0) this.errors = result.error;
  }
}
