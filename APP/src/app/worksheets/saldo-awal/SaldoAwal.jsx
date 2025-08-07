import MainPage from "@/layouts/MainPage";
import SaldoAwalProvider from "./saldo-awal-components/SaldoAwalProvider";
import SaldoAwalTable from "./saldo-awal-pages/SaldoAwalTable";

export default function SaldoAwal() {
  return (
    <MainPage>
      <SaldoAwalProvider>
        <SaldoAwalTable />
      </SaldoAwalProvider>
    </MainPage>
  );
}
