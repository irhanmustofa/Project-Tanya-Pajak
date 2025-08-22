import { useClient } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { dateShort } from "@/components/custom/DateFormatted";

export const dataKontak = () => {
  var data = [];
  var jenisKontakName = "";
  const { clientState } = useClient();
  const kodeJenisKontak = jenisKontak.map((item) => item.kode);
  var tanggalBerakhir = "",
    tanggalMulai = "";

  if (clientState.success) {
    if (clientState.data[0].data_kontak.length > 0) {
      clientState.data[0].data_kontak.map((item) => {
        jenisKontakName = "";
        tanggalBerakhir =
          dateShort(item.tanggal_berakhir) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_berakhir);
        tanggalMulai =
          dateShort(item.tanggal_mulai) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_mulai);

        if (kodeJenisKontak.indexOf(item.jenis_kontak) > -1) {
          jenisKontakName =
            jenisKontak[kodeJenisKontak.indexOf(item.jenis_kontak)].name;
        }

        data.push({
          _id: item._id,
          jenis_kontak: jenisKontakName,
          nomor_telepon: item.nomor_telepon,
          nomor_handphone: item.nomor_handphone,
          nomor_faksimile: item.nomor_faksimile,
          email: item.email,
          keterangan: item.keterangan,
          website: item.website,
          tanggal_mulai: tanggalMulai,
          tanggal_berakhir: tanggalBerakhir,
        });
      });
    }
  }
  return data;
};

export const jenisKontak = [
  { kode: "jk-1", name: "Kontak Alternatif Wajib Pajak" },
  { kode: "jk-2", name: "Kontak Teknis Wajib Pajak" },
];
