import MainPage from "@/layouts/MainPage";
import CoaProvider from "@/app/management/coa/master/coa-components/CoaProvider";
import CoaTable from "@/app/management/coa/master/coa-pages/CoaTable";

export default function Users() {
  return (
    <>
      <MainPage>
        <CoaProvider>
          <CoaTable />
        </CoaProvider>
      </MainPage>
    </>
  );
}
