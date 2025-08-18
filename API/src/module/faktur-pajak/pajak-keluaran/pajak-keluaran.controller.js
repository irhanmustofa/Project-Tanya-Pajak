import Response, { badRequest, success } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import FakturPajak from "../faktur-pajak.entities.js";
import { fakturPajakSchema } from "../faktur-pajak.schema.js";
import PajakKeluaran from "./pajak-keluaran.entities.js";
import { pajakKeluaranSchema } from "./pajak-keluaran.schema.js";

const wrapper = (client_id) => new MongodbWrapper(fakturPajakSchema(client_id));

const getAll = async (req, res) => {
    return Response(res, await wrapper(req.headers.clientid).all());
};

const create = async (req, res) => {
    let lawan_transaksi = req.body.lawan_transaksi;
    if (typeof lawan_transaksi === "string") {
        lawan_transaksi = JSON.parse(lawan_transaksi);
    }
    req.body.jenis_faktur = 0;
    req.body.lawan_transaksi = lawan_transaksi;
    const pajakKeluaran = new FakturPajak(req.body);
    console.log(pajakKeluaran);
    if (!pajakKeluaran.isValid()) {
        return Response(res, {
            status: "error",
            message: pajakKeluaran.errors.join(", "),
        });
    }

    return Response(res, await wrapper(req.headers.clientid).create(pajakKeluaran.data));
};

const update = async (req, res) => {
    let lawan_transaksi = req.body.lawan_transaksi;
    if (typeof lawan_transaksi === "string") {
        lawan_transaksi = JSON.parse(lawan_transaksi);
    }
    req.body.lawan_transaksi = lawan_transaksi;
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


const pajakKeluaranController = {
    getAll,
    create,
    update,
    remove,
    deleteSome,
};

export default pajakKeluaranController;