import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import OrangTerkait from "../orang-terkait-client.entities.js";

export default async function updateOrangTerkait(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var singleData = getData.data[0].orang_terkait || [];
    if (singleData.length < 1) {
      return badRequest({
        message: "Update related person failed! Data not found",
      });
    }

    const dataId = singleData.map((item) => item._id);
    if (dataId.indexOf(id) < 0) {
      return badRequest({
        message: "Update related person failed! Data not found",
      });
    }

    const arrayNum = dataId.indexOf(id);
    const dataFound = singleData[arrayNum];
    const input = {
      _id: id,
      jenis_pihak: req.body.jenis_pihak || dataFound.jenis_pihak,
      pic: req.body.pic || dataFound.pic,
      jenis_orang_terkait:
        req.body.jenis_orang_terkait || dataFound.jenis_orang_terkait,
      sub_jenis_orang_terkait:
        req.body.sub_jenis_orang_terkait || dataFound.sub_jenis_orang_terkait,
      identitas: req.body.identitas || dataFound.identitas,
      name: req.body.name || dataFound.name,
      nomor_paspor: req.body.nomor_paspor || dataFound.nomor_paspor,
      kewarganegaraan: req.body.kewarganegaraan || dataFound.kewarganegaraan,
      negara_asal: req.body.negara_asal || dataFound.negara_asal,
      email: req.body.email || dataFound.email,
      nomor_telepon: req.body.nomor_telepon || dataFound.nomor_telepon,
      tanggal_mulai: req.body.tanggal_mulai || dataFound.tanggal_mulai,
      tanggal_berakhir: req.body.tanggal_berakhir || dataFound.tanggal_berakhir,
      jenis_wp: req.body.jenis_wp || dataFound.jenis_wp,
      keterangan: req.body.keterangan || dataFound.keterangan,
    };

    const dataValid = new OrangTerkait(input);
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    singleData[arrayNum] = dataValid;
    return await wrapper.update(clientId, { orang_terkait: singleData });
  } catch (err) {
    console.log("create Related Person client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
