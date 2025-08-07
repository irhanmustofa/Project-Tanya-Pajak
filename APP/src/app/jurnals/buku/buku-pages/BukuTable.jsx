import { useBuku } from "../buku-components/BukuProvider";
import DataTables from "@/components/datatables/Datatables";
import useBukuTableConfig from "../buku-components/BukuColumn";
import BukuSubject from "../buku-components/BukuSubject";

export default function BukuTable() {
  const { bukuState } = useBuku();
  const { bukuColumn, filterFields } = useBukuTableConfig();
  return (
    <>
      <BukuSubject />

      <DataTables
        columns={bukuColumn}
        data={bukuState.data}
        filterFields={filterFields}
      />
    </>
  );
}
