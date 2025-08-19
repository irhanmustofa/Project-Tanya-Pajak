import Validator from "../../database/database.validator.js";

export default class Alamat {
  constructor(input) {
    const {
      _id,
      negara,
      jenis_alamat,
      alamat,
      rt,
      rw,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      kode_area,
      kode_pos,
      data_geometrik,
      disewa,
      identitas_pemilik,
      nama_pemilik,
      tanggal_mulai_sewa,
      tanggal_sewa_berakhir,
      tanggal_mulai,
      tanggal_berakhir,
      kode_kpp,
      bagian_pengawasan,
    } = input;

    const data = {
      _id,
      negara,
      jenis_alamat,
      alamat,
      rt,
      rw,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      kode_area,
      kode_pos,
      data_geometrik,
      disewa,
      identitas_pemilik,
      nama_pemilik,
      tanggal_mulai_sewa,
      tanggal_sewa_berakhir,
      tanggal_mulai,
      tanggal_berakhir,
      kode_kpp,
      bagian_pengawasan,
    };

    const baseRules = {
      _id: "required|string",
      negara: "string",
      jenis_alamat: "string",
      alamat: "string",
      rt: "string",
      rw: "string",
      provinsi: "number",
      kabupaten: "number",
      kecamatan: "number",
      desa: "number",
      kode_area: "string",
      kode_pos: "string",
      data_geometrik: "string",
      disewa: "bolean",
      identitas_pemilik: "string",
      nama_pemilik: "string",
      tanggal_mulai_sewa: "string",
      tanggal_sewa_berakhir: "string",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
      kode_kpp: "string",
      bagian_pengawasan: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this._id = _id;
    this.negara = negara;
    this.jenis_alamat = jenis_alamat;
    this.alamat = alamat;
    this.rt = rt;
    this.rw = rw;
    this.provinsi = Number(provinsi);
    this.kabupaten = Number(kabupaten);
    this.kecamatan = Number(kecamatan);
    this.desa = Number(desa);
    this.kode_area = kode_area;
    this.kode_pos = kode_pos;
    this.data_geometrik = data_geometrik;
    this.disewa = Boolean(disewa);
    this.identitas_pemilik = identitas_pemilik;
    this.nama_pemilik = nama_pemilik;
    this.tanggal_mulai_sewa = tanggal_mulai_sewa;
    this.tanggal_sewa_berakhir = tanggal_sewa_berakhir;
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;
    this.kode_kpp = kode_kpp;
    this.bagian_pengawasan = bagian_pengawasan;

    if (result.error.length > 0) this.errors = result.error;
  }
}
