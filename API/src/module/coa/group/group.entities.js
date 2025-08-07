import Validator from "../../../database/database.validator.js";

export default class Group {
  constructor(input) {
    const { nama_group, kode_group } = input;
    const data = {
      nama_group,
      kode_group,
    };

    const baseRules = {
      nama_group: "required|string",
      kode_group: "required|string",
    };

    const validator = new Validator(data, baseRules);
    const result = validator.getResult();

    this.nama_group = nama_group;
    this.kode_group = kode_group;
    if (result.error.length > 0) this.errors = result.error;
  }
}
