import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import { generateId } from "../../../utils/functions.js";
import KontakClient from "../kontak-client.entities.js";

export default async function updateKontakClient(req) {
  const id = req.params.id;
  const body = req.body;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    var singleData = getData.data[0].data_kontak ?? [];
    if (singleData.length < 1) {
      return badRequest({ message: "Update Contact Failed! Data Not Found" });
    }

    const idKontak = singleData.map((item) => item._id);
    if (idKontak.indexOf(id) < 0) {
      return badRequest({ message: "Update Contact Failed! Data Not Found" });
    }

    const arrayNum = idKontak.indexOf(id);
    const dataFound = singleData[arrayNum];
    const input = {
      _id: id,
      jenis_kontak: body.jenis_kontak || dataFound.jenis_kontak,
      nomor_telepon: body.nomor_telepon || dataFound.nomor_telepon,
      nomor_handphone: body.nomor_handphone || dataFound.nomor_handphone,
      nomor_faksimile: body.nomor_faksimile || dataFound.nomor_faksimile,
      email: body.email || dataFound.email,
      keterangan: body.keterangan || dataFound.keterangan,
      website: body.website || dataFound.website,
      tanggal_mulai: body.tanggal_mulai || dataFound.tanggal_mulai,
      tanggal_berakhir: body.tanggal_berakhir || dataFound.tanggal_berakhir,
    };

    const dataValid = new KontakClient(input);
    if (dataValid.errors) {
      return badRequest({ message: dataValid.errors.join(", ") });
    }

    singleData[arrayNum] = dataValid;
    return await wrapper.update(clientId, { data_kontak: singleData });
  } catch (err) {
    console.log("Update Contact client err:", err);
    return error({ message: "An error occurred while the system was running" });
  }
}
