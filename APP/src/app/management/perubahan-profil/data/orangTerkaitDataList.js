import { useClient } from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import { dateShort } from "@/components/custom/DateFormatted";

export const dataOrangTerkait = () => {
  var data = [];
  const { clientState } = useClient();
  const kodeJenisPihak = jenisPihak.map((item) => item.kode);
  const kodeJenisOT = jenisOrangTerkait.map((item) => item.kode);
  const kodeSubJenisOT = subJenisOrangTerkait.map((item) => item.kode);
  const kodeWN = kewarganegaraanTerkait.map((item) => item.kode);
  const kodeJenisWP = jenisWajibPajakTerkait.map((item) => item.kode);
  const kodeKPM = kriteriaPemilikManfaat.map((item) => item.kode);

  if (clientState.success && clientState?.data.length > 0) {
    const getData = clientState.data[0].orang_terkait;
    if (getData.length > 0) {
      getData.map((item) => {
        data.push({
          _id: item._id,
          jenis_pihak: item.jenis_pihak,
          pic: item.pic,
          jenis_orang_terkait: item.jenis_orang_terkait,
          sub_jenis_orang_terkait: item.sub_jenis_orang_terkait,
          identitas: item.identitas,
          name: item.name,
          nomor_paspor: item.nomor_paspor,
          kewarganegaraan: item.kewarganegaraan,
          negara_asal: item.negara_asal,
          email: item.email,
          nomor_telepon: item.nomor_telepon,
          tanggal_mulai: item.tanggal_mulai,
          tanggal_berakhir: item.tanggal_berakhir,
          jenis_wp: item.jenis_wp,
          keterangan: item.keterangan,
          kriteria_pemilik_manfaat: item.kriteria_pemilik_manfaat,
        });
      });
    }
  }
};

export const jenisPihak = [
  { kode: "jp-1", name: "Related Person" },
  { kode: "jp-2", name: "Related Taxpayer" },
];

export const jenisOrangTerkait = [
  { kode: "jot-1", name: "Direktur" },
  { kode: "jot-2", name: "Komisaris" },
  { kode: "jot-3", name: "Lainnya" },
  { kode: "jot-4", name: "Pemegang Saham" },
  { kode: "jot-5", name: "Wakil" },
];

export const subJenisOrangTerkait = [
  { kode: "sjot-1", name: "Curator" },
  { kode: "sjot-2", name: "Karyawan" },
  { kode: "sjot-3", name: "Liquidator" },
  { kode: "sjot-4", name: "Pemilik Manfaat Lainnya" },
];

export const kewarganegaraanTerkait = [
  { kode: "k-1", name: "Warga Negara Indonesia" },
  { kode: "k-2", name: "Warga Negara Asing" },
];

export const jenisWajibPajakTerkait = [
  { kode: "jwp-1", name: "Grup Perusahaan" },
  { kode: "jwp-2", name: "Lainnya" },
  { kode: "jwp-3", name: "Pemilik Manfaat" },
  { kode: "jwp-4", name: "Penanggng Pajak" },
];

export const kriteriaPemilikManfaat = [
  {
    kode: "kpm-1",
    name: "Memiliki hak suara lebih dari 25% (dua puluh lima persen) pada perseroan terbatas sebagaimana tercantum dalam anggaran dasar",
  },
  {
    kode: "kpm-2",
    name: "Memiliki saham lebih dari 25% (dua puluh lima persen) pada perseroan terbatas sebagaimana tercantum dalam anggaran dasar",
  },
  {
    kode: "kpm-3",
    name: "Menerima keuntungan atau laba lebih dari 25% (dua puluh lima persen) dari keuntungan atau laba yang diperoleh perseroan terbatas per tahun",
  },
  {
    kode: "kpm-4",
    name: "Pihak yang mempunyai kewenangan untuk mengangkat, menggantikan, atau memberhentikan anggota arahan atau anggota dewan komisaris",
  },
  {
    kode: "kpm-5",
    name: "Pihak yang mempunyai kewenangan untuk mengangkat, menggantikan, atau memberhentikan anggota arahan atau anggota dewan komisaris",
  },
  {
    kode: "kpm-6",
    name: "Pihak yang menerima manfaat dari perseoran terbatas",
  },
  {
    kode: "kpm-7",
    name: "Pihak yang merupakan pemilik sebenarnya dari dana atas kepemilikan saham perseroan terbatas",
  },
];
