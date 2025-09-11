import DataTables from "@/components/datatables/Datatables";
import ReturPajakMasukanSubject from "../retur-pajak-masukan-components/ReturPajakMasukanSubject";
import { useReturPajakMasukan } from "../retur-pajak-masukan-components/ReturPajakMasukanProvider";
import useReturPajakMasukanTableConfig from "../retur-pajak-masukan-components/ReturPajakMasukanColumn";

export default function ReturPajakMasukanTable() {
  const { returPajakMasukanState } = useReturPajakMasukan();
  const { returPajakMasukanColumn, filterFields } =
    useReturPajakMasukanTableConfig();

  return (
    <>
      <ReturPajakMasukanSubject />

      <DataTables
        columns={returPajakMasukanColumn}
        data={returPajakMasukanState.data}
        filterFields={filterFields}
      />
    </>
  );
}
