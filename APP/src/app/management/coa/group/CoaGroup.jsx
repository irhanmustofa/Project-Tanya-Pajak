import MainPage from "@/layouts/MainPage";
import CoaGroupProvider from "@/app/management/coa/group/coa-group-components/CoaGroupProvider";
import CoaGroupTable from "@/app/management/coa/group/coa-group-pages/CoaGroupTable";

export default function CoaGroup() {
  return (
    <>
      <MainPage>
        <CoaGroupProvider>
          <CoaGroupTable />
        </CoaGroupProvider>
      </MainPage>
    </>
  );
}
