import Response from "../../app/response.js";
import updateEkonomiClient from "./controllers/update.ekonomi-client.js";

const update = async (req, res) => {
  return Response(res, await updateEkonomiClient(req));
};

const MasterClientController = {
  update,
};

export default MasterClientController;
