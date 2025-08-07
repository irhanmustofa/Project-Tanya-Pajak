import Response, { error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { moveFile } from "../../../utils/uploadHandler.js";
import Client from "../master-client.entities.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function createClient(req, res) {
  const wrapper = new MongodbWrapper(masterClientSchema());
  try {
    let legalitas_perusahaan = [];

    if (req.body?.legalitas) {
      try {
        legalitas_perusahaan =
          typeof req.body.legalitas === "string"
            ? JSON.parse(req.body.legalitas)
            : req.body.legalitas;
      } catch (parseError) {
        console.error("Error parsing legalitas_perusahaan:", parseError);
        legalitas_perusahaan = [];
      }
    }

    const {
      group_id,
      company_name,
      address_company,
      no_npwp,
      no_pkp,
      director_name,
      no_ktp_director,
      address_director,
      rups_akhir_tahun,
      status = 1,
    } = req.body;

    const input = {
      group_id,
      company_name,
      address_company,
      no_npwp,
      no_pkp,
      director_name,
      no_ktp_director,
      address_director,
      rups_akhir_tahun,
      legalitas_perusahaan,
      status,
    };
    if (req.files?.logo) {
      const newName = `logo-${company_name}`;
      const folder = "logo-client";

      const fileResult = await moveFile(
        req.files.logo,
        newName,
        folder,
        ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"],
        1
      );

      if (!fileResult.status) {
        return Response(
          res,
          error({
            message: fileResult.message || "File upload failed",
          })
        );
      } else {
        input.logo = `/${fileResult.path}`;
      }
    }

    const client = new Client(input);
    if (client.errors && client.errors.length > 0) {
      return Response(
        res,
        error({
          message: client.errors.join(", "),
        })
      );
    }
    return Response(res, await wrapper.create(client));
  } catch (createError) {
    console.error("Error creating client:", createError);
    return Response(
      res,
      error({
        message: createError.message || "Failed to create client",
      })
    );
  }
}
