import { useGroup } from "../group-components/GroupProvider";
import DataTables from "@/components/datatables/Datatables";
import useGroupTableConfig from "../group-components/GroupColumn";
import GroupSubject from "../group-components/GroupSubject";

export default function GroupTable() {
  const { groupState } = useGroup();
  const { groupColumn, filterFields } = useGroupTableConfig();

  const sortedData = [...groupState.data].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <GroupSubject />

      <DataTables
        columns={groupColumn}
        data={sortedData}
        filterFields={filterFields}
      />
    </>
  );
}
