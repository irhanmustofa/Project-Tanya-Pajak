import { useClient } from "../client-components/ClientProvider";
import DataTables from "@/components/datatables/Datatables";
import useClientTableConfig from "../client-components/ClientColumn";
import ClientSubject from "../client-components/ClientSubject";

export default function ClientTable() {
  const { clientState } = useClient();
  const { clientColumn, filterFields } = useClientTableConfig();

  return (
    <>
      <ClientSubject />

      <DataTables
        columns={clientColumn}
        data={clientState.data}
        filterFields={filterFields}
      />
    </>
  );
}
