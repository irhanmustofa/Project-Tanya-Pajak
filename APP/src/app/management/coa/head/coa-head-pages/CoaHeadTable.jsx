import { useCoaHead } from "@/app/management/coa/head/coa-head-components/CoaHeadProvider";
import DataTables from "@/components/datatables/Datatables";
import useCoaHeadTableConfig from "@/app/management/coa/head/coa-head-components/CoaHeadColumn";
import CoaHeadSubject from "@/app/management/coa/head/coa-head-components/CoaHeadSubject";

export default function CoaHeadTable() {
  const { coaHeadState, coaHeadGroup } = useCoaHead();
  const { coaHeadColumn, filterFields } = useCoaHeadTableConfig();
  return (
    <>
      <CoaHeadSubject />

      <DataTables
        columns={coaHeadColumn}
        data={coaHeadState.data}
        filterFields={filterFields}
      />
    </>
  );
}
