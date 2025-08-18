import Validator from "../../../database/database.validator.js";

export default class PajakKeluaran {
    constructor(input) {
        const data = {
            nomor_faktur: input.nomor_faktur,
            tanggal_faktur: input.tanggal_faktur,
            dpp: input.dpp,
            ppn: input.ppn,
            description: input.description,
            lawan_transaksi: input.lawan_transaksi,
            status: input.status ?? 1,
        };

        const rules = {
            nomor_faktur: "required|string",
            tanggal_faktur: "required|date",
            dpp: "required|number",
            ppn: "required|number",
            description: "string",
            lawan_transaksi: "required|object",
            "lawan_transaksi.nama": "required|string",
            "lawan_transaksi.npwp": "required|string",
            "lawan_transaksi.alamat": "string",
        };

        const validator = new Validator(data, rules);
        const result = validator.getResult();

        this.errors = result.error;
        this.data = data;
    }

    isValid() {
        return this.errors.length === 0;
    }
}
