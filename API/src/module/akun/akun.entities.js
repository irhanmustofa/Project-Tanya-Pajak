import Validator from "../../database/database.validator.js";

export default class Akun {
    constructor(input) {
        const {
            client_id,
            client_service,
            max_user,
            client_paket,
            client_active,
            client_status,
        } = input;

        const data = {
            client_id,
            client_service,
            max_user,
            client_paket,
            client_active,
            client_status,
        };

        const baseRules = {
            client_id: "required|string",
            client_service: "required|number",
            max_user: "required|number",
            client_paket: "required|number",
            client_active: "required|date",
            client_status: "required|number",
        };

        const validator = new Validator(data, baseRules);
        const result = validator.getResult();
        if (!result.success) {
            throw new Error(result.message);
        }

        this.client_id = client_id;
        this.client_service = client_service;
        this.max_user = max_user;
        this.client_paket = client_paket;
        this.client_active = client_active;
        this.client_status = client_status;

        if (result.error.length > 0) this.errors = result.error;
    }
}
