import { badRequest, error } from "../../../app/response.js";
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
    console.log("body:", req.body);
    const singleData = getData.data[0];

    const input = {
      _id: req.body._id ?? singleData._id,
      negara_asal: req.body.negara_asal ?? singleData.negara_asal,
      company_name: req.body.company_name ?? singleData.company_name,
      company_npwp: req.body.company_npwp ?? singleData.company_npwp,
      kegiatan_utama: req.body.kegiatan_utama ?? singleData.kegiatan_utama,
      jenis_wp: req.body.jenis_wp ?? singleData.jenis_wp,
      bentuk_badan_hukum:
        req.body.bentuk_badan_hukum ?? singleData.bentuk_badan_hukum,
      nomor_keputusan_pengesahan:
        req.body.nomor_keputusan_pengesahan ??
        singleData.nomor_keputusan_pengesahan,
      tanggal_keputusan_pengesahan:
        req.body.tanggal_keputusan_pengesahan ??
        singleData.tanggal_keputusan_pengesahan,
      nomor_keputusan_pengesahan_perubahan:
        req.body.nomor_keputusan_pengesahan_perubahan ??
        singleData.nomor_keputusan_pengesahan_perubahan,
      tanggal_keputusan_pengesahan_perubahan:
        req.body.tanggal_keputusan_pengesahan_perubahan ??
        singleData.tanggal_keputusan_pengesahan_perubahan,
      nomor_akta_pendirian:
        req.body.nomor_akta_pendirian ?? singleData.nomor_akta_pendirian,
      tempat_pendirian:
        req.body.tempat_pendirian ?? singleData.tempat_pendirian,
      tanggal_pendirian:
        req.body.tanggal_pendirian ?? singleData.tanggal_pendirian,
      nik_notaris: req.body.nik_notaris ?? singleData.nik_notaris,
      nama_notaris: req.body.nama_notaris ?? singleData.nama_notaris,
      jenis_perusahaan:
        req.body.jenis_perusahaan ?? singleData.jenis_perusahaan,
      modal_dasar: req.body.modal_dasar ?? singleData.modal_dasar,
      modal_ditempatkan:
        req.body.modal_ditempatkan ?? singleData.modal_ditempatkan,
      modal_disetor: req.body.modal_disetor ?? singleData.modal_disetor,
      kewarganegaraan: req.body.kewarganegaraan ?? singleData.kewarganegaraan,
      bahasa: req.body.bahasa ?? singleData.bahasa,

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
    };

    const masterClient = new MasterClient(input);
    if (masterClient.errors) {
      return badRequest({ message: masterClient.errors.join(", ") });
    }

    return await wrapper.update(req.params.id, masterClient);
  } catch (err) {
    console.log("err updating client:", error);
    return error({ message: "An error occurred while the system was running" });
  }
}
