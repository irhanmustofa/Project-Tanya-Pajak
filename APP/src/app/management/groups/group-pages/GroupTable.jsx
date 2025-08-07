import { useGroup } from "../group-components/GroupProvider";
import DataTables from "@/components/datatables/Datatables";
import useGroupTableConfig from "../group-components/GroupColumn";
import UserSubject from "../group-components/GroupSubject";

export default function GroupTable() {
  const { groupState } = useGroup();
  const { groupColumn, filterFields } = useGroupTableConfig();

  return (
    <>
      <UserSubject />

      <DataTables
        columns={groupColumn}
        data={groupState.data}
        filterFields={filterFields}
      />
    </>
  );
}
