import Validator from "../../database/database.validator.js";
import { passwordHash } from "../../utils/functions.js";

export default class Register {
    constructor(input) {
        const baseRules = {
            name: "required|string|min:3|max:100",
            email: "required|email",
            password: "password|min:8",
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
