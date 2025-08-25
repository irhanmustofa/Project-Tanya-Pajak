import { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { generateId } from "../../../utils/functions.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import Alamat from "../alamat.entities.js";

export default async function createAlamat(req) {
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());
  const getData = await wrapper.getByFilter({ _id: clientId });

  if (!getData.success) {
    return badRequest({ message: getData.message });
  }

  try {
    const singleData = getData.data[0].data_alamat;
    const inputAlamat = {
      _id: generateId(),
      negara: req.body.negara,
      jenis_alamat: req.body.jenis_alamat,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      provinsi: req.body.provinsi,
      kabupaten: req.body.kabupaten,
      kecamatan: req.body.kecamatan,
      desa: req.body.desa,
      kode_area: req.body.kode_area,
      kode_pos: req.body.kode_pos,
      data_geometrik: req.body.data_geometrik,
      disewa: req.body.disewa,
      identitas_pemilik: req.body.identitas_pemilik,
      nama_pemilik: req.body.nama_pemilik,
      tanggal_mulai_sewa: req.body.tanggal_mulai_sewa,
      tanggal_sewa_berakhir: req.body.tanggal_sewa_berakhir,
      tanggal_mulai: req.body.tanggal_mulai,
      tanggal_berakhir: req.body.tanggal_berakhir,
      kode_kpp: req.body.kode_kpp,
      bagian_pengawasan: req.body.bagian_pengawasan,
    };

    const alamatClient = new Alamat(inputAlamat);
    if (alamatClient.errors) {
      return badRequest({ message: alamatClient.errors.join(", ") });
    }

    singleData.push(inputAlamat);
    return await wrapper.update(clientId, { data_alamat: singleData });
  } catch (error) {
    console.log("Error add client address:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
