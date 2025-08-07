import Validator from "../../database/database.validator.js";
import { passwordHash } from "../../utils/functions.js";

export default class User {
  constructor(input) {
    const baseRules = {
      group_id: "required|string|min:3",
      name: "required|string|min:3|max:100",
      email: "required|email",
      password: "password|min:8",
      role: "required|number|min:0",
      status: "required|number|min:0",
    };

    for (const [key, value] of Object.entries(input)) {
      this[key] = value;
    }

    const validator = new Validator(input, baseRules);
    const result = validator.getResult();

    if (input.password !== undefined)
      this.password = passwordHash(input.password);
    if (result.error.length > 0) this.errors = result.error;
  }
}
