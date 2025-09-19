import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import DataEkonomi from "../ekonomi-client.entities.js";

export default async function updateEkonomi(req) {
  const clientId = req.params.id;
  const wrapper = new MongodbWrapper(masterClientSchema());
  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const getSingle = getData.data[0];

    const ekonomi = {
      merek: req.body.merek || getSingle.merek,
      jumlah_karyawan: req.body.jumlah_karyawan || getSingle.jumlah_karyawan,
      metode_pembukuan: req.body.metode_pembukuan || getSingle.metode_pembukuan,
      mata_uang_pembukuan:
        req.body.mata_uang_pembukuan || getSingle.mata_uang_pembukuan,
      periode_pembukuan:
        req.body.periode_pembukuan || getSingle.periode_pembukuan,
      omset_pertahun: req.body.omset_pertahun || getSingle.omset_pertahun,
      bruto: req.body.bruto || getSingle.bruto,
    };
    const dataValid = new DataEkonomi(ekonomi);
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    return await wrapper.update(clientId, dataValid);
  } catch (err) {
    console.log("Error add client Economic Data:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
