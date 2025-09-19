import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Keluarga from "../keluarga-client.entities.js";

export default async function updateKeluarga(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId }, [
      "data_keluarga",
    ]);
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].data_keluarga;
    if (singleData.length < 1) {
      return badRequest({
        message: "Update keluarga client failed! data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    const arrayNum = dataId.indexOf(id);
    if (arrayNum < 0) {
      return badRequest({
        message: "Update keluarga client failed! data not found",
      });
    }

    const dataFound = singleData[arrayNum];
    const input = {
      _id: id,
      nik: req.body.nik || dataFound.nik,
      jenis_kelamin: req.body.jenis_kelamin || dataFound.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir || dataFound.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir || dataFound.tanggal_lahir,
      nomor_kk: req.body.nomor_kk || dataFound.nomor_kk,
      nama: req.body.nama || dataFound.nama,
      status_keluarga: req.body.status_keluarga || dataFound.status_keluarga,
      pekerjaan: req.body.pekerjaan || dataFound.pekerjaan,
      status_unit_pajak:
        req.body.status_unit_pajak || dataFound.status_unit_pajak,
      status_ptkp: req.body.status_ptkp || dataFound.status_ptkp,
      tanggal_mulai: req.body.tanggal_mulai || dataFound.tanggal_mulai,
      tanggal_berakhir: req.body.tanggal_berakhir || dataFound.tanggal_berakhir,
    };

    const validation = new Keluarga(input);
    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData[arrayNum] = validation;
    return await wrapper.update(clientId, { data_keluarga: singleData });
  } catch (err) {
    console.log("update keluarga client error:", err);
    return error({
      message:
        "An error occured while the system was running, Refresh your page!",
    });
  }
}
