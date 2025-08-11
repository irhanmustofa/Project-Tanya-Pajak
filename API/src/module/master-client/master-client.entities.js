import Validator from "../../database/database.validator.js";

export default class Client {
  constructor(input) {
    const {
      _id,
      company_name,
      company_npwp,
      kegiatan_utama,
      jenis_wp,
      bentuk_badan_hukum,
      status_npwp,
      status_pkp,
      tanggal_pengukuhan_pkp,
      kantor_wilayah_djp,
      kantor_pelayanan_pajak,
      seksi_pengawasan,
      kode_klu,
      deskripsi_klu,
      alamat,
      kontak,
    } = input;

    const data = {
      _id,
      company_name,
      company_npwp,
      kegiatan_utama,
      jenis_wp,
      bentuk_badan_hukum,
      status_npwp,
      status_pkp,
      tanggal_pengukuhan_pkp,
      kantor_wilayah_djp,
      kantor_pelayanan_pajak,
      seksi_pengawasan,
      kode_klu,
      deskripsi_klu,
      alamat,
      kontak,
    };

    const baseRules = {
      _id: "required|string",
      company_name: "required|string|min:3|max:100",
      company_npwp: "required|string",
      kegiatan_utama: "string",
      jenis_wp: "number",
      bentuk_badan_hukum: "number",
      status_npwp: "number",
      status_pkp: "number",
      tanggal_pengukuhan_pkp: "string",
      kantor_wilayah_djp: "string",
      kantor_pelayanan_pajak: "number",
      seksi_pengawasan: "number",
      kode_klu: "string",
      deskripsi_klu: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.company_name = company_name;
    this.company_npwp = company_npwp;
    this.kegiatan_utama = kegiatan_utama;
    this.jenis_wp = jenis_wp;
    this.bentuk_badan_hukum = bentuk_badan_hukum;
    this.status_npwp = status_npwp;
    this.status_pkp = status_pkp;
    this.tanggal_pengukuhan_pkp = tanggal_pengukuhan_pkp;
    this.kantor_wilayah_djp = kantor_wilayah_djp;
    this.kantor_pelayanan_pajak = kantor_pelayanan_pajak;
    this.seksi_pengawasan = seksi_pengawasan;
    this.kode_klu = kode_klu;

    this.alamat = alamat || [];
    this.kontak = kontak || [];

    if (result.error.length > 0) this.errors = result.error;
  }
}
