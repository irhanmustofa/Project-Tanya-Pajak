import Response, { badRequest } from "../../../app/response.js";
import User from "../user.entities.js";
import userModel from "../user.repositories.js";

export default async function importUser(req, res) {
    const data_input = req.body;
    if (!Array.isArray(data_input) || data_input.length === 0) {
        return Response(res, badRequest({ message: "No users to import." }));
    }

    const results = [];
    for (const userData of data_input) {
        const input = {
            group_id: userData.group_id || '',
            name: userData.name || '',
            email: userData.email || '',
            password: userData.password || '',
            role: userData.role || 0,
            status: 1,
        };

        const user = new User(input);
        if (user.errors) {
            results.push({ email: input.email, success: false, message: user.errors.join(', ') });
            return Response(res, {
                success: false,
                message: user.errors.join(', '),
                results
            });
        }

        await userModel.create(user).then((result) => {
            if (!result.success) {
                results.push({ email: input.email, success: false, message: result.message });
                return;
            }

            results.push({ email: input.email, success: true, message: "Imported successfully." });
        }).catch((error) => {
            results.push({ email: input.email, success: false, message: error.message });
        });
    }

    return Response(res, {
        success: true,
        imported: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
    });
}