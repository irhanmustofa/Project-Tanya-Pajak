import { badRequest, error } from "../../../app/response.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import NomorEksternal from "../nomor-eksternal-client.entities.js";

export default async function updateNomorEksternal(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, [
      "nomor_eksternal",
    ]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].nomor_eksternal;
    if (singleData.length < 1) {
      return badRequest({
        message: "Update nomor eksternal failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    const arrayNum = dataId.indexOf(id);
    if (arrayNum < 0) {
      return badRequest({
        message: "Update nomor eksternal failed! data not found",
      });
    }

    const dataFound = singleData[arrayNum];
    const input = {
      _id: id,
      tipe: req.body.tipe || dataFound.tipe,
      nomor_identifikasi:
        req.body.nomor_identifikasi || dataFound.nomor_identifikasi,
      tanggal_mulai: req.body.tanggal_mulai || dataFound.tanggal_mulai,
      tanggal_berakhir: req.body.tanggal_berakhir || dataFound.tanggal_berakhir,
    };

    const validation = new NomorEksternal(input);
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData[arrayNum] = validation;
    return await wrapper.update(clientId, { nomor_eksternal: singleData });
  } catch (err) {
    console.log("Update nomor eksternal error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
