import {
  LucideCircleCheckBig,
  LucideCircleMinus,
  LucideCircleDot,
} from "lucide-react";

export const serviceDivision = [
  { code: 0, name: "Tax" },
  { code: 1, name: "Accounting" },
  { code: 2, name: "Legal" },
];

export const serviceType = [
  { code: 0, name: "Single" },
  { code: 1, name: "Packages" },
];

export const jobStatus = [
  { code: 0, name: "Pending", icon: LucideCircleMinus },
  { code: 1, name: "In Progress", icon: LucideCircleDot },
  { code: 2, name: "Completed", icon: LucideCircleCheckBig },
];

export const serviceUnit = [
  { code: 0, name: "Monthly" },
  { code: 1, name: "Yearly" },
  { code: 2, name: "Hourly" },
  { code: 3, name: "Pax" },
];

export const statusType = [
  { code: 0, name: "Inactive", icon: LucideCircleMinus },
  { code: 1, name: "Active", icon: LucideCircleCheckBig },
];

export const userLevel = [
  { code: 0, name: "Super Admin" },
  { code: 1, name: "Admin" },
  { code: 2, name: "User" },
];

export const roles = [
  { code: 0, name: "Super Admin" },
  { code: 1, name: "Admin" },
  { code: 2, name: "User" },
];

export const clientType = [
  { code: 0, name: "Individual", description: "Client Individual" },
  { code: 1, name: "Company", description: "Client Company" },
];

export const sptTarifCit = [
  "Select Option",
  "SPT TAHUN SEBELUMNYA",
  "SPT TAHUN BERJALAN",
  "SPT TAHUN BERIKUTNYA",
];

export const tarifPph = [
  {
    code: 0,
    name: "PPH PS-31E",
  },
  {
    code: 1,
    name: "PPH PS-17",
  },
  {
    code: 2,
    name: "FINAL",
  },
];

export const masterAsset = [
  { code: 0, name: "Master Asset", url: "asset" },
];

export const masterBuku = [
  { code: 0, name: "Saldo Awal", url: "saldo-awal" },
  { code: 1, name: "Kas IDR", url: "kas-idr" },
  { code: 2, name: "Bank IDR", url: "bank-idr" },
  { code: 3, name: "Kas Valas", url: "kas-valas" },
  { code: 4, name: "Bank Valas", url: "bank-valas" },
  { code: 5, name: "Pembelian Lokal", url: "pembelian-lokal" },
  { code: 6, name: "Pembelian Impor", url: "pembelian-impor" },
  { code: 7, name: "Penjualan Lokal", url: "penjualan-lokal" },
  { code: 8, name: "Penjualan Ekspor", url: "penjualan-ekspor" },
  { code: 9, name: "Jurnal Umum", url: "jurnal-umum" },
];

export const masterReport = [
  { code: 0, name: "Buku Besar", url: "buku-besar" },
  { code: 1, name: "Neraca", url: "neraca" },
  { code: 2, name: "Laba Rugi", url: "laba-rugi" },
  { code: 3, name: "Arus Kas", url: "arus-kas" },
  { code: 4, name: "Arus Bank", url: "arus-bank" },
];
export const masterProses = [
  { code: 0, name: "Amortisasi", url: "amortisasi" },
  { code: 1, name: "P A B", url: "pab" },
  { code: 2, name: "P A T", url: "pat" },
];

