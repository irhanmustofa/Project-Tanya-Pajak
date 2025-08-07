import Response, { error, success } from "../../../app/response.js";
import User from "../user.entities.js";
import userModel from "../user.repositories.js";

export default async function updateUser(req, res) {
    const getUser = await userModel.getByFilter({ _id: req.params.id });

    if (!getUser.success) {
        console.error("Error fetching user:", getUser.error);
        return Response(res, error({ message: "User not found." }));
    }

    const user = getUser.data[0];
    const input = {
        group_id: req.body.group_id || user.group_id,
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        role: req.body.role || user.role,
        status: req.body.status || user.status,
    };

    if (req.body?.password) {
        input.password = req.body.password;
    }

    const newUser = new User(input);
    if (newUser.errors && newUser.errors.length > 0) {
        return Response(res, error({ message: newUser.errors.join(", ") }));
    }

    return Response(res, await userModel.update(req.params.id, newUser));
}