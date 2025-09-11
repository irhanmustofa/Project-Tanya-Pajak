import DataTables from "@/components/datatables/Datatables";
import ReturPajakKeluaranSubject from "../retur-pajak-keluaran-components/ReturPajakKeluaranSubject";
import { useReturPajakKeluaran } from "../retur-pajak-keluaran-components/ReturPajakKeluaranProvider";
import useReturPajakKeluaranTableConfig from "../retur-pajak-keluaran-components/ReturPajakKeluaranColumn";

export default function ReturPajakKeluaranTable() {
  const { returPajakKeluaranState } = useReturPajakKeluaran();
  const { returPajakKeluaranColumn, filterFields } =
    useReturPajakKeluaranTableConfig();

  return (
    <>
      <ReturPajakKeluaranSubject />

      <DataTables
        columns={returPajakKeluaranColumn}
        data={returPajakKeluaranState.data}
        filterFields={filterFields}
      />
    </>
  );
}