export const coaHead = [
  { nama_head: "Kas dan Setara Kas", kode_head: "1101" },
  { nama_head: "Piutang Usaha - Pihak Ketiga", kode_head: "1122" },
  {
    nama_head: "Piutang Usaha - Pihak yang Mempunyai Hubungan Istimewa",
    kode_head: "1123",
  },
  { nama_head: "Piutang Lainnya - Pihak Ketiga", kode_head: "1124" },
  {
    nama_head: "Piutang Lainnya - Pihak yang Mempunyai Hubungan Istimewa",
    kode_head: "1125",
  },
  {
    nama_head: "Cadangan Kerugian Penurunan Nilai - Aset Lancar",
    kode_head: "1131",
  },
  { nama_head: "Aset Kontrak", kode_head: "1181" },
  { nama_head: "Investasi", kode_head: "1200" },
  { nama_head: "Persediaan", kode_head: "1401" },
  { nama_head: "Beban Dibayar di Muka", kode_head: "1421" },
  { nama_head: "Uang Muka", kode_head: "1422" },
  { nama_head: "Pajak Dibayar di Muka", kode_head: "1423" },
  { nama_head: "Aset yang Dimiliki Untuk Dijual", kode_head: "1405" },
  { nama_head: "Aset lancar lainnya", kode_head: "1499" },
  { nama_head: "Piutang Jangka Panjang", kode_head: "1501" },
  { nama_head: "Properti Investasi", kode_head: "1520" },
  { nama_head: "Tanah dan Bangunan", kode_head: "1523" },
  {
    nama_head: "Dikurangi : Akumulasi Penyusutan-Tanah dan Bangunan",
    kode_head: "1524",
  },
  { nama_head: "Aset Tetap Lainnya", kode_head: "1529" },
  {
    nama_head: "Dikurangi : Akumulasi Penyusutan-Aset Tetap Lainnya",
    kode_head: "1530",
  },
  { nama_head: "Aset Biologis", kode_head: "1531" },
  { nama_head: "Aset Hak Guna", kode_head: "1533" },
  {
    nama_head: "Dikurangi: Akumulasi Penyusutan - Aset Hak Guna",
    kode_head: "1534",
  },
  {
    nama_head:
      "Investasi pada Perusahaan Asosiasi, Ventura Bersama dan Anak Perusahaan",
    kode_head: "1551",
  },
  { nama_head: "Investasi Jangka Panjang Lainnya", kode_head: "1599" },
  { nama_head: "Aset Tak Berwujud - Net", kode_head: "1600" },
  {
    nama_head: "Dikurangi : Akumulasi Amortisasi-Aset Tak Berwujud",
    kode_head: "1601",
  },
  { nama_head: "Aset Pajak Tangguhan", kode_head: "1611" },
  { nama_head: "Klaim atas pengembalian pajak", kode_head: "1651" },
  {
    nama_head: "Cadangan Kerugian Penurunan Nilai - Aset Lancar",
    kode_head: "1658",
  },
  { nama_head: "Aset Tidak Lancar Lainnya", kode_head: "1698" },
  { nama_head: "Utang Usaha - Pihak Ketiga", kode_head: "2102" },
  {
    nama_head: "Utang Usaha - Pihak yang Mempunyai Hubungan Istimewa",
    kode_head: "2103",
  },
  { nama_head: "Utang Bunga", kode_head: "2111" },
  { nama_head: "Liabilitas Kontrak", kode_head: "2186" },
  { nama_head: "Liabilitas Sewa Jangka Pendek", kode_head: "2187" },
  { nama_head: "Utang Pajak", kode_head: "2191" },
  { nama_head: "Utang Dividen", kode_head: "2192" },
  { nama_head: "Beban yang Masih Harus Dibayar", kode_head: "2195" },
  { nama_head: "Utang Bank Jangka Pendek", kode_head: "2201" },
  {
    nama_head: "Utang Jangka Panjang yang Jatuh Tempo dalam Satu Tahun",
    kode_head: "2202",
  },
  { nama_head: "Uang Muka", kode_head: "2203" },
  { nama_head: "Liabilitas Jangka Pendek Lainnya", kode_head: "2228" },
  { nama_head: "Utang lancar Lainnya", kode_head: "2301" },
  { nama_head: "Utang Bank Jangka Panjang", kode_head: "2303" },
  { nama_head: "Utang Jangka Panjang-Pihak Ketiga", kode_head: "2304" },
  {
    nama_head: "Utang Jangka Panjang - Pihak yang Mempunyai Hubungan Istimewa",
    kode_head: "2312",
  },
  { nama_head: "Liabilitas Imbalan Kerja", kode_head: "2322" },
  { nama_head: "Liabilitas Pajak Tangguhan", kode_head: "2321" },
  { nama_head: "Liabilitas Jangka Panjang Lainnya", kode_head: "2998" },
  { nama_head: "Modal Saham", kode_head: "3102" },
  { nama_head: "Tambahan Modal Disetor", kode_head: "3120" },
  { nama_head: "Saldo Laba", kode_head: "3200" },
  { nama_head: "Pendapatan Komprehensif Lainnya", kode_head: "3297" },
  { nama_head: "Ekuitas Lainnya", kode_head: "3298" },
  { nama_head: "Penjualan Ekspor", kode_head: "4003" },
  { nama_head: "Penjualan Domestik", kode_head: "4002" },
  { nama_head: "Retur", kode_head: "4011" },
  { nama_head: "Potongan Penjualan", kode_head: "4012" },
  { nama_head: "Penyesuaian Penjualan", kode_head: "4013" },
  { nama_head: "Pendapatan Usaha Lainnya", kode_head: "4199" },
  { nama_head: "Pembelian Barang Dagang", kode_head: "5001" },
  { nama_head: "Beban Pengangkutan", kode_head: "5003" },
  { nama_head: "Beban Lainnya", kode_head: "5007" },
  { nama_head: "Persediaan - Awal", kode_head: "5008" },
  { nama_head: "Dikurangi: Persediaan - Akhir", kode_head: "5009" },
  {
    nama_head: "Gaji, Upah, Bonus, Gratifikasi, Honorarium, Thr, Dsb",
    kode_head: "5311",
  },
  { nama_head: "Beban imbalan kerja lainnya", kode_head: "5312" },
  { nama_head: "Beban Transportasi", kode_head: "5313" },
  { nama_head: "Beban Penyusutan dan Amortisasi", kode_head: "5314" },
  { nama_head: "Beban Sewa", kode_head: "5315" },
  { nama_head: "Beban Bunga", kode_head: "5316" },
  { nama_head: "Beban Sehubungan dengan Jasa", kode_head: "5317" },
  { nama_head: "Beban Promosi/Pemasaran", kode_head: "5320" },
  { nama_head: "Beban Entertainment", kode_head: "5321" },
  { nama_head: "Beban Umum dan Administrasi", kode_head: "5322" },
  { nama_head: "Beban Usaha Lainnya", kode_head: "5399" },
  { nama_head: "Keuntungan Selisih Kurs", kode_head: "4501" },
  {
    nama_head: "Keuntungan Penjualan Aset selain Persediaan",
    kode_head: "4503",
  },
  { nama_head: "Pendapatan Bunga", kode_head: "4511" },
  { nama_head: "Pendapatan Non Usaha Lainnya", kode_head: "4599" },
  { nama_head: "Kerugian Penjualan Aset selain Persediaan", kode_head: "5405" },
  { nama_head: "Sumbangan", kode_head: "5409" },
  { nama_head: "Kerugian Selisih Kurs", kode_head: "5421" },
  { nama_head: "Beban Non Usaha Lainnya", kode_head: "5499" },
  { nama_head: "Pajak Penghasilan", kode_head: "9000" },
];

