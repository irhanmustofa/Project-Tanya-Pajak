import Response, { error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { moveFile } from "../../../utils/uploadHandler.js";
import Client from "../master-client.entities.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function updateClient(req, res) {
  try {
    const wrapper = new MongodbWrapper(masterClientSchema());

    const input = { ...req.body };

    let legalitas_perusahaan = [];
    if (req.body?.legalitas) {
      try {
        legalitas_perusahaan = typeof req.body.legalitas === 'string'
          ? JSON.parse(req.body.legalitas)
          : req.body.legalitas;
      } catch (parseError) {
        console.error("Error parsing legalitas_perusahaan:", parseError);
        legalitas_perusahaan = [];
      }
    }

    input.legalitas_perusahaan = legalitas_perusahaan;
    input.group_id = req.headers.groupid;
    if (req.files?.logo) {
      const newName = "logo-" + input.company_name;
      const folder = "logo-client";

      const fileResult = await moveFile(
        req.files.logo,
        newName,
        folder,
        ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"],
        2
      );

      if (!fileResult.status) {
        return Response(res, error({
          message: fileResult.message || "Logo upload failed",
        }));
      } else {
        input.logo = `/${fileResult.path}`;
      }
    }

    const client = new Client(input);
    if (client.errors) {
      return Response(res, error({
        message: client.errors,
      }));
    }

    return Response(res, await wrapper.update(req.params.id, client));
  } catch (error) {
    console.error("Error updating client:", error);
    return Response(res, error({
      message: error.message || "An error occurred while updating the client.",
    }));
  }
}
