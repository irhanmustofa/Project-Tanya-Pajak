import Response, { badRequest } from "../../../app/response.js";
import MongodbWrapper from "../../../database/mongo/mongo.wrapper.js";
import MasterClient from "../master-client.entities.js";
import { masterClientSchema } from "../master-client.schema.js";

export default async function updateClient(req) {
  try {
    const wrapper = new MongodbWrapper(masterClientSchema());
    const getData = await wrapper.getByFilter({ _id: req.params.id });
    if (!getData.success) {
      return badRequest({ message: getData.message });
    }

    const singleData = getData.data[0];
    const input = {
      _id: req.body._id ?? singleData._id,
      company_name: req.body.company_name ?? singleData.company_name,
      company_npwp: req.body.company_npwp ?? singleData.company_npwp,
      kegiatan_utama: req.body.kegiatan_utama ?? singleData.kegiatan_utama,
      jenis_wp: req.body.jenis_wp ?? singleData.jenis_wp,
      bentuk_badan_hukum:
        req.body.bentuk_badan_hukum ?? singleData.bentuk_badan_hukum,
      status_npwp: req.body.status_npwp ?? singleData.status_npwp,
      status_pkp: req.body.status_pkp ?? singleData.status_pkp,
      tanggal_pengukuhan_pkp:
        req.body.tanggal_pengukuhan_pkp ?? singleData.tanggal_pengukuhan_pkp,
      kantor_wilayah_djp:
        req.body.kantor_wilayah_djp ?? singleData.kantor_wilayah_djp,
      kantor_pelayanan_pajak:
        req.body.kantor_pelayanan_pajak ?? singleData.kantor_pelayanan_pajak,
      seksi_pengawasan:
        req.body.seksi_pengawasan ?? singleData.seksi_pengawasan,
      kode_klu: req.body.kode_klu ?? singleData.kode_klu,
      deskripsi_klu: req.body.deskripsi_klu ?? singleData.deskripsi_klu,
      alamat: req.body.alamat ?? singleData.alamat,
      kontak: req.body.kontak ?? singleData.kontak,
    };
    console.log(input);
    const masterClient = new MasterClient(input);

    if (masterClient.errors) {
      return badRequest({ message: masterClient.errors.join(", ") });
    }
    // return badRequest({ message: "waduhh" });
    return await wrapper.update(req.params.id, masterClient);
  } catch (error) {
    console.log("Error updating client:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
