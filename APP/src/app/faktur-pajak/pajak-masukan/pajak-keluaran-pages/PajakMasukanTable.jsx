import DataTables from "@/components/datatables/Datatables";
import PajakMasukanSubject from "../pajak-masukan-components/PajakMasukanSubject";
import { usePajakMasukan } from "../pajak-masukan-components/PajakMasukanProvider";
import usePajakMasukanTableConfig from "../pajak-masukan-components/PajakMasukanColumn";

export default function PajakMasukanTable() {
  const { pajakMasukanState } = usePajakMasukan();
  const { pajakMasukanColumn, filterFields } = usePajakMasukanTableConfig();

  return (
    <>
      <PajakMasukanSubject />

      <DataTables
        columns={pajakMasukanColumn}
        data={pajakMasukanState.data}
        filterFields={filterFields}
      />
    </>
  );
}
