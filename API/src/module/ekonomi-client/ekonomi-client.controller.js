import Response from "../../app/response.js";
import updateEkonomi from "./controllers/update.ekonomi-client.js";

const update = async (req, res) => {
  return Response(res, await updateEkonomi(req));
};

const ekonomiController = {
  update,
};

export default ekonomiController;
