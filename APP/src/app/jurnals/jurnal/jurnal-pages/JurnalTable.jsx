import { useJurnal } from "../jurnal-components/JurnalProvider";
import DataTables from "@/components/datatables/Datatables";
import useJurnalTableConfig from "../jurnal-components/JurnalColumn";
import JurnalSubject from "../jurnal-components/JurnalSubject";

export default function JurnalTable() {
  const { jurnalState } = useJurnal();
  const { jurnalColumn, filterFields } = useJurnalTableConfig();
  return (
    <>
      <JurnalSubject />

      <DataTables
        columns={jurnalColumn}
        data={jurnalState.data}
        filterFields={filterFields}
      />
    </>
  );
}
