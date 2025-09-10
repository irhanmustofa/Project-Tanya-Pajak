import Response, { badRequest, success } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import PajakKeluaran from "./pajak-keluaran.entities.js";
import { pajakKeluaranSchema } from "./pajak-keluaran.schema.js";

const wrapper = (client_id) => new MongodbWrapper(pajakKeluaranSchema(client_id));

const getAll = async (req, res) => {
    return Response(res, await wrapper(req.headers.clientid).all());
};

const create = async (req, res) => {
    let lawan_transaksi = req.body.lawan_transaksi;
    let items = req.body.items;
    if (typeof items === "string") {
        items = JSON.parse(items);
    }
    if (typeof lawan_transaksi === "string") {
        lawan_transaksi = JSON.parse(lawan_transaksi);
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        return Response(res, badRequest({ message: "Items must be a non-empty." }));
    }
    req.body.lawan_transaksi = lawan_transaksi;
    req.body.items = items;
    const pajakKeluaran = new PajakKeluaran(req.body);
    if (!pajakKeluaran.isValid()) {
        return Response(res, badRequest({ message: pajakKeluaran.errors.join(", ") }));
    }

    return Response(res, await wrapper(req.headers.clientid).create(pajakKeluaran.data));
};

const update = async (req, res) => {
    let lawan_transaksi = req.body.lawan_transaksi;
    let items = req.body.items;
    if (typeof items === "string") {
        items = JSON.parse(items);
    }
    if (typeof lawan_transaksi === "string") {
        lawan_transaksi = JSON.parse(lawan_transaksi);
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        return Response(res, badRequest({ message: "Items must be a non-empty." }));
    }
    req.body.lawan_transaksi = lawan_transaksi;
    req.body.items = items;
    const pajakKeluaran = new PajakKeluaran(req.body);
    if (!pajakKeluaran.isValid()) {
        return Response(res, {
            status: "error",
            message: pajakKeluaran.errors.join(", "),
        });
    }
    return Response(res, await wrapper(req.headers.clientid).update(req.params.id, pajakKeluaran.data));
};

const remove = async (req, res) => {
    return Response(res, await wrapper(req.headers.clientid).delete(req.params.id));
};

const deleteSome = async (req, res) => {
    const toDelete = req.body.map((id) => ({ _id: id }));

    if (!toDelete || !Array.isArray(toDelete)) {
        return Response(
            res,
            badRequest({ message: "Invalid request body. Expected an array of IDs." })
        );
    }

    if (toDelete.length === 0) {
        return Response(
            res,
            badRequest({ message: "No IDs provided in the request body." })
        );
    }

    for (const id of toDelete) {
        const result = await wrapper(req.headers.clientid).delete(id._id);

        if (!result.success) {
            return Response(res, badRequest({ message: result.message }));
        }
    }

    return Response(res, success({ message: "Pajak Keluaran deleted successfully." }));
};

function normalizeRecord(record) {
    if (typeof record.items === "string") {
        try { record.items = JSON.parse(record.items); } catch { }
    }
    if (typeof record.lawan_transaksi === "string") {
        try { record.lawan_transaksi = JSON.parse(record.lawan_transaksi); } catch { }
    }

    if (!Array.isArray(record.items)) record.items = [];

    if (record.tipe_transaksi !== undefined) {
        record.tipe_transaksi = Number(record.tipe_transaksi);
        if (isNaN(record.tipe_transaksi)) {
            throw new Error("Input tipe_transaksi is invalid number");
        }
    }

    if (record.nomor_faktur !== undefined) {
        record.nomor_faktur = String(record.nomor_faktur).trim();
    }

    record.items = record.items.map((item) => {
        const i = { ...item };
        if (i.qty !== undefined) i.qty = Number(i.qty);
        if (i.harga_satuan !== undefined) i.harga_satuan = Number(i.harga_satuan);
        if (i.total_harga !== undefined) i.total_harga = Number(i.total_harga);
        if (i.diskon !== undefined) i.diskon = Number(i.diskon);
        if (i.tarif_ppn !== undefined) i.tarif_ppn = Number(i.tarif_ppn);
        if (i.dpp !== undefined) i.dpp = Number(i.dpp);
        if (i.ppn !== undefined) i.ppn = Number(i.ppn);
        if (i.dpp_nilai_lain !== undefined) i.dpp_nilai_lain = Number(i.dpp_nilai_lain);
        if (i.tarif_ppnbm !== undefined) i.tarif_ppnbm = Number(i.tarif_ppnbm);
        if (i.ppnbm !== undefined) i.ppnbm = Number(i.ppnbm);

        return i;
    });

    return record;
}


const bulkImport = async (req, res) => {
    const importData = req.body;
    if (!Array.isArray(importData) || importData.length === 0) {
        return Response(res, badRequest({ message: "Import data must be a non-empty array." }));
    }

    const results = { success: [], skipped: [], errors: [] };
    for (let i = 0; i < importData.length; i++) {
        let record = importData[i];

        try {
            record = normalizeRecord(record);

            const pajakKeluaran = new PajakKeluaran(record);
            if (!pajakKeluaran.isValid()) {
                throw new Error(pajakKeluaran.errors.join(", "));
            }

            const existing = await wrapper(req.headers.clientid).getByFilter({
                nomor_faktur: pajakKeluaran.data.nomor_faktur,
                deleted_at: null
            });
            console.log("Existing record:", existing);
            if (existing.success) {
                results.skipped.push({
                    index: i + 1,
                    nomor_faktur: pajakKeluaran.data.nomor_faktur,
                    reason: "Nomor faktur already exists (deleted_at is null)"
                });
                continue;
            }

            const result = await wrapper(req.headers.clientid).create(pajakKeluaran.data);
            if (!result.success) {
                throw new Error(result.message || "Failed to create record");
            }

            results.success.push({
                index: i + 1,
                data: result.data
            });

        } catch (error) {
            let message = error.message || "Unknown error";

            if (error.errors) {
                message = Object.values(error.errors).map(e => e.message).join(", ");
            } else if (error.code === 11000) {
                message = `Duplicate key error: ${JSON.stringify(error.keyValue)}`;
            }

            results.errors.push({
                index: i + 1,
                error: message
            });
        }
    }
    console.log("Bulk import results:", results);

    if (results.errors.length > 0 || results.skipped.length > 0) {
        return Response(res, badRequest({
            message: `Bulk import completed with some issues. 
                      ${results.success.length} imported, 
                      ${results.skipped.length} skipped, 
                      ${results.errors.length} failed.`,
            imported: results.success,
            skipped: results.skipped,
            errors: results.errors
        }));
    }

    return Response(res, success({
        message: `Bulk import successful. ${results.success.length} records imported.`,
        data: results.success
    }));
};

const pajakKeluaranController = {
    getAll,
    create,
    update,
    remove,
    deleteSome,
    bulkImport
};

export default pajakKeluaranController;