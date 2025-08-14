import Validator from "../../database/database.validator.js";

export default class Alamat {
  constructor(input) {
    const {
      alamat_id,
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
      tanggal_mulai,
      tanggal_berakhir,
      kode_kpp,
      bagian_pengawasan,
    } = input;

    const data = {
      alamat_id,
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
      tanggal_mulai,
      tanggal_berakhir,
      kode_kpp,
      bagian_pengawasan,
    };

    const baseRules = {
      alamat_id: "required|string",
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
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
      kode_kpp: "string",
      bagian_pengawasan: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this.alamat_id = alamat_id;
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
    this.tanggal_mulai = tanggal_mulai;
    this.tanggal_berakhir = tanggal_berakhir;
    this.kode_kpp = kode_kpp;
    this.bagian_pengawasan = bagian_pengawasan;

    if (result.error.length > 0) this.errors = result.error;
  }
}
