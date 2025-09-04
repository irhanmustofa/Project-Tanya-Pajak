import Response, { badRequest, success } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import KonsepSPT from "./konsep-spt.entities.js";
import { konsepSptSchema } from "./konsep-spt.schema.js";

const wrapper = (client_id) => new MongodbWrapper(konsepSptSchema(client_id));

const getAll = async (req, res) => {
    return Response(res, await wrapper(req.headers.clientid).all());
};

const create = async (req, res) => {
    const konsepSpt = new KonsepSPT(req.body);
    if (!konsepSpt.isValid()) {
        // console.log(konsepSpt);
        return Response(res, badRequest({ message: konsepSpt.errors.join(", ") }));
    }
    console.log('   konsepSpt', konsepSpt);

    return Response(res, await wrapper(req.headers.clientid).create(konsepSpt.data));
};

const update = async (req, res) => {
    const konsepSpt = new KonsepSPT(req.body);
    if (!konsepSpt.isValid()) {
        return Response(res, {
            status: "error",
            message: konsepSpt.errors.join(", "),
        });
    }
    return Response(res, await wrapper(req.headers.clientid).update(req.params.id, konsepSpt.data));
};

const remove = async (req, res) => {
    return Response(res, await wrapper(req.headers.clientid).delete(req.params.id));
};

const deleteSome = async (req, res) => {
    console.log(req.body);
    const toDelete = req.body.map((id) => ({ _id: id }));
    console.log(toDelete);

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

    return Response(res, success({ message: "Konsep SPT deleted successfully." }));
};






const konsepSptController = {
    getAll,
    create,
    update,
    remove,
    deleteSome,
};

export default konsepSptController;