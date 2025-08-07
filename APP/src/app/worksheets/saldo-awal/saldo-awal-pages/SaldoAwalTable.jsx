import { useSaldoAwal } from "../saldo-awal-components/SaldoAwalProvider";
import DataTables from "@/components/datatables/Datatables";
import SaldoAwalSubject from "../saldo-awal-components/SaldoAwalSubject";
import useSaldoAwalTableConfig from "../saldo-awal-components/SaldoAwalColumn";

export default function SaldoAwalTable() {
  const { saldoAwalState } = useSaldoAwal();
  const { saldoAwalColumn, filterFields } = useSaldoAwalTableConfig();

  return (
    <>
      <SaldoAwalSubject />

      <DataTables
        columns={saldoAwalColumn}
        data={saldoAwalState.data}
        filterFields={filterFields}
      />
    </>
  );
}
