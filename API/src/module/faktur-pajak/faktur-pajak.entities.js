import Validator from "../../database/database.validator.js";

export default class FakturPajak {
    constructor(input) {
        const data = {
            jenis_faktur: input.jenis_faktur,
            nomor_faktur: input.nomor_faktur,
            tanggal_faktur: input.tanggal_faktur,
            referensi_faktur: input.referensi_faktur,
            lawan_transaksi: input.lawan_transaksi,
            items: input.items,
            total_dpp: input.total_dpp,
            total_ppn: input.total_ppn,
            total_ppnbm: input.total_ppnbm,
            status: input.status ?? 0,
        };

        const rules = {
            jenis_faktur: "required|number",
            nomor_faktur: "required|string",
            tanggal_faktur: "required|date",
            referensi_faktur: "string",
            lawan_transaksi: "required|object",
            "lawan_transaksi.nama": "required|string",
            "lawan_transaksi.npwp": "required|string",
            "lawan_transaksi.alamat": "string",
            items: "required|array",
            "items.*.nama": "required|string",
            "items.*.jumlah": "required|number",
            "items.*.harga": "required|number",
            "items.*.diskon": "number",
            "items.*.dpp": "required|number",
            "items.*.ppn": "required|number",
            "items.*.ppnbm": "number",
            total_dpp: "required|number",
            total_ppn: "required|number",
            total_ppnbm: "required|number",
            status: "required|number",
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
