import { useClient } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";

export const dataTku = () => {
  const { clientState } = useClient();
  var data = [];

  if (clientState.success) {
    const singleData = clientState.data[0].tempat_kegiatan_usaha;
    if (singleData.length !== undefined && singleData.length > 0) {
      singleData.map((item) => {
        data.push({
          _id: item._id,
          nitku: item.nitku,
          jenis_tku: item.jenis_tku,
          nama_tku: item.nama_tku,
          deskripsi_tku: item.deskripsi_tku,
          klu_tku: item.klu_tku,
          deskripsi_klu_tku: item.deskripsi_klu_tku,
          pic_tku: item.pic_tku,
          alamat: item.alamat,
          rt: item.rt,
          rw: item.rw,
          provinsi: item.provinsi,
          kabupaten: item.kabupaten,
          kecamatan: item.kecamatan,
          desa: item.desa,
          kode_kpp: item.kode_kpp,
          kode_wilayah: item.kode_wilayah,
          kode_pos: item.kode_pos,
          data_geometrik: item.data_geometrik,
          seksi_pengawasan: item.seksi_pengawasan,
          lokasi_disewa: item.lokasi_disewa,
          identitas_pemilik: item.identitas_pemilik,
          nama_pemilik: item.nama_pemilik,
          tanggal_awal_sewa: item.tanggal_awal_sewa,
          tanggal_akhir_sewa: item.tanggal_akhir_sewa,
          tanggal_mulai: item.tanggal_mulai,
          tanggal_berakhir: item.tanggal_berakhir,
          toko_retail: item.toko_retail,
          kawasan_bebas: item.kawasan_bebas,
          kawasan_ekonomi_khusus: item.kawasan_ekonomi_khusus,
          tempat_penimbunan_berikat: item.tempat_penimbunan_berikat,
          nomor_surat: item.nomor_surat,
          tanggal_awal_keputusan: item.tanggal_awal_keputusan,
          tanggal_akhir_keputusan: item.tanggal_akhir_keputusan,
          kantor_virtual: item.kantor_virtual,
          alamat_utama_pkp: item.alamat_utama_pkp,
        });
      });
    }
  }

  return data;
};
