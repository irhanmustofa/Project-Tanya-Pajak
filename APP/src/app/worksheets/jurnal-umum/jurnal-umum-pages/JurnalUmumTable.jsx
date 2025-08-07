import { useJurnalUmum } from "../jurnal-umum-components/JurnalUmumProvider";
import DataTables from "@/components/datatables/Datatables";
import JurnalUmumSubject from "../jurnal-umum-components/JurnalUmumSubject";
import useJurnalUmumTableConfig from "../jurnal-umum-components/JurnalUmumColumn";

export default function JurnalUmumTable() {
  const { jurnalUmumState } = useJurnalUmum();
  const { jurnalUmumColumn, filterFields } = useJurnalUmumTableConfig();

  return (
    <>
      <JurnalUmumSubject />

      <DataTables
        columns={jurnalUmumColumn}
        data={jurnalUmumState.data}
        filterFields={filterFields}
      />
    </>
  );
}
