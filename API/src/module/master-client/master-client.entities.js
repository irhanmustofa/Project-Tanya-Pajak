import Validator from "../../database/database.validator.js";

export default class Client {
    constructor(input) {
        const {
            group_id,
            company_name,
            address_company,
            no_npwp,
            no_pkp,
            director_name,
            no_ktp_director,
            address_director,
            rups_akhir_tahun,
            logo,
            legalitas_perusahaan,
            status = 1
        } = input;

        const data = {
            group_id,
            company_name,
            address_company,
            no_npwp,
            no_pkp,
            director_name,
            no_ktp_director,
            address_director,
            status
        };

        const baseRules = {
            group_id: "required|string|min:3",
            company_name: "required|string|min:3|max:100",
            address_company: "required|string",
            no_npwp: "required|string",
            no_pkp: "required|string",
            director_name: "required|string",
            no_ktp_director: "required|string",
            address_director: "required|string",
            status: "required|number|min:0"
        };

        const validator = new Validator(data, baseRules);
        const result = validator.getResult();

        this.group_id = group_id;
        this.company_name = company_name;
        this.address_company = address_company;
        this.no_npwp = no_npwp;
        this.no_pkp = no_pkp;
        this.director_name = director_name;
        this.no_ktp_director = no_ktp_director;
        this.address_director = address_director;
        this.rups_akhir_tahun = rups_akhir_tahun || "";
        this.logo = logo || "";

        this.legalitas_perusahaan = legalitas_perusahaan || [];

        this.status = status;
        if (result.error.length > 0) this.errors = result.error;
    }
}
