import { dateShort } from "@/components/custom/DateFormatted";

export default function bankDataStructure(bankState) {
  var data = [],
    jenisRekeningName = "";

  if (bankState.length > 0) {
    const jenisRekeningCode = jenisRekeningOption.map((item) => item.code);
    bankState.map((item) => {
      jenisRekeningName =
        item.jenis_rekening === 1 ? "Akun Pribadi" : "Akun Badan";

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

export const jenisRekeningOption = [
  { code: 1, name: "Akun Pribadi" },
  { code: 2, name: "Akun Badan" },
];
