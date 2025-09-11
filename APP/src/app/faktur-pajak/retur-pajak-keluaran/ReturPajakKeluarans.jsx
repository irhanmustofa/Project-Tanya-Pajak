import MainPage from "@/layouts/MainPage";
import PajakMasukanTable from "./retur-pajak-keluaran-pages/ReturPajakKeluaranTable";
import ReturPajakKeluaranProvider from "./retur-pajak-keluaran-components/ReturPajakKeluaranProvider";

export default function ReturPajakKeluarans() {
  return (
    <>
      <MainPage>
        <ReturPajakKeluaranProvider>
          <PajakMasukanTable />
        </ReturPajakKeluaranProvider>
      </MainPage>
    </>
  );
}
