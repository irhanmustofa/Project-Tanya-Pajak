import MainPage from "@/layouts/MainPage";
import TarifCitProvider from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitProvider";
import TarifCitTable from "@/app/management/clients/tarif-cit/tarif-cit-pages/TarifCitTable";

export default function TarifCit() {
  return (
    <>
      <MainPage>
        <TarifCitProvider>
          <TarifCitTable />
        </TarifCitProvider>
      </MainPage>
    </>
  );
}
