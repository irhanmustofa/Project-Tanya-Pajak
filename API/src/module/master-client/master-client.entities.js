import Validator from "../../database/database.validator.js";

export default class Client {
    constructor(input) {
        const {
            _id,
            company_name,
        } = input;

        const data = {
            _id,
            company_name,
        };

        const baseRules = {
            _id: "required|string",
            company_name: "required|string|min:3|max:100",
        };

        const validator = new Validator(data, baseRules);
        const result = validator.getResult();

        this._id = _id;
        this.company_name = company_name;
        if (result.error.length > 0) this.errors = result.error;
    }
}
