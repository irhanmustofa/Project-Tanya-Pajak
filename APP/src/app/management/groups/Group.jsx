import MainPage from "@/layouts/MainPage";
import GroupProvider from "@/app/management/groups/group-components/GroupProvider";
import GroupTable from "@/app/management/groups/group-pages/GroupTable";

export default function Groups() {
  return (
    <>
      <MainPage>
        <GroupProvider>
          <GroupTable />
        </GroupProvider>
      </MainPage>
    </>
  );
}
