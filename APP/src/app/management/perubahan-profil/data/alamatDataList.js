import { useClient } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { countryList } from "./country";
export const dataAlamat = () => {
  var negara,
    kpp,
    pengawas = "";
  var data = [];
  const { clientState } = useClient();

  const kodeNegara = countryList.map((item) => item.kode);
  const kodeKPP = kppOption.map((item) => item.kode);
  const kodePengawas = pengawasOption.map((item) => item.kode);

  if (clientState.success) {
    if (clientState.data[0].alamat.length > 0) {
      clientState.data[0].alamat.map((item) => {
        negara = kpp = pengawas = "";
        if (kodeNegara.indexOf(item.negara) > -1) {
          negara = countryList[kodeNegara.indexOf(item.negara)].name;
        }

        if (kodeKPP.indexOf(item.kode_kpp) > -1) {
          kpp = kppOption[kodeKPP.indexOf(item.kode_kpp)].name;
        }

        if (kodePengawas.indexOf(item.bagian_pengawasan) > -1) {
          pengawas =
            pengawasOption[kodePengawas.indexOf(item.bagian_pengawasan)].name;
        }

        data.push({
          _id: item._id,
          negara: negara,
          jenis_alamat: item.negara,
          alamat: item.alamat,
          rt: item.rt,
          rw: item.rw,
          provinsi: item.provinsi,
          kabupaten: item.kabupaten,
          kecamatan: item.kecamatan,
          desa: item.desa,
          kode_area: item.kode_area,
          kode_pos: item.kode_pos,
          data_geometrik: item.data_geometrik,
          disewa: item.disewa,
          identitas_pemilik: item.identitas_pemilik,
          nama_pemilik: item.nama_pemilik,
          tanggal_mulai_sewa: item.tanggal_mulai_sewa,
          tanggal_sewa_berakhir: item.tanggal_sewa_berakhir,
          tanggal_mulai: item.tanggal_mulai,
          tanggal_berakhir: item.tanggal_berakhir,
          kode_kpp: kpp,
          bagian_pengawasan: pengawas,
        });
      });
    }
  }

  return data;
};

export const kppOption = [
  { kode: "1", name: "KPP Pratama Jakarta Matraman (001)" },
  { kode: "2", name: "KPP Pratama Jakarta Pulogadung (003)" },
  { kode: "3", name: "KPP Pratama Jakarta Cakung Satu (004)" },
  { kode: "4", name: "KPP Pratama Jakarta Kramat Jati (005)" },
  { kode: "5", name: "KPP Pratama Jakarta Cakung Dua (006)" },
  { kode: "6", name: "KPP Pratama Jakarta Duren Sawit (008)" },
  { kode: "7", name: "KPP Pratama Jakarta Pasar Rebo (009)" },
];

export const jenisAlamat = [
  { jenis: "Alamat Korespondensi", kode: "JA-1" },
  { jenis: "Alamat Lokasi Aset", kode: "JA-2" },
  { jenis: "Alamat Sesuai E-KTP", kode: "JA-3" },
  { jenis: "Alamat Tempat Kegiatan Usaha", kode: "JA-4" },
];

export const pengawasOption = [
  { kode: "BP-01", name: "Bagian Pengawas I" },
  { kode: "BP-02", name: "Bagian Pengawas II" },
  { kode: "BP-03", name: "Bagian Pengawas III" },
  { kode: "BP-04", name: "Bagian Pengawas IV" },
  { kode: "BP-05", name: "Bagian Pengawas V" },
];
