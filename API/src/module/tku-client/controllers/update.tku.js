import { badRequest, error } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import { generateId } from "../../../utils/functions.js";
import { masterClientSchema } from "../../master-client/master-client.schema.js";
import TKU from "../tku.entities.js";

export default async function updateTku(req) {
  const id = req.params.id;
  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterClientSchema());

  try {
    const getData = await wrapper.getByFilter({ _id: clientId });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0].tempat_kegiatan_usaha || [];
    if (singleData.length < 1) {
      return badRequest({ message: "Update TKU  failed! Data not found" });
    }

    const dataId = singleData.map((item) => item._id);
    if (dataId.indexOf(id) < 0) {
      return badRequest({ message: "Update TKU  failed! Data not found" });
    }

    const arrayNum = dataId.indexOf(id);
    const input = {
      _id: id,
      nitku: req.body.nitku || singleData[arrayNum].nitku,
      jenis_tku: req.body.jenis_tku || singleData[arrayNum].jenis_tku,
      nama_tku: req.body.nama_tku || singleData[arrayNum].nama_tku,
      deskripsi_tku:
        req.body.deskripsi_tku || singleData[arrayNum].deskripsi_tku,
      klu_tku: req.body.klu_tku || singleData[arrayNum].klu_tku,
      deskripsi_klu_tku:
        req.body.deskripsi_klu_tku || singleData[arrayNum].deskripsi_klu_tku,
      pic_tku: req.body.pic_tku || singleData[arrayNum].pic_tku,
      alamat: req.body.alamat || singleData[arrayNum].alamat,
      rt: req.body.rt || singleData[arrayNum].rt,
      rw: req.body.rw || singleData[arrayNum].rw,
      provinsi: req.body.provinsi || singleData[arrayNum].provinsi,
      kabupaten: req.body.kabupaten || singleData[arrayNum].kabupaten,
      kecamatan: req.body.kecamatan || singleData[arrayNum].kecamatan,
      desa: req.body.desa || singleData[arrayNum].desa,
      kode_kpp: req.body.kode_kpp || singleData[arrayNum].kode_kpp,
      kode_wilayah: req.body.kode_wilayah || singleData[arrayNum].kode_wilayah,
      kode_pos: req.body.kode_pos || singleData[arrayNum].kode_pos,
      data_geometrik:
        req.body.data_geometrik || singleData[arrayNum].data_geometrik,
      seksi_pengawasan:
        req.body.seksi_pengawasan || singleData[arrayNum].seksi_pengawasan,
      lokasi_disewa:
        req.body.lokasi_disewa || singleData[arrayNum].lokasi_disewa,
      identitas_pemilik:
        req.body.identitas_pemilik || singleData[arrayNum].identitas_pemilik,
      nama_pemilik: req.body.nama_pemilik || singleData[arrayNum].nama_pemilik,
      tanggal_awal_sewa:
        req.body.tanggal_awal_sewa || singleData[arrayNum].tanggal_awal_sewa,
      tanggal_akhir_sewa:
        req.body.tanggal_akhir_sewa || singleData[arrayNum].tanggal_akhir_sewa,
      tanggal_mulai:
        req.body.tanggal_mulai || singleData[arrayNum].tanggal_mulai,
      tanggal_berakhir:
        req.body.tanggal_berakhir || singleData[arrayNum].tanggal_berakhir,
      toko_retail: req.body.toko_retail || singleData[arrayNum].toko_retail,
      kawasan_bebas:
        req.body.kawasan_bebas || singleData[arrayNum].kawasan_bebas,
      kawasan_ekonomi_khusus:
        req.body.kawasan_ekonomi_khusus ||
        singleData[arrayNum].kawasan_ekonomi_khusus,
      tempat_penimbunan_berikat:
        req.body.tempat_penimbunan_berikat ||
        singleData[arrayNum].tempat_penimbunan_berikat,
      nomor_surat: req.body.nomor_surat || singleData[arrayNum].nomor_surat,
      tanggal_awal_keputusan:
        req.body.tanggal_awal_keputusan ||
        singleData[arrayNum].tanggal_awal_keputusan,
      tanggal_akhir_keputusan:
        req.body.tanggal_akhir_keputusan ||
        singleData[arrayNum].tanggal_akhir_keputusan,
      kantor_virtual:
        req.body.kantor_virtual || singleData[arrayNum].kantor_virtual,
      alamat_utama_pkp:
        req.body.alamat_utama_pkp || singleData[arrayNum].alamat_utama_pkp,
    };
    const validation = new TKU(input);

    if (validation.errors) {
      return badRequest({ message: validation.errors.join(", ") });
    }

    singleData[arrayNum] = validation;
    return await wrapper.update(clientId, {
      tempat_kegiatan_usaha: singleData,
    });
  } catch (err) {
    console.log("Update TKU client error:", err);
    return error({
      message:
        "An error occurred while the system was running, Refresh your page!",
    });
  }
}
