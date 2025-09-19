import { dateShort } from "@/components/custom/DateFormatted";

export default function NomorEksternalDataStructure(dataState) {
  var data = [];
  var tipeName = "";
  const tipeCode = jenisNomorIdentifikasi.map((item) => item.code);

  if (dataState.length > 0) {
    dataState.map((item) => {
      tipeName = "";
      if (tipeCode.indexOf(item.tipe) > -1) {
        tipeName = jenisNomorIdentifikasi[tipeCode.indexOf(item.tipe)].name;
      }

      data.push({
        _id: item._id,
        tipe: tipeName,
        nomor_identifikasi: item.nomor_identifikasi,
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

export const jenisNomorIdentifikasi = [
  { code: "JNI-1", name: "NIK" },
  { code: "JNI-2", name: "Nomor Paspor" },
  { code: "JNI-3", name: "KITAS / KITAP" },
  { code: "JNI-4", name: "SK Pengesahan" },
  { code: "JNI-5", name: "Kode Satuan Kerja (pusat)" },
  { code: "JNI-6", name: "Kode Satuan Kerja (daerah)" },
  { code: "JNI-7", name: "Nomor Identifikasi Sementara" },
  { code: "JNI-8", name: "Lainnya" },
  { code: "JNI-9", name: "TIN Negara Asal" },
  { code: "JNI-10", name: "NPWP 15 Digit" },
  { code: "JNI-11", name: "Nomor Kartu Keluarga" },
  { code: "JNI-12", name: "Nomor Surat Izin Mengemudi" },
  { code: "JNI-13", name: "Nomor Identitas Aparatur Sipil Negara" },
  { code: "JNI-14", name: "Nomor Identias Pegawai Swasta" },
  { code: "JNI-15", name: "Kode Otoritas DJP" },
  { code: "JNI-16", name: "Privy ID" },
  { code: "JNI-17", name: "TekenAja" },
  { code: "JNI-18", name: "Peruri" },
  { code: "JNI-19", name: "Vida" },
  { code: "JNI-20", name: "BSSN" },
  { code: "JNI-21", name: "BRIN" },
  { code: "JNI-22", name: "NIORA" },
];
