import Validator from "../../database/database.validator.js";

export default class Group {
    constructor(input) {
        const { name, status } = input;
        const data = { name, status };

        const baseRules = {
            name: "required|string|min:3|max:100",
            status: "integer",
        };

        const validator = new Validator(data, baseRules);
        const result = validator.getResult();

        this.name = name;
        this.status = status || 1;
        if (result.error.length > 0) this.errors = result.error;
    }
}
