import MainPage from "@/layouts/MainPage";
import CoaHeadProvider from "@/app/management/coa/head/coa-head-components/CoaHeadProvider";
import CoaHeadTable from "@/app/management/coa/head/coa-head-pages/CoaHeadTable";

export default function CoaHead() {
  return (
    <>
      <MainPage>
        <CoaHeadProvider>
          <CoaHeadTable />
        </CoaHeadProvider>
      </MainPage>
    </>
  );
}
