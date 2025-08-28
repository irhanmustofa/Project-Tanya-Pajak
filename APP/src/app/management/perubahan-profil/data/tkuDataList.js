import { useClient } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";

export const dataTku = () => {
  const { clientState } = useClient();
  var data = [];

  if (!clientState.success) {
    const singleData = clientState.data[0].tempat_kegiatan_usaha;
    if (singleData.length !== undefined && singleData.length > 0) {
      data.push({
        _id: Item._id,
        nitku: Item.nitku,
        jenis_tku: Item.jenis_tku,
        nama_tku: Item.nama_tku,
        deskripsi_tku: Item.deskripsi_tku,
        klu_tku: Item.klu_tku,
        deskripsi_klu_tku: Item.deskripsi_klu_tku,
        alamat: Item.alamat,
        rt: Item.rt,
        rw: Item.rw,
        provinsi: Item.provinsi,
        kabupaten: Item.kabupaten,
        kecamatan: Item.kecamatan,
        desa: Item.desa,
        kode_kpp: Item.kode_kpp,
        kode_wilayah: Item.kode_wilayah,
        kode_pos: Item.kode_pos,
        data_geometrik: Item.data_geometrik,
        seksi_pengawasan: Item.seksi_pengawasan,
        lokasi_disewa: Item.lokasi_disewa,
        identitas_pemilik: Item.identitas_pemilik,
        nama_pemilik: Item.nama_pemilik,
        tanggal_mulai_sewa: Item.tanggal_mulai_sewa,
        tanggal_sewa_berakhir: Item.tanggal_sewa_berakhir,
        tanggal_mulai: Item.tanggal_mulai,
        tanggal_berakhir: Item.tanggal_berakhir,
        toko_retail: Item.toko_retail,
        kawasan_bebas: Item.kawasan_bebas,
        kawasan_ekonomi_khusus: Item.kawasan_ekonomi_khusus,
        tempat_penimbunan_berikat: Item.tempat_penimbunan_berikat,
        nomor_surat: Item.nomor_surat,
        tanggal_mulai_keputusan: Item.tanggal_mulai_keputusan,
        tanggal_keputusan_berakhir: Item.tanggal_keputusan_berakhir,
        kantor_virtual: Item.kantor_virtual,
        alamat_utama_pkp: Item.alamat_utama_pkp,
      });
    }
  }

  return data;
};
