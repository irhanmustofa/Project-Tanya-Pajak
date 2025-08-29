import MainPage from "@/layouts/MainPage";
import KonsepSptProvider from "./konsep-spt-components/KonsepSptProvider";
import KonsepSptTable from "./konsep-spt-pages/KonsepSptTable";

export default function KonsepSpt() {
  return (
    <>
      <MainPage>
        <KonsepSptProvider>
          <KonsepSptTable />
        </KonsepSptProvider>
      </MainPage>
    </>
  );
}
