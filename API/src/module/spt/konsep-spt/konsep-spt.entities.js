import Validator from "../../../database/database.validator.js";

export default class KonsepSPT {
    constructor(input) {
        const data = {
            jenis_pajak: input.jenis_pajak,
            jenis_surat_pemberitahuan: input.jenis_surat_pemberitahuan,
            masa_pajak: input.masa_pajak,
            nop: input.nop,
            nama_object_pajak: input.nama_object_pajak,
            model_spt: input.model_spt,
            tanggal_jatuh_tempo: input.tanggal_jatuh_tempo,
            tanggal_dibuat: input.tanggal_dibuat,
            status_spt: input.status_spt,
            submission_progress: input.submission_progress,
        };

        const rules = {
            jenis_pajak: "required|string",
            jenis_surat_pemberitahuan: "required|string",
            masa_pajak: "required|string",
            nop: "string",
            nama_object_pajak: "string",
            model_spt: "number",
            tanggal_jatuh_tempo: "date",
            tanggal_dibuat: "date",
            status_spt: "number",
            submission_progress: "number",
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
