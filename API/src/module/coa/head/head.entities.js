import Validator from "../../../database/database.validator.js";

export default class Head {
  constructor(input) {
    const { nama_head, kode_head, kode_group } = input;
    const data = {
      nama_head,
      kode_head,
      kode_group,
    };

    const baseRules = {
      nama_head: "required|string",
      kode_head: "required|string",
      kode_group: "required|string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this.nama_head = nama_head;
    this.kode_head = kode_head;
    this.kode_group = kode_group;
    if (result.error.length > 0) this.errors = result.error;
  }
}
