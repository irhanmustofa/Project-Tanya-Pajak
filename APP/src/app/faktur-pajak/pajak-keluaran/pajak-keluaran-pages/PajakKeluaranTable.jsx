import { usePajakKeluaran } from "../pajak-keluaran-components/PajakKeluaranProvider";
import DataTables from "@/components/datatables/Datatables";
import usePajakKeluaranTableConfig from "../pajak-keluaran-components/PajakKeluaranColumn";
import PajakKeluaranSubject from "../pajak-keluaran-components/PajakKeluaranSubject";

export default function PajakKeluaranTable() {
  const { pajakKeluaranState } = usePajakKeluaran();
  const { pajakKeluaranColumn, filterFields } = usePajakKeluaranTableConfig();

  return (
    <>
      <PajakKeluaranSubject />

      <DataTables
        columns={pajakKeluaranColumn}
        data={pajakKeluaranState.data}
        filterFields={filterFields}
      />
    </>
  );
}
