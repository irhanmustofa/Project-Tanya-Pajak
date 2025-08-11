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
  { code: 0, name: "Inactive", icon: LucideCircleMinus },
  { code: 1, name: "Active", icon: LucideCircleCheckBig },
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
  { kode: "1", jenis_wp: "BADAN" },
  { kode: "2", jenis_wp: "ORANG PRIBADI" },
];

export const badanHukumOption = [
  { kode: "1", badan_hukum: "Perseroan Terbatas (PT)" },
  { kode: "2", badan_hukum: "Perseroan Perorangan" },
  { kode: "3", badan_hukum: "Perusahaan Persero (Persero)" },
  { kode: "4", badan_hukum: "Perusahaan Perum (Perum)" },
  { kode: "5", badan_hukum: "Koperasi" },
  { kode: "6", badan_hukum: "Yayasan" },
];

export const statusNpwpOption = [
  { status: "Aktif", kode: "1" },
  { status: "Non Aktif", kode: "0" },
];

export const kppOption = [
  { kode: "1", kantor: "KPP Pratama Jakarta Matraman (001)" },
  { kode: "2", kantor: "KPP Pratama Jakarta Pulogadung (003)" },
  { kode: "3", kantor: "KPP Pratama Jakarta Cakung Satu (004)" },
  { kode: "4", kantor: "KPP Pratama Jakarta Kramat Jati (005)" },
  { kode: "5", kantor: "KPP Pratama Jakarta Cakung Dua (006)" },
  { kode: "6", kantor: "KPP Pratama Jakarta Duren Sawit (008)" },
  { kode: "7", kantor: "KPP Pratama Jakarta Pasar Rebo (009)" },
];

export const kluOption = [
  {
    kode: "H50111",
    deskripsi: "ANGKUTAN LAUT DOMESTIK UMUM LINER UNTUK PENUMPANG",
  },
  {
    kode: "H50112",
    deskripsi: "ANGKUTAN LAUT DOMESTIK UMUM TRAMPER UNTUK PENUMPANG",
  },
  { kode: "J60101", deskripsi: "PENYIARAN RADIO OLEH PEMERINTAH" },
  { kode: "J61919", deskripsi: "JASA NILAI TAMBAH TELEPONI LAINNYA" },
  { kode: "J61914", deskripsi: "WARUNG TELEKOMUNIKASI (WARTEL)" },
  { kode: "K64200", deskripsi: "KEGIATAN PERUSAHAAN HOLDING" },
  { kode: "K66110", deskripsi: "ADMINISTRASI PASAR UANG (BURSA EFEK)" },
  { kode: "L68110", deskripsi: "REAL ESTAT YANG DIMILIKI SENDIRI ATAU DISEWA" },
  {
    kode: "N77400",
    deskripsi:
      "SEWA GUNA USAHA TANPA HAK OPSI ASET NON FINANSIAL, BUKAN KARYA HAK CIPTA",
  },
  {
    kode: "P85230",
    deskripsi:
      "JASA PENDIDIKAN MENENGAH KEJURUAN DAN TEKNIK/MADRASAH ALIYAH KEJURUAN PEMERINTAH",
  },
  { kode: "P85498", deskripsi: "JASA PENDIDIKAN KERAJINAN DAN INDUSTRI" },
  { kode: "Q93123", deskripsi: "KELAB RENANG" },
  { kode: "S95120", deskripsi: "JASA REPARASI PERALATAN KOMUNIKASI" },
];
