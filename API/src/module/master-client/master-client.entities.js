import Validator from "../../database/database.validator.js";
import { currencyToNumber, dateStripFormat } from "../../utils/functions.js";

export default class Client {
  constructor(input) {
    const {
      _id,
      company_name,
      company_npwp,
      kegiatan_utama,
      jenis_wp,
      bentuk_badan_hukum,
      negara_asal,
      nomor_keputusan_pengesahan,
      tanggal_keputusan_pengesahan,
      nomor_keputusan_pengesahan_perubahan,
      tanggal_keputusan_pengesahan_perubahan,
      nomor_akta_pendirian,
      tempat_pendirian,
      tanggal_pendirian,
      nik_notaris,
      nama_notaris,
      jenis_perusahaan,
      modal_dasar,
      modal_ditempatkan,
      modal_disetor,
      kewarganegaraan,
      bahasa,
      status_npwp,
      status_pkp,
      tanggal_pengukuhan_pkp,
      kantor_wilayah_djp,
      kantor_pelayanan_pajak,
      seksi_pengawasan,
      kode_klu,
    } = input;

    const data = {
      _id,
      company_name,
      company_npwp,
      kegiatan_utama,
      jenis_wp,
      bentuk_badan_hukum,
      negara_asal,
      nomor_keputusan_pengesahan,
      tanggal_keputusan_pengesahan,
      nomor_keputusan_pengesahan_perubahan,
      tanggal_keputusan_pengesahan_perubahan,
      nomor_akta_pendirian,
      tempat_pendirian,
      tanggal_pendirian,
      nik_notaris,
      nama_notaris,
      jenis_perusahaan,
      modal_dasar,
      modal_ditempatkan,
      modal_disetor,
      kewarganegaraan,
      bahasa,
      status_npwp,
      status_pkp,
      tanggal_pengukuhan_pkp,
      kantor_wilayah_djp,
      kantor_pelayanan_pajak,
      seksi_pengawasan,
      kode_klu,
    };

    const baseRules = {
      _id: "required|string",
      company_name: "required|string|min:3|max:100",
      company_npwp: "required|string",
      kegiatan_utama: "string",
      jenis_wp: "number",
      bentuk_badan_hukum: "number",
      negara_asal: "string",
      nomor_keputusan_pengesahan: "string",
      tanggal_keputusan_pengesahan: "string",
      nomor_keputusan_pengesahan_perubahan: "string",
      tanggal_keputusan_pengesahan_perubahan: "string",
      nomor_akta_pendirian: "string",
      tempat_pendirian: "string",
      tanggal_pendirian: "string",
      nik_notaris: "string",
      nama_notaris: "string",
      jenis_perusahaan: "string",
      modal_dasar: "number",
      modal_ditempatkan: "number",
      modal_disetor: "number",
      kewarganegaraan: "string",
      bahasa: "string",

      tanggal_pengukuhan_pkp: "string",
      status_npwp: "number",
      status_pkp: "number",
      kantor_wilayah_djp: "string",
      kantor_pelayanan_pajak: "number",
      seksi_pengawasan: "number",
      kode_klu: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.company_name = company_name;
    this.company_npwp = company_npwp;
    this.kegiatan_utama = kegiatan_utama;
    this.jenis_wp = jenis_wp;
    this.bentuk_badan_hukum = bentuk_badan_hukum;
    this.negara_asal = negara_asal;
    this.nomor_keputusan_pengesahan = nomor_keputusan_pengesahan;
    this.tanggal_keputusan_pengesahan = tanggal_keputusan_pengesahan;
    this.nomor_keputusan_pengesahan_perubahan =
      nomor_keputusan_pengesahan_perubahan;
    this.tanggal_keputusan_pengesahan_perubahan =
      tanggal_keputusan_pengesahan_perubahan;
    this.nomor_akta_pendirian = nomor_akta_pendirian;
    this.tempat_pendirian = tempat_pendirian;
    this.tanggal_pendirian = tanggal_pendirian;
    this.nik_notaris = nik_notaris;
    this.nama_notaris = nama_notaris;
    this.jenis_perusahaan = jenis_perusahaan;
    this.modal_dasar = currencyToNumber(modal_dasar);
    this.modal_ditempatkan = currencyToNumber(modal_ditempatkan);
    this.modal_disetor = currencyToNumber(modal_disetor);
    this.kewarganegaraan = kewarganegaraan;
    this.bahasa = bahasa;

    this.status_npwp = status_npwp;
    this.status_pkp = status_pkp;
    this.tanggal_pengukuhan_pkp = tanggal_pengukuhan_pkp;
    this.kantor_wilayah_djp = kantor_wilayah_djp;
    this.kantor_pelayanan_pajak = kantor_pelayanan_pajak;
    this.seksi_pengawasan = seksi_pengawasan;
    this.kode_klu = kode_klu;

    if (result.error.length > 0) this.errors = result.error;
  }
}
