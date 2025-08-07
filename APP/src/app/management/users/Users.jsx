import MainPage from "@/layouts/MainPage";
import UserProvider from "@/app/management/users/user-components/UserProvider";
import UserTable from "@/app/management/users/user-pages/UserTable";

export default function Users() {
  return (
    <>
      <MainPage>
        <UserProvider>
          <UserTable />
        </UserProvider>
      </MainPage>
    </>
  );
}
