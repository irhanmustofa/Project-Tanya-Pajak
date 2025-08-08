import Response, { badRequest, notFound, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../master-client/master-client.schema.js";
import { userSchema } from "../master-user/user.schema.js";

const userWrapper = new MongodbWrapper(userSchema());
const clientWrapper = new MongodbWrapper(masterClientSchema());

const getUserClient = async (req, res) => {
  const { email, clientid } = req.headers;

  try {
    const [userResult, clientResult] = await Promise.all([
      userWrapper.getByFilter({ email, client_id: clientid }),
      clientWrapper.getByFilter({ _id: clientid }),
    ]);

    const users = userResult?.data || [];
    const clients = clientResult?.data || [];

    const combinedUsers = users.map((user) => {
      const client = clients.find(
        (c) => c._id?.toString() === user.client_id?.toString()
      );

      return {
        _id: user._id,
        client_id: user.client_id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        company_name: client?.company_name || null,
        permission: user.permission,
      };
    });

    return Response(
      res,
      success({
        message: "User and client data retrieved successfully.",
        data: combinedUsers,
      })
    );
  } catch (error) {
    console.error("Error in getUserClient:", error);
    return Response(
      res,
      badRequest({
        message: "Failed to retrieve user and client data.",
      })
    );
  }
};

const userClientController = {
  getUserClient,
};

export default userClientController;
