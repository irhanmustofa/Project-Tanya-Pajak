import {
  LucideFilePen,
  LucideFileDigit,
  LucideFileQuestion,
  LucideFileCheck2,
  LucideFileMinus2,
  LucideCircleCheckBig,
  LucideCircleMinus,
  LucideCircleDot,
  LucideWallet,
  LucideWallet2,
  LucideWalletCards,
  LucideWalletMinimal,
  LucideDollarSign,
} from "lucide-react";

export const serviceDivision = [
  { code: 0, name: "Tax" },
  { code: 1, name: "Accounting" },
  { code: 2, name: "Legal" },
  { code: 3, name: "Virtual Office" },
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
  { code: 0, name: "Draft", icon: LucideCircleMinus },
  { code: 1, name: "Accept", icon: LucideCircleCheckBig },
];

export const quotationStatus = [
  {
    code: 0,
    name: "Created",
    icon: LucideFilePen,
    description: "New Quotation Sent",
  },
  {
    code: 1,
    name: "Follow Up 1",
    icon: LucideFileDigit,
    description: "On First Follow Up",
  },
  {
    code: 2,
    name: "Follow Up 2",
    icon: LucideFileQuestion,
    description: "On Second Follow Up",
  },
  {
    code: 3,
    name: "No Response",
    icon: LucideFileMinus2,
    description: "Client Decline",
  },
  {
    code: 4,
    name: "Deal",
    icon: LucideFileCheck2,
    description: "Client Accept",
  },
];

export const userLevel = [
  { code: 0, name: "Admin" },
  { code: 1, name: "User" },
];

export const clientType = [
  { code: 0, name: "Individual", description: "Client Individual" },
  { code: 1, name: "Company", description: "Client Company" },
];

export const paymentMethod = [
  { code: 0, name: "Cash" },
  { code: 1, name: "Transfer Bank" },
  { code: 2, name: "Cheque" },
];

export const clientStatus = [
  { code: 0, name: "Received" },
  { code: 1, name: "Quotation" },
  { code: 2, name: "Follow Up" },
  { code: 3, name: "No Response" },
  { code: 4, name: "Active Client" },
  { code: 5, name: "Inactive Client" },
];

export const companyHandler = [
  {
    code: 0,
    name: "PT. MRY CONSULTING INDONESIA",
    address_1: "Golf Lake Residence Ruko Paris A",
    address_2: "No. 58, Cengkareng Timur,",
    address_3: "Cengkareng, Jakarta Barat",
    bank: "BCA",
    rekening: "627-5698-788",
    atas_nama: "PT. MRY Consulting Indonesia",
    icon: LucideWallet,
  },
  {
    code: 1,
    name: "PT. MY TAX INDONESIA PIK",
    address_1: "Jl. Marina Raya Pantai Indah Kapuk",
    address_2: "Bukit Golf Mediterania",
    address_3: "Blok B No. 26",
    bank: "BCA",
    rekening: "627-5300-202",
    atas_nama: "PT. My Tax Indonesia PIK",
    icon: LucideWallet2,
  },
  {
    code: 2,
    name: "PT. MY TAX INDONESIA CGK",
    address_1: "GOLF LAKE RESIDENCE RUKO PARIS A",
    address_2: "NO 58, CENGKARENG TIMUR",
    address_3: "CENGKARENG, JAKARTA BARAT",
    bank: "BCA",
    rekening: "874-0764-889",
    atas_nama: "PT. My Tax Indonesia CGK",
    icon: LucideWalletCards,
  },
  {
    code: 3,
    name: "PT. YAO CONSULTING INDONESIA",
    address_1: "GOLF LAKE RESIDENCE",
    address_2: "Rukan Paris A No. 58",
    address_3: "CENGKARENG, JAKARTA BARAT",
    bank: "BCA",
    rekening: "627-547-8788",
    atas_nama: "PT. Yao Consulting Indonesia",
    icon: LucideWalletMinimal,
  },
  {
    code: 4,
    name: "PT. KARYA ESA INVESTAMA",
    address_1: "GOLF LAKE RESIDENCE",
    address_2: "Ruko Paris Blok A No. 58",
    address_3: "CENGKARENG TIMUR, CENGKARENG",
    bank: "BCA",
    rekening: "168-297-8788",
    atas_nama: "PT. KARYA ESA INVESTAMA",
    icon: LucideDollarSign,
  },
];

export const jenisWpOption = [
  { code: "JWP-1", jenis_wp: "BADAN" },
  { code: "JWP-2", jenis_wp: "ORANG PRIBADI" },
  { code: "JWP-3", jenis_wp: "Joint Operation" },
  { code: "JWP-4", jenis_wp: "Hidup Berpisah" },
  { code: "JWP-5", jenis_wp: "Kantor Perwakilan Perusahaan Asing" },
  { code: "JWP-6", jenis_wp: "Pisah Harta" },
  { code: "JWP-7", jenis_wp: "Bendahara Pemerintah" },
  { code: "JWP-8", jenis_wp: "Memilih Terpisah" },
  { code: "JWP-9", jenis_wp: "Penyelenggara Kegiatan" },
  { code: "JWP-10", jenis_wp: "Warisan Belum Terbagi" },
];

