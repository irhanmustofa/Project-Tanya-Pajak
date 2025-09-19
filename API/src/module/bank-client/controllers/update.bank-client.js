import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Bank from "../bank-client.entities.js";

export default async function updateBank(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, ["data_bank"]);
    console.log("getData:", getData);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].data_bank;
    if (singleData.length < 1) {
      return badRequest({
        message: "Update bank client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    const arrayNum = dataId.indexOf(id);
    if (arrayNum < 0) {
      return badRequest({
        message: "Update bank client failed! data not found",
      });
    }

    const dataFound = singleData[arrayNum];
    const input = {
      _id: id,
      nama_bank: req.body.nama_bank || dataFound.nama_bank,
      nomor_rekening: req.body.nomor_rekening || dataFound.nomor_rekening,
      jenis_rekening: req.body.jenis_rekening || dataFound.jenis_rekening,
      nama_pemilik_rekening:
        req.body.nama_pemilik_rekening || dataFound.nama_pemilik_rekening,
      tanggal_mulai: req.body.tanggal_mulai || dataFound.tanggal_mulai,
      tanggal_berakhir: req.body.tanggal_berakhir || dataFound.tanggal_berakhir,
    };

    const validation = new Bank(input);
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData[arrayNum] = validation;
    return await wrapper.update(clientId, { data_bank: singleData });
  } catch (err) {
    console.log("update Bank client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
