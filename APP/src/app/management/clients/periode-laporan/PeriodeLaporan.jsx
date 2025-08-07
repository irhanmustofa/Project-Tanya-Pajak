import MainPage from "@/layouts/MainPage";
import PeriodeLaporanProvider from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanProvider";
import PeriodeLaporanTable from "@/app/management/clients/periode-laporan/periode-laporan-pages/PeriodeLaporanTable";

export default function Users() {
  return (
    <>
      <MainPage>
        <PeriodeLaporanProvider>
          <PeriodeLaporanTable />
        </PeriodeLaporanProvider>
      </MainPage>
    </>
  );
}
