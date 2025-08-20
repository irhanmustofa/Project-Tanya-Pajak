import DataTables from "@/components/datatables/Datatables";
import useAlamatTableConfig from "../alamat-components/AlamatColumn";
import AlamatSubject from "../alamat-components/AlamatSubject";
import { countryList } from "../../../data/country";
import { kppOption, pengawasOption } from "@/helpers/variables";
import { useEffect } from "react";

export default function AlamatTable({ clientState = {} }) {
  const { alamatColumn, filterFields } = useAlamatTableConfig();
  const dataAlamat = [];
  var negara,
    kpp,
    pengawas = "";

  const kodeNegara = countryList.map((item) => item.kode);
  const kodeKPP = kppOption.map((item) => item.kode);
  const kodePengawas = pengawasOption.map((item) => item.kode);

  if (clientState?.data[0]?.alamat.length > 0) {
    clientState?.data[0]?.alamat.map((item) => {
      negara = kpp = pengawas = "";
      if (kodeNegara.indexOf(item.negara) > -1) {
        negara = countryList[kodeNegara.indexOf(item.negara)].name;
      }

      if (kodeKPP.indexOf(item.kode_kpp) > -1) {
        kpp = kppOption[kodeKPP.indexOf(item.kode_kpp)].name;
      }

      if (kodePengawas.indexOf(item.bagian_pengawasan) > -1) {
        pengawas =
          pengawasOption[kodePengawas.indexOf(item.bagian_pengawasan)].name;
      }

      dataAlamat.push({
        _id: item._id,
        negara: negara,
        jenis_alamat: item.negara,
        alamat: item.alamat,
        rt: item.rt,
        rw: item.rw,
        provinsi: item.provinsi,
        kabupaten: item.kabupaten,
        kecamatan: item.kecamatan,
        desa: item.desa,
        kode_area: item.kode_area,
        kode_pos: item.kode_pos,
        data_geometrik: item.data_geometrik,
        disewa: item.disewa,
        identitas_pemilik: item.identitas_pemilik,
        nama_pemilik: item.nama_pemilik,
        tanggal_mulai_sewa: item.tanggal_mulai_sewa,
        tanggal_sewa_berakhir: item.tanggal_sewa_berakhir,
        tanggal_mulai: item.tanggal_mulai,
        tanggal_berakhir: item.tanggal_berakhir,
        kode_kpp: kpp,
        bagian_pengawasan: pengawas,
      });
    });
  }

  return (
    <>
      <AlamatSubject />

      <DataTables
        columns={alamatColumn}
        data={dataAlamat}
        filterFields={filterFields}
        path="alamat-client"
      />
    </>
  );
}
