import Response, {
    badRequest,
    success,
} from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { permissionSchema } from "./permission.schema.js";

const wrapper = new MongodbWrapper(permissionSchema());

const createPermission = async (req, res) => {
    const result = await wrapper.create(req.body);

    if (result.error) {
        return Response(res, badRequest({ message: result.message }));
    }

    return Response(res, success({ message: "Permission created successfully" }));
};

const getAllPermissions = async (req, res) => {
    const permissions = await wrapper.allOrder("key", "asc");
    if (permissions.error) {
        return Response(res, badRequest({ message: permissions.message }));
    }
    const filteredData = permissions.data.map(permission => ({
        _id: permission._id,
        key: permission.key,
        description: permission.description
    }));

    return Response(res, success({
        message: "Permissions retrieved successfully",
        data: filteredData
    }));
};



const PermissionController = {
    createPermission,
    getAllPermissions,
};

export default PermissionController;