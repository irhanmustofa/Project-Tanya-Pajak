import { useTarifCit } from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitProvider";
import DataTables from "@/components/datatables/Datatables";
import useTarifCitTableConfig from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitColumn";
import TarifCitSubject from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitSubject";

export default function TarifCitTable() {
  const { tarifCitState, tarifCitGroup } = useTarifCit();
  const { tarifCitColumn, filterFields } = useTarifCitTableConfig();

  return (
    <>
      <TarifCitSubject />

      <DataTables
        columns={tarifCitColumn}
        data={tarifCitState.data ?? []}
        filterFields={filterFields}
      />
    </>
  );
}
