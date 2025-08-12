import Validator from "../../database/database.validator.js";
import { passwordHash, generateId } from "../../utils/functions.js";

export default class Document {
  constructor(input) {
    const baseRules = {
      nama_jenis_dokumen: "required|string",
      nomor_dokumen: "string",
      nik_npwp: "string",
      nama_wp: "string",
      paspor: "string",
      tanggal_dokumen: "date",
      tanda_terima_dokumen: "date",
      perihal_dokumen: "string",
      pengirim_dokumen: "string",
      keaslian_dokumen: "string",
      deskripsi_dokumen: "string",
      penerima: "string",
      catatan_komentar: "string",
      tag_dokumen: "string",
      klasifikasi: "string",
      bahasa: "string",
      jenis_pajak: "string",
      tahun_pajak: "numeric",
      bulan_pajak: "numeric",
      file: "string",
    };

    for (const [key, value] of Object.entries(input)) {
      this[key] = value;
    }

    const validator = new Validator(input, baseRules);
    const result = validator.getResult();

    if (result.error && result.error.length > 0) {
      this.errors = result.error;
    }
  }
}