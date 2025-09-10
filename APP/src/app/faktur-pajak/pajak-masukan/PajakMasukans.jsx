import MainPage from "@/layouts/MainPage";
import PajakMasukanProvider from "./pajak-masukan-components/PajakMasukanProvider";
import PajakMasukanTable from "./pajak-keluaran-pages/PajakMasukanTable";

export default function PajakMasukans() {
  return (
    <>
      <MainPage>
        <PajakMasukanProvider>
          <PajakMasukanTable />
        </PajakMasukanProvider>
      </MainPage>
    </>
  );
}
