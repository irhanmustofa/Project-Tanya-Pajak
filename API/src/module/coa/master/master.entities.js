import Validator from "../../../database/database.validator.js";

export default class MasterCoa {
  constructor(input) {
    const {
      nama_akun,
      kode_akun,
      kode_head,
      kode_group,
      jenis_asset,
      klasifikasi_pajak,
      pph,
      laba_kotor,
      ebt,
      arus_bank,
      cf,
    } = input;

    const data = {
      nama_akun,
      kode_akun,
      kode_head,
      kode_group,
      jenis_asset,
      klasifikasi_pajak,
      pph,
      laba_kotor,
      ebt,
      arus_bank,
      cf,
    };

    const baseRules = {
      nama_akun: "required|string|min:3",
      kode_akun: "required|string|max:8",
      kode_head: "required|string",
      kode_group: "required|string",
      jenis_asset: "string",
      klasifikasi_pajak: "string",
      pph: "string",
      laba_kotor: "string",
      ebt: "string",
      arus_bank: "string",
      cf: "string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this.nama_akun = nama_akun;
    this.kode_akun = kode_akun;
    this.kode_head = kode_head;
    this.kode_group = kode_group;
    this.jenis_asset = jenis_asset;
    this.klasifikasi_pajak = klasifikasi_pajak;
    this.pph = pph;
    this.laba_kotor = laba_kotor;
    this.ebt = ebt;
    this.arus_bank = arus_bank;
    this.cf = cf;
    if (result.error.length > 0) this.errors = result.error;
  }
}
