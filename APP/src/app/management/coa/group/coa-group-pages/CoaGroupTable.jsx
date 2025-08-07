import { useCoaGroup } from "@/app/management/coa/group/coa-group-components/CoaGroupProvider";
import DataTables from "@/components/datatables/Datatables";
import useCoaGroupTableConfig from "@/app/management/coa/group/coa-group-components/CoaGroupColumn";
import CoaGroupSubject from "@/app/management/coa/group/coa-group-components/CoaGroupSubject";

export default function CoaGroupTable() {
  const { coaGroupState } = useCoaGroup();
  const { coaGroupColumn, filterFields } = useCoaGroupTableConfig();
  return (
    <>
      <CoaGroupSubject />

      <DataTables
        columns={coaGroupColumn}
        data={coaGroupState.data ?? []}
        filterFields={filterFields}
        modalBtn={true}
      />
    </>
  );
}
