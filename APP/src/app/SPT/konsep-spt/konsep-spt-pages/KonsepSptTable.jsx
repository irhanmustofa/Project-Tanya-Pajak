import { useKonsepSpt } from "../konsep-spt-components/KonsepSptProvider";
import DataTables from "@/components/datatables/Datatables";
import useKonsepSptTableConfig from "../konsep-spt-components/KonsepSptColumn";
import KonsepSptSubject from "../konsep-spt-components/KonsepSptSubject";

export default function KonsepSptTable() {
  const { konsepSptState } = useKonsepSpt();
  const { konsepSptColumn, filterFields } = useKonsepSptTableConfig();

  return (
    <>
      <KonsepSptSubject />

      <DataTables
        columns={konsepSptColumn}
        data={konsepSptState.data}
        filterFields={filterFields}
      />
    </>
  );
}
