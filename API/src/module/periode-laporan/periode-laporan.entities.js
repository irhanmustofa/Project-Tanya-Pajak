import Validator from "../../database/database.validator.js";
import { parseTanggal } from "../../utils/functions.js";

export default class PeriodeLaporan {
  constructor(input) {
    const {
      tahun_buku,
      periode_laporan,
      periode_awal,
      periode_akhir,
      tanggal_ttd,
      tempat_ttd,
      periode_spt_sebelumnya,
      tarif_pph_spt_sebelumnya,
      file_spt_sebelumnya,

      periode_spt_berjalan,
      tarif_pph_spt_berjalan,
      file_spt_berjalan,

      periode_spt_berikutnya,
      tarif_pph_spt_berikutnya,
      file_spt_berikutnya,


    } = input;

    const data = {
      tahun_buku,
      periode_laporan,
      periode_awal,
      periode_akhir,
      tanggal_ttd,
      tempat_ttd,
      periode_spt_sebelumnya,
      tarif_pph_spt_sebelumnya,
      file_spt_sebelumnya,

      periode_spt_berjalan,
      tarif_pph_spt_berjalan,
      file_spt_berjalan,

      periode_spt_berikutnya,
      tarif_pph_spt_berikutnya,
      file_spt_berikutnya,

    };

    const rules = {
      tahun_buku: "required|number",
      periode_awal: "required|string",
      periode_akhir: "required|string",
      tanggal_ttd: "required|string",
      tempat_ttd: "required|string",
      periode_spt_sebelumnya: "string",
      tarif_pph_spt_sebelumnya: "string",
      periode_spt_berjalan: "string",
      tarif_pph_spt_berjalan: "string",
      periode_spt_berikutnya: "string",
      tarif_pph_spt_berikutnya: "string",
    };

    const validator = new Validator(data, rules);
    const result = validator.getResult();

    this.tahun_buku = Number(tahun_buku);
    this.periode_laporan = periode_laporan || "";
    this.periode_awal = parseTanggal(periode_awal);
    this.periode_akhir = parseTanggal(periode_akhir);
    this.tanggal_ttd = parseTanggal(tanggal_ttd);
    this.tempat_ttd = tempat_ttd;
    this.periode_spt_sebelumnya = parseTanggal(periode_spt_sebelumnya) || undefined;
    this.tarif_pph_spt_sebelumnya = tarif_pph_spt_sebelumnya || undefined;
    this.file_spt_sebelumnya = file_spt_sebelumnya || undefined;

    this.periode_spt_berjalan = parseTanggal(periode_spt_berjalan) || undefined;
    this.tarif_pph_spt_berjalan = tarif_pph_spt_berjalan || undefined;
    this.file_spt_berjalan = file_spt_berjalan || undefined;

    this.periode_spt_berikutnya = parseTanggal(periode_spt_berikutnya) || undefined;
    this.tarif_pph_spt_berikutnya = tarif_pph_spt_berikutnya || undefined;
    this.file_spt_berikutnya = file_spt_berikutnya || undefined;

    const allErrors = [...result.error];
    if (allErrors.length > 0) this.errors = allErrors;
  }
}
