import { useCoa } from "@/app/management/coa/master/coa-components/CoaProvider";
import DataTables from "@/components/datatables/Datatables";
import useCoaTableConfig from "@/app/management/coa/master/coa-components/CoaColumn";
import CoaSubject from "@/app/management/coa/master/coa-components/CoaSubject";
import { coaGroupAll } from "../../group/coa-group-components/CoaGroupService";
import { coaHeadAll } from "../../head/coa-head-components/CoaHeadService";
import { useEffect, useState } from "react";
import { domToReact } from "html-react-parser";

export default function CoaTable() {
  const { coaState, coaGroup } = useCoa();
  const { coaColumn, filterFields } = useCoaTableConfig();
  const [coaGroupState, setCoaGroupState] = useState([]);
  const [coaHeadState, setCoaHeadState] = useState([]);
  let dataCoa = [];

  useEffect(() => {
    coaGroupAll().then((res) => {
      if (res.success) {
        setCoaGroupState(res.data);
      }
    });

    coaHeadAll().then((res) => {
      if (res.success) {
        setCoaHeadState(res.data);
      }
    });
  }, []);

  if (coaHeadState || coaGroupState) {
    const kodeGroup = coaGroupState.map((item) => item.kode_group);
    const kodeHead = coaHeadState.map((item) => item.kode_head);
    coaState.data.map((item) => {
      dataCoa.push({
        _id: item._id,
        kode_akun: item.kode_akun,
        nama_akun: item.nama_akun,
        kode_head: item.kode_head,
        nama_head: coaHeadState[kodeHead.indexOf(item.kode_head)]?.nama_head,
        kode_group: item.kode_group,
        nama_group:
          coaGroupState[kodeGroup.indexOf(item.kode_group)]?.nama_group,
        jenis_asset: item.jenis_asset,
        klasifikasi_pajak: item.klasifikasi_pajak,
        pph: item.pph,
        laba_kotor: item.laba_kotor,
        ebt: item.ebt,
        arus_bank: item.arus_bank,
        cf: item.cf,
      });
    });
  }

  return (
    <>
      <CoaSubject />

      <DataTables
        columns={coaColumn}
        data={dataCoa}
        filterFields={filterFields}
        modalBtn={true}
      />
    </>
  );
}
