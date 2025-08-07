import { usePeriodeLaporan } from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanProvider";
import DataTables from "@/components/datatables/Datatables";
import usePeriodeLaporanTableConfig from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanColumn";
import PeriodeLaporanSubject from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanSubject";

export default function PeriodeLaporanTable() {
  const { periodeLaporanState, periodeLaporanGroup } = usePeriodeLaporan();
  const { periodeLaporanColumn, filterFields } = usePeriodeLaporanTableConfig();

  return (
    <>
      <PeriodeLaporanSubject />

      <DataTables
        columns={periodeLaporanColumn}
        data={periodeLaporanState.data}
        filterFields={filterFields}
      />
    </>
  );
}
