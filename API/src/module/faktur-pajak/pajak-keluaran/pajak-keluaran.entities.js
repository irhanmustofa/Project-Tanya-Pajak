import Validator from "../../../database/database.validator.js";

export default class PajakKeluaran {
    constructor(input) {
        const data = {
            tipe_transaksi: input.tipe_transaksi,
            nomor_faktur: input.nomor_faktur,
            kode_transaksi: input.kode_transaksi,
            tanggal_faktur: input.tanggal_faktur,
            jenis_faktur: input.jenis_faktur,
            referensi_faktur: input.referensi_faktur,
            alamat: input.alamat,
            idtku: input.idtku,
            lawan_transaksi: input.lawan_transaksi,
            items: input.items,
            status: input.status ?? 0,
        };

        const rules = {
            tipe_transaksi: "required",
            nomor_faktur: "required|string",
            kode_transaksi: "required|string",
            tanggal_faktur: "required|date",
            jenis_faktur: "required|string",
            referensi_faktur: "string",
            alamat: "required|string",
            idtku: "required|string",
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
