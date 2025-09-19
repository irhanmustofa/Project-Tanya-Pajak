import DataTables from "@/components/datatables/Datatables";
import useBankTableConfig from "../bank-components/BankColumn";
import BankSubject from "../bank-components/BankSubject";
import bankDataStructure from "../../../data/bankDataList";

export default function BankTable({ bankState = [] }) {
  const { bankColumn, filterFields } = useBankTableConfig();
  const data = bankDataStructure(bankState);

  return (
    <>
      <BankSubject />

      <DataTables
        columns={bankColumn}
        data={data}
        filterFields={filterFields}
        path="bank-client"
      />
    </>
  );
}
