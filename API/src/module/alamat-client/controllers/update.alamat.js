import { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Alamat from "../alamat.entities.js";

export default async function updateAlamat(req) {
  var inputAlamat = {};
  var newData = [];
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  const getData = await wrapper.getByFilter({ _id: clientId });

  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  try {
    var singleData = getData.data[0].alamat;
    var arrayNum = -1;
    for (let i = 0; i < singleData.length; i++) {
      if (singleData[i].alamat_id !== id) {
        newData.push(singleData[i]);
      } else {
        arrayNum = i;
      }
    }

    if (arrayNum < 0) {
      return badRequest({ message: "Update Alamat Failed! data not found" });
    }

    inputAlamat = {
      alamat_id: id,
      negara: req.body.negara || singleData[arrayNum].negara,
      jenis_alamat: req.body.jenis_alamat || singleData[arrayNum].jenis_alamat,
      alamat: req.body.alamat || singleData[arrayNum].alamat,
      rt: req.body.rt || singleData[arrayNum].rt,
      rw: req.body.rw || singleData[arrayNum].rw,
      provinsi: req.body.provinsi || singleData[arrayNum].provinsi,
      kabupaten: req.body.kabupaten || singleData[arrayNum].kabupaten,
      kecamatan: req.body.kecamatan || singleData[arrayNum].kecamatan,
      desa: req.body.desa || singleData[arrayNum].desa,
      kode_area: req.body.kode_area || singleData[arrayNum].kode_area,
      kode_pos: req.body.kode_pos || singleData[arrayNum].kode_pos,
      data_geometrik:
        req.body.data_geometrik || singleData[arrayNum].data_geometrik,
      disewa: req.body.disewa || singleData[arrayNum].disewa,
      tanggal_mulai:
        req.body.tanggal_mulai || singleData[arrayNum].tanggal_mulai,
      tanggal_berakhir:
        req.body.tanggal_berakhir || singleData[arrayNum].tanggal_berakhir,
      kode_kpp: req.body.kode_kpp || singleData[arrayNum].kode_kpp,
      bagian_pengawasan:
        req.body.bagian_pengawasan || singleData[arrayNum].bagian_pengawasan,
    };

    const alamatClient = new Alamat(inputAlamat);
    newData.push(alamatClient);

    return await wrapper.update(clientId, newData);
  } catch (error) {
    console.log("Error add client address:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
