import Validator from "../../database/database.validator.js";
import { passwordHash, generateId } from "../../utils/functions.js";

export default class User {
  constructor(input) {
    const baseRules = {
      name: "required|string|min:3|max:100",
      email: "required|email",
      password: "required|string|min:8",
      role: "numeric",
      status: "numeric"
    };

    for (const [key, value] of Object.entries(input)) {
      this[key] = value;
    }

    if (input.password) {
      this.password = passwordHash(input.password);
    }

    if (this.subscription === undefined) {
      this.subscription = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    } else if (typeof this.subscription === 'string' || typeof this.subscription === 'number') {
      this.subscription = new Date(this.subscription);
    }

    if (this.permission && !Array.isArray(this.permission)) {
      this.permission = [this.permission];
    }

    const validator = new Validator(input, baseRules);
    const result = validator.getResult();

    if (result.error && result.error.length > 0) {
      this.errors = result.error;
    }
  }
}