import MainPage from "@/layouts/MainPage";
import PajakKeluaranProvider from "@/app/faktur-pajak/pajak-keluaran/pajak-keluaran-components/PajakKeluaranProvider";
import PajakKeluaranTable from "@/app/faktur-pajak/pajak-keluaran/pajak-keluaran-pages/PajakKeluaranTable";

export default function PajakKeluarans() {
  return (
    <>
      <MainPage>
        <PajakKeluaranProvider>
          <PajakKeluaranTable />
        </PajakKeluaranProvider>
      </MainPage>
    </>
  );
}
