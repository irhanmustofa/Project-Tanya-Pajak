import { useUser } from "../user-components/UserProvider";
import DataTables from "@/components/datatables/Datatables";
import useUserTableConfig from "../user-components/UserColumn";
import UserSubject from "../user-components/UserSubject";

export default function UserTable() {
  const { userState } = useUser();
  const { userColumn, filterFields } = useUserTableConfig();

  return (
    <>
      <UserSubject />

      <DataTables
        columns={userColumn}
        data={userState.data}
        filterFields={filterFields}
      />
    </>
  );
}
