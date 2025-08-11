import Validator from "../../database/database.validator.js";

export default class Permission {
    constructor(input) {
        const baseRules = {
            key: "string|required|trim|unique",
            description: "string|required|trim",
        };

        for (const [key, value] of Object.entries(input)) {
            this[key] = value;
        }

        const validator = new Validator(input, baseRules);

        const result = validator.getResult();

        if (result.error.length > 0) this.errors = result.error;
    }
}
