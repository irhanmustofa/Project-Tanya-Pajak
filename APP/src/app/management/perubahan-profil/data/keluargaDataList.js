import { dateShort } from "@/components/custom/DateFormatted";

export default function keluargaDataStructure(keluargaState) {
  var data = [],
    ptkp = "",
    unit_pajak = "",
    hubungan_keluarga = "";

  if (keluargaState.length > 0) {
    const kodePtkp = statusPtkp.map((item) => item.code);
    const kodeUnitPajak = statusUnitPerpajakanOption.map((item) => item.code);
    const kodeHubunganKeluarga = hubunganKeluargaOption.map(
      (item) => item.code
    );

    keluargaState.map((item) => {
      ptkp = unit_pajak = hubungan_keluarga = "";
      if (kodePtkp.indexOf(item.status_ptkp) > -1) {
        ptkp = statusPtkpOption[kodePtkp.indexOf(item.status_ptkp)].name;
      }

      if (kodeUnitPajak.indexOf(item.status_unit_pajak) > -1) {
        unit_pajak =
          statusUnitPerpajakanOption[
            kodeUnitPajak.indexOf(item.status_unit_pajak)
          ].name;
      }

      if (kodeHubunganKeluarga.indexOf(item.status_keluarga) > -1) {
        hubungan_keluarga =
          hubunganKeluargaOption[
            kodeHubunganKeluarga.indexOf(item.status_keluarga)
          ].name;
      }

      data.push({
        _id: item._id,
        nik: item.nik,
        jenis_kelamin: item.jenis_kelamin === 1 ? "Laki Laki" : "Perempuan",
        tempat_lahir: item.tempat_lahir,
        tanggal_lahir:
          dateShort(item.tanggal_lahir) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_lahir),
        nomor_kk: item.nomor_kk,
        nama: item.nama,
        status_keluarga: hubungan_keluarga,
        pekerjaan: item.pekerjaan,
        status_unit_pajak: unit_pajak,
        status_ptkp: ptkp,
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

export const statusPtkpOption = [
  { code: "0", name: "-" },
  { code: "SP-1", name: "K/0" },
  { code: "SP-2", name: "K/1" },
  { code: "SP-3", name: "K/2" },
  { code: "SP-4", name: "K/3" },
  { code: "SP-5", name: "TK/0" },
  { code: "SP-6", name: "TK/1" },
  { code: "SP-7", name: "TK/2" },
  { code: "SP-8", name: "TK/3" },
];

export const statusUnitPerpajakanOption = [
  { code: "SUP-1", name: "Tanggungan" },
  { code: "SUP-2", name: "Kepala Unit Keluarga Lain (HB)" },
  { code: "SUP-3", name: "Kepala Unit Keluarga lain (OP)" },
  { code: "SUP-4", name: "Kepala Unit Keluarga lain" },
  { code: "SUP-5", name: "Kepala Unit Keluarga lain (MT)" },
  { code: "SUP-6", name: "Bukan Tanggungan" },
  { code: "SUP-7", name: "Kepala Unit Keluarga lain (PH)" },
];

export const hubunganKeluargaOption = [
  { code: "HK-1", name: "Anak" },
  { code: "HK-2", name: "Cucu" },
  { code: "HK-3", name: "Kepala Keluarga" },
  { code: "HK-4", name: "Suami" },
  { code: "HK-5", name: "Istri" },
  { code: "HK-6", name: "Mertua" },
  { code: "HK-7", name: "Menantu" },
  { code: "HK-8", name: "Pembantu" },
  { code: "HK-9", name: "Family Lain" },
  { code: "HK-10", name: "Orang Tua" },
  { code: "HK-11", name: "Lainnya" },
];
