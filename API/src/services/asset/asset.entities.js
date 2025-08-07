import Validator from "../../database/database.validator.js";
import { parseTanggal } from "../../utils/functions.js";

export default class Asset {
  constructor(input) {
    const {
      buku,
      jenis_asset,
      kategori_asset,
      golongan_asset,
      jenis_harta,
      nomor_fa,
      nama_aktiva_tetap,
      qty,
      satuan,
      kode_akun,
      periode_manfaat_k,
      periode_manfaat_f,
      tanggal_perolehan,
      harga_perolehan,
      metode_penyusutan,
      tanggal_penjualan_aktiva_tetap,
      tanggal_penyusutan_sebelumnya,
      voucher_asset_terjual,
      harga_jual_aktiva_tetap,
    } = input;

    const data = {
      buku,
      jenis_asset,
      kategori_asset,
      golongan_asset,
      jenis_harta,
      nomor_fa,
      nama_aktiva_tetap,
      qty,
      satuan,
      kode_akun,
      periode_manfaat_k,
      periode_manfaat_f,
      tanggal_perolehan,
      harga_perolehan,
      metode_penyusutan,
      tanggal_penjualan_aktiva_tetap,
      tanggal_penyusutan_sebelumnya,
      voucher_asset_terjual,
      harga_jual_aktiva_tetap,
    };

    const rules = {
      buku: "required|string|min:3|max:100",
      jenis_asset: "required|string",
      kategori_asset: "required|string",
      golongan_asset: "required|string",
      jenis_harta: "required|string",
      nomor_fa: "required|string",
      nama_aktiva_tetap: "required|string|min:3|max:100",
      qty: "required|number",
      satuan: "required|string",
      kode_akun: "required|string",
      periode_manfaat_k: "required|number",
      periode_manfaat_f: "required|number",
      tanggal_perolehan: "date",
      harga_perolehan: "number",
      metode_penyusutan: "required|string",
      tanggal_penjualan_aktiva_tetap: "required|date",
      tanggal_penyusutan_sebelumnya: "required|date",
      voucher_asset_terjual: "required|string",
      harga_jual_aktiva_tetap: "required|number",
    };

    const validator = new Validator(data, rules);
    const result = validator.getResult();

    this.buku = buku;
    this.jenis_asset = jenis_asset;
    this.kategori_asset = kategori_asset;
    this.golongan_asset = golongan_asset;
    this.jenis_harta = jenis_harta;
    this.nomor_fa = nomor_fa;
    this.nama_aktiva_tetap = nama_aktiva_tetap;
    this.qty = qty;
    this.satuan = satuan;
    this.kode_akun = kode_akun;
    this.periode_manfaat_k = periode_manfaat_k;
    this.periode_manfaat_f = periode_manfaat_f;
    this.tanggal_perolehan = parseTanggal(tanggal_perolehan);
    this.harga_perolehan = harga_perolehan;
    this.metode_penyusutan = metode_penyusutan;
    this.tanggal_penjualan_aktiva_tetap = parseTanggal(tanggal_penjualan_aktiva_tetap);
    this.tanggal_penyusutan_sebelumnya = parseTanggal(tanggal_penyusutan_sebelumnya);
    this.voucher_asset_terjual = voucher_asset_terjual;
    this.harga_jual_aktiva_tetap = harga_jual_aktiva_tetap;

    if (result.error.length > 0) this.errors = result.error;
  }
}
