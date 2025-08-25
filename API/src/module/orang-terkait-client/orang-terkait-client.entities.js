import Validator from "../../database/database.validator";

export default class OrangTerkait {
  constructor(input) {
    const {
      _id,
      jenis_pihak,
      pic,
      jenis_orang_terkait,
      sub_jenis_orang_terkait,
      identitas,
      name,
      nomor_paspor,
      kewarganegaraan,
      negara_asal,
      email,
      nomor_telepon,
      tanggal_mulai,
      tanggal_berakhir,
      jenis_wp,
      keterangan,
    } = input;

    const data = {
      _id,
      jenis_pihak,
      pic,
      jenis_orang_terkait,
      sub_jenis_orang_terkait,
      identitas,
      name,
      nomor_paspor,
      kewarganegaraan,
      negara_asal,
      email,
      nomor_telepon,
      tanggal_mulai,
      tanggal_berakhir,
      jenis_wp,
      keterangan,
    };

    const baseRules = {
      _id: "required|string",
      jenis_pihak: "string",
      pic: "string",
      jenis_orang_terkait: "string",
      sub_jenis_orang_terkait: "string",
      identitas: "string",
      name: "string",
      nomor_paspor: "string",
      kewarganegaraan: "string",
      negara_asal: "string",
      email: "string",
      nomor_telepon: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
      jenis_wp: "string",
      keterangan: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.jenis_pihak = jenis_pihak;
    this.pic = pic;
    this.jenis_orang_terkait = jenis_orang_terkait;
    this.sub_jenis_orang_terkait = sub_jenis_orang_terkait;
    this.identitas = identitas;
    this.name = name;
    this.nomor_paspor = nomor_paspor;
    this.kewarganegaraan = kewarganegaraan;
    this.negara_asal = negara_asal;
    this.email = email;
    this.nomor_telepon = nomor_telepon;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;
    this.jenis_wp = jenis_wp;
    this.keterangan = keterangan;

    if (result.error.length > 0) this.errors = result.error;
  }
}