export const badanHukumOption = [
  { code: "BH-1", badan_hukum: "Perseroan Terbatas (PT)" },
  { code: "BH-2", badan_hukum: "Perseroan Perorangan" },
  { code: "BH-3", badan_hukum: "Perusahaan Persero (Persero)" },
  { code: "BH-4", badan_hukum: "Perusahaan Perum (Perum)" },
  { code: "BH-5", badan_hukum: "Koperasi" },
  { code: "BH-6", badan_hukum: "Yayasan" },
];

export const statusNpwpOption = [
  { code: "Aktif", code: 1 },
  { code: "Non Aktif", code: 0 },
];

export const kluOption = [
  {
    code: "H50111",
    name: "ANGKUTAN LAUT DOMESTIK UMUM LINER UNTUK PENUMPANG",
  },
  {
    code: "H50112",
    name: "ANGKUTAN LAUT DOMESTIK UMUM TRAMPER UNTUK PENUMPANG",
  },
  { code: "J60101", name: "PENYIARAN RADIO OLEH PEMERINTAH" },
  { code: "J61919", name: "JASA NILAI TAMBAH TELEPONI LAINNYA" },
  { code: "J61914", name: "WARUNG TELEKOMUNIKASI (WARTEL)" },
  { code: "K64200", name: "KEGIATAN PERUSAHAAN HOLDING" },
  { code: "K66110", name: "ADMINISTRASI PASAR UANG (BURSA EFEK)" },
  { code: "L68110", name: "REAL ESTAT YANG DIMILIKI SENDIRI ATAU DISEWA" },
  {
    code: "N77400",
    name: "SEWA GUNA USAHA TANPA HAK OPSI ASET NON FINANSIAL, BUKAN KARYA HAK CIPTA",
  },
  {
    code: "P85230",
    name: "JASA PENDIDIKAN MENENGAH KEJURUAN DAN TEKNIK/MADRASAH ALIYAH KEJURUAN PEMERINTAH",
  },
  { code: "P85498", name: "JASA PENDIDIKAN KERAJINAN DAN INDUSTRI" },
  { code: "Q93123", name: "KELAB RENANG" },
  { code: "S95120", name: "JASA REPARASI PERALATAN KOMUNIKASI" },
];

export const jenisKelaminOption = [
  { code: 1, name: "Pria" },
  { code: 2, name: "Wanita" },
];

export const jenisPerkawinanOption = [
  { code: "JP-1", name: "Kawin" },
  { code: "JP-2", name: "Tidak Kawin" },
  { code: "JP-3", name: "Cerai Hidup" },
  { code: "JP-4", name: "Cerai Mati" },
];

export const agamaOption = [
  { code: "AO-1", name: "Islam" },
  { code: "AO-2", name: "Kristen" },
  { code: "AO-3", name: "Katholik" },
  { code: "AO-4", name: "Hindu" },
  { code: "AO-5", name: "Budha" },
  { code: "AO-6", name: "Khonghucu" },
  { code: "AO-7", name: "Kepercayaan Terhadap Tuhan YME" },
  { code: "AO-8", name: "Lainnya" },
];

export const kewarganegaraanOption = [
  { code: 1, name: "Warga Negara Indonesia" },
  { code: 2, name: "Warga Negara Asing" },
];

export const bahasaOption = [
  { code: 1, name: "Bahasa Indonesia" },
  { code: 2, name: "Bahasa Inggris" },
];

export const jenisPerusahaanOption = [
  { code: "JP-1", name: "Swasta Nasional" },
  { code: "JP-2", name: "Fasilitas PMDN" },
  { code: "JP-3", name: "BUMN" },
  { code: "JP-4", name: "BUMD" },
  { code: "JP-5", name: "Penanaman Modal Asing (PMA)" },
];

export const jumlahKaryawanOption = [
  { code: "JKO-1", name: "Tidak Memiliki Karyawan" },
  { code: "JKO-2", name: "di bawah 10" },
  { code: "JKO-3", name: "10 sd 100" },
  { code: "JKO-4", name: "101 sd 1000" },
  { code: "JKO-5", name: "di atas 1000" },
];

export const metodePembukuanOption = [
  { code: 1, name: "Stelsel Akrual" },
  { code: 2, name: "Stelsel Kas" },
];

export const mataUangOption = [
  { code: 1, name: "Indonesian Rupiah (IDR)" },
  { code: 2, name: "Dolar Amerika Serikat (USD)" },
];

export const periodePembukuanOption = [{ code: "PP-1", name: "01-12" }];

export const omsetOption = [{ code: "OM-1", name: "lebih dari Rp. 4,8 M" }];
