import MainPage from "@/layouts/MainPage";
import ReturPajakMasukanTable from "./retur-pajak-masukan-pages/ReturPajakMasukanTable";
import ReturPajakMasukanProvider from "./retur-pajak-masukan-components/ReturPajakMasukanProvider";

export default function ReturPajakMasukans() {
  return (
    <>
      <MainPage>
        <ReturPajakMasukanProvider>
          <ReturPajakMasukanTable />
        </ReturPajakMasukanProvider>
      </MainPage>
    </>
  );
}
