import { countryList } from "./country";
import { kewarganegaraanOption } from "@/helpers/variables";
import { dateShort } from "@/components/custom/DateFormatted";
import provinceReq, { districtReq, regencyReq, villageReq } from "./wilayah";
import { useEffect } from "react";

export const alamatDataStructure = (alamatState) => {
  var negara,
    kpp,
    pengawas,
    wargaNegara,
    jenisNitkuName = "",
    jenisAlamatName = "",
    provinceName = "",
    regencyName = "",
    districtName = "",
    villageName = "",
    data = [];

  const [provinceState, setProvinceState] = useState([]);
  const [regencyState, setRegencyState] = useState([]);
  const [districtState, setDistrictState] = useState([]);
  const [villageState, setVillageState] = useState([]);

  useEffect(() => {
    provinceReq(setProvinceState);
    regencyReq(setRegencyState);
    districtReq(setDistrictState);
    villageReq(setVillageState);
  }, []);

  if (provinceState.length > 0) {
    const provinceCode = provinceState.map((item) => item.code);
    const regencyCode = regencyState.map((item) => item.code);
    const districtCode = districtState.map((item) => item.code);
    const villageCode = villageState.map((item) => item.code);
  }

  const kodeJenisAlamat = jenisAlamatOption.map((item) => item.code);
  const kodeNegara = countryList.map((item) => item.code);
  const kodeKPP = kppOption.map((item) => item.code);
  const kodePengawas = pengawasOption.map((item) => item.code);
  const kodeWN = kewarganegaraanOption.map((item) => item.code);
  const kodeJenisNitku = jenisNitkuOption.map((item) => item.code);

  if (alamatState.length > 0) {
    alamatState.map((item) => {
      negara =
        kpp =
        pengawas =
        wargaNegara =
        jenisNitkuName =
        jenisAlamatName =
        provinceName =
        regencyName =
        districtName =
        villageName =
          "";

      if (kodeNegara.indexOf(item.negara) > -1) {
        negara = countryList[kodeNegara.indexOf(item.negara)].name;
      }

      if (kodeWN.indexOf(item.kewarganegaraan_pic) > -1) {
        wargaNegara =
          kewarganegaraanOption[kodeWN.indexOf(item.kewarganegaraan_pic)].name;
      }
      if (kodeJenisNitku.indexOf(item.jenis_nitku) > -1) {
        jenisNitkuName =
          jenisNitkuOption[kodeWN.indexOf(item.jenis_nitku)].name;
      }

      if (kodeKPP.indexOf(item.kode_kpp) > -1) {
        kpp = kppOption[kodeKPP.indexOf(item.kode_kpp)].name;
      }

      if (kodePengawas.indexOf(item.bagian_pengawasan) > -1) {
        pengawas =
          pengawasOption[kodePengawas.indexOf(item.bagian_pengawasan)].name;
      }

      if (kodeJenisAlamat.indexOf(item.jenis - alamat) > -1) {
        jenisAlamatName =
          jenisAlamatOption[kodeJenisAlamat.indexOf(item.jenis_alamat)].name;
      }

      if (provinceCode.indexOf(String(item.provinsi)) > -1) {
        provinceName =
          provinceState[provinceCode.indexOf(String(item.provinsi))].name;
      }

      if (regencyCode.indexOf(String(item.kabupaten)) > -1) {
        regencyName =
          regencyState[regencyCode.indexOf(String(item.kabupaten))].name;
      }

      if (districtCode.indexOf(String(item.kecamatan)) > -1) {
        districtName =
          districtState[districtCode.indexOf(String(item.kecamatan))].name;
      }

      if (villageCode.indexOf(String(item.desa)) > -1) {
        villageName = villageState[villageCode.indexOf(String(item.desa))].name;
      }

      data.push({
        _id: item._id,
        negara: negara,
        jenis_alamat: jenisAlamatName,
        alamat: item.alamat,
        rt: item.rt,
        rw: item.rw,
        provinsi: provinceName,
        kabupaten: regencyName,
        kecamatan: districtName,
        desa: villageName,
        kode_area: item.kode_area,
        kode_pos: item.kode_pos,
        data_geometrik: item.data_geometrik,
        disewa: item.disewa,
        identitas_pemilik: item.identitas_pemilik,
        nama_pemilik: item.nama_pemilik,
        tanggal_mulai_sewa:
          dateShort(item.tanggal_mulai_sewa) == "Invalid Date"
            ? ""
            : dateShort(item.tanggal_mulai_sewa),
        tanggal_sewa_berakhir:
          dateShort(tanggal_sewa_berakhir) === "Invalid Date"
            ? ""
            : dateShort(tanggal_sewa_berakhir),
        tanggal_mulai:
          dateShort(item.tanggal_mulai) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_mulai),
        tanggal_berakhir:
          dateShort(item.tanggal_berakhir) === "Invalid Date"
            ? ""
            : dateShort(item.tanggal_berakhir),
        kode_kpp: kpp,
        bagian_pengawasan: pengawas,
        identitas_pic: item.identitas_pic,
        nama_pic: item.nama_pic,
        kewarganegaraan_pic: wargaNegara,
        nama_nitku: item.nama_nitku,
        jenis_nitku: jenisNitkuName,
        kode_klu: item.kode_klu,
      });
    });
  }

  return data;
};

export const jenisNitkuOption = [
  { code: "JNTKU-1", name: "Cabang Kecamatan" },
  { code: "JNTKU-2", name: "Cabang Kelurahan/Desa" },
  { code: "JNTKU-3", name: "Cabang Kota/Kabupaten" },
  { code: "JNTKU-4", name: "Cabang Wilayah/Provinsi" },
  { code: "JNTKU-5", name: "Cabang Distribusi" },
  { code: "JNTKU-6", name: "Cabang Gudang" },
  { code: "JNTKU-7", name: "Kantor Pusat" },
  { code: "JNTKU-8", name: "Manajemen" },
  { code: "JNTKU-9", name: "Objek Pajak Karbon" },
  { code: "JNTKU-10", name: "Objek Pajak PBB P5L" },
  { code: "JNTKU-11", name: "Pemasaran" },
  { code: "JNTKU-12", name: "Produksi" },
];

export const kppOption = [
  { code: "1", name: "KPP Pratama Jakarta Matraman (001)" },
  { code: "2", name: "KPP Pratama Jakarta Pulogadung (003)" },
  { code: "3", name: "KPP Pratama Jakarta Cakung Satu (004)" },
  { code: "4", name: "KPP Pratama Jakarta Kramat Jati (005)" },
  { code: "5", name: "KPP Pratama Jakarta Cakung Dua (006)" },
  { code: "6", name: "KPP Pratama Jakarta Duren Sawit (008)" },
  { code: "7", name: "KPP Pratama Jakarta Pasar Rebo (009)" },
];

export const jenisAlamatOption = [
  { name: "Alamat Korespondensi", code: "JA-1" },
  { name: "Alamat Lokasi Aset", code: "JA-2" },
  { name: "Alamat Sesuai E-KTP", code: "JA-3" },
  { name: "Tempat Kegiatan Usaha", code: "JA-4" },
];

export const pengawasOption = [
  { code: "BP-01", name: "Bagian Pengawas I" },
  { code: "BP-02", name: "Bagian Pengawas II" },
  { code: "BP-03", name: "Bagian Pengawas III" },
  { code: "BP-04", name: "Bagian Pengawas IV" },
  { code: "BP-05", name: "Bagian Pengawas V" },
];
