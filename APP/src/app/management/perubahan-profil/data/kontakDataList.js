import { dateShort } from "@/components/custom/DateFormatted";

export const dataKontak = (kontakState) => {
  var data = [];

  var tanggalBerakhir = "",
    tanggalMulai = "",
    jenisKontakName = "";

  if (kontakState.length > 0) {
    kontakState.map((item) => {
      jenisKontakName =
        item.jenis_kontak === 1
          ? "Kontak Alternatif Wajib Pajak"
          : "Kontak Teknis Wajib Pajak";

      tanggalBerakhir =
        dateShort(item.tanggal_berakhir) === "Invalid Date"
          ? ""
          : dateShort(item.tanggal_berakhir);

      tanggalMulai =
        dateShort(item.tanggal_mulai) === "Invalid Date"
          ? ""
          : dateShort(item.tanggal_mulai);

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
  return data;
};

export const jenisKontakOption = [
  { code: 1, name: "Kontak Alternatif Wajib Pajak" },
  { code: 2, name: "Kontak Teknis Wajib Pajak" },
];
