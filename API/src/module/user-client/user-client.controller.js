import Response, { badRequest, notFound, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../master-client/master-client.schema.js";
import { userSchema } from "../master-user/user.schema.js";

const userWrapper = new MongodbWrapper(userSchema());
const clientWrapper = new MongodbWrapper(masterClientSchema());

const getUserClient = async (req, res) => {
    const { email } = req.headers;
    console.log("Email from headers:", email);
    if (!email) {
        return Response(res, badRequest({ message: "Email is required." }));
    }

    try {
        const userData = await userWrapper.getByFilter({ email: email });
        if (!userData.success || userData.data.length === 0) {
            return Response(res, notFound({ message: "User not found." }));
        }

        const clientIds = [...new Set(userData.data.map(user => user.client_id))];
        console.log("Client IDs found:", clientIds);

        const allClientsData = [];
        for (const clientId of clientIds) {
            const clientData = await clientWrapper.getByFilter({ _id: clientId });
            if (clientData.success && clientData.data.length > 0) {
                allClientsData.push(clientData.data[0]);
            }
        }

        const combinedUsers = userData.data.map(user => {
            const userClient = allClientsData.find(client => client._id === user.client_id);

            return {
                _id: user._id,
                client_id: user.client_id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                company_name: userClient ? userClient.company_name : null,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        });

        return Response(res, success({
            message: "User and client data retrieved successfully.",
            data: combinedUsers
        }));

    } catch (error) {
        console.error("Error in getUserClient:", error);
        return Response(res, badRequest({ message: "Failed to retrieve user and client data." }));
    }
};

const userClientController = {
    getUserClient,
};

export default userClientController;
