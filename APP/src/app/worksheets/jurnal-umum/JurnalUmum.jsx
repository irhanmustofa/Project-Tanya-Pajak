import MainPage from "@/layouts/MainPage";
import JurnalUmumProvider from "./jurnal-umum-components/JurnalUmumProvider";
import JurnalUmumTable from "./jurnal-umum-pages/JurnalUmumTable";

export default function JurnalUmum() {
  return (
    <MainPage>
      <JurnalUmumProvider>
        <JurnalUmumTable />
      </JurnalUmumProvider>
    </MainPage>
  );
}