export const jenisAsset = [
  { id: 1, jenis_asset: "Aset Lancar" },
  { id: 2, jenis_asset: "Aset Tidak Lancar" },
  { id: 3, jenis_asset: "Liabilitas Jangka Pendek" },
  { id: 4, jenis_asset: "Liabilitas Jangka Panjang" },
  { id: 5, jenis_asset: "Ekuitas" },
  { id: 6, jenis_asset: "Penjualan" },
  { id: 7, jenis_asset: "Harga Pokok Penjualan (HPP)" },
  { id: 8, jenis_asset: "Beban Usaha" },
  { id: 9, jenis_asset: "Pendapatan Non Usaha" },
  { id: 10, jenis_asset: "Beban Non Usaha" },
  { id: 11, jenis_asset: "Pajak Penghasilan" },
];

export const coaGroup = [
  { id: 1, nama_group: "HARTA", kode_group: "1000" },
  { id: 2, nama_group: "KEWAJIBAN", kode_group: "2000" },
  { id: 3, nama_group: "MODAL", kode_group: "3000" },
  { id: 4, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "4000" },
  { id: 5, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "5000" },
  { id: 6, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "6000" },
  { id: 7, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "7000" },
  { id: 8, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "8000" },
  { id: 9, nama_group: "Laba (Rugi) Setelah Pajak", kode_group: "9000" },
];
