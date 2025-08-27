import Validator from "../../database/database.validator.js";

export default class TKU {
  constructor(input) {
    const {
      _id,
      nitku,
      jenis_tku,
      nama_tku,
      deskripsi_tku,
      klu_tku,
      deskripsi_klu_tku,
      alamat,
      rt,
      rw,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      kode_kpp,
      kode_wilayah,
      kode_pos,
      data_geometrik,
      seksi_pengawasan,
      lokasi_disewa,
      identitas_pemilik,
      nama_pemilik,
      tanggal_mulai_sewa,
      tanggal_sewa_berakhir,
      tanggal_mulai,
      tanggal_berakhir,
      toko_retail,
      virtual_office,
      kawasan_ekonomi_khusus,
      tempat_penimbunan_berikat,
      nomor_surat,
      date_valid_from,
      date_valid_to,
      alamat_utama_pkp,
    } = input;

    const data = {
      _id,
      nitku,
      jenis_tku,
      nama_tku,
      deskripsi_tku,
      klu_tku,
      deskripsi_klu_tku,
      alamat,
      rt,
      rw,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      kode_kpp,
      kode_wilayah,
      kode_pos,
      data_geometrik,
      seksi_pengawasan,
      lokasi_disewa,
      identitas_pemilik,
      nama_pemilik,
      tanggal_mulai_sewa,
      tanggal_sewa_berakhir,
      tanggal_mulai,
      tanggal_berakhir,
      toko_retail,
      virtual_office,
      kawasan_ekonomi_khusus,
      tempat_penimbunan_berikat,
      nomor_surat,
      date_valid_from,
      date_valid_to,
      alamat_utama_pkp,
    };

    const baseRules = {
      _id: "required|string|min:7",
      nitku: "required|string",
      jenis_tku: "required|string",
      nama_tku: "required|string",
      deskripsi_tku: "string",
      klu_tku: "required|string",
      deskripsi_klu_tku: "required|string",
      alamat: "required|string",
      rt: "required|string",
      rw: "required|string",
      provinsi: "required|string",
      kabupaten: "required|string",
      kecamatan: "required|string",
      desa: "required|string",
      kode_kpp: "string",
      kode_wilayah: "string",
      kode_pos: "required|string",
      data_geometrik: "string",
      seksi_pengawasan: "string",
      lokasi_disewa: "string",
      identitas_pemilik: "string",
      nama_pemilik: "string",
      tanggal_mulai_sewa: "string",
      tanggal_sewa_berakhir: "string",
      tanggal_mulai: "required|string",
      tanggal_berakhir: "string",
      toko_retail: "string",
      virtual_office: "string",
      kawasan_ekonomi_khusus: "string",
      tempat_penimbunan_berikat: "string",
      nomor_surat: "string",
      date_valid_from: "string",
      date_valid_to: "string",
      alamat_utama_pkp: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.nitku = nitku;
    this.jenis_tku = jenis_tku;
    this.nama_tku = nama_tku;
    this.deskripsi_tku = deskripsi_tku;
    this.klu_tku = klu_tku;
    this.deskripsi_klu_tku = deskripsi_klu_tku;
    this.alamat = alamat;
    this.rt = rt;
    this.rw = rw;
    this.provinsi = provinsi;
    this.kabupaten = kabupaten;
    this.kecamatan = kecamatan;
    this.desa = desa;
    this.kode_kpp = kode_kpp;
    this.kode_wilayah = kode_wilayah;
    this.kode_pos = kode_pos;
    this.data_geometrik = data_geometrik;
    this.seksi_pengawasan = seksi_pengawasan;
    this.lokasi_disewa = lokasi_disewa;
    this.identitas_pemilik = identitas_pemilik;
    this.nama_pemilik = nama_pemilik;
    this.tanggal_mulai_sewa = tanggal_mulai_sewa;
    this.tanggal_sewa_berakhir = tanggal_sewa_berakhir;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;
    this.toko_retail = toko_retail;
    this.virtual_office = virtual_office;
    this.kawasan_ekonomi_khusus = kawasan_ekonomi_khusus;
    this.tempat_penimbunan_berikat = tempat_penimbunan_berikat;
    this.nomor_surat = nomor_surat;
    this.date_valid_from = date_valid_from;
    this.date_valid_to = date_valid_to;
    this.alamat_utama_pkp = alamat_utama_pkp;

    if (result.error.length > 0) this.errors = result.error;
  }
}
