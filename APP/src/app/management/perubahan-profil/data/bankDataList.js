import { dateShort } from "@/components/custom/DateFormatted";

export default function bankDataStructure(bankState) {
  var data = [],
    jenisRekeningName = "";
  if (bankState.length > 0) {
    const jenisRekeningCode = jenisRekening.map((item) => item.code);
    bankState.map((item) => {
      jenisRekeningName = "";
      if (jenisRekeningCode.indexOf(item.jenis_rekening) > -1) {
        jenisRekeningName =
          jenisRekening[jenisRekeningCode.indexOf(item.jenis_rekening)].name;
      }

      data.push({
        _id: item._id,
        nama_bank: item.nama_bank,
        nomor_rekening: item.nomor_rekening,
        jenis_rekening: jenisRekeningName,
        nama_pemilik_rekening: item.nama_pemilik_rekening,
        tanggal_mulai:
          dateShort(item.tanggal_mulai) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_mulai),
        tanggal_berakhir:
          dateShort(item.tanggal_berakhir) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_berakhir),
      });
    });
  }

  return data;
}

export const jenisRekening = [
  { code: "JR-1", name: "Akun Pribadi" },
  { code: "JR-2", name: "Akun Badan" },
];
