import DataTables from "@/components/datatables/Datatables";
// import useTkuTableConfig from "../tku-components/TkuColumn";
import OrangTerkaitSubject from "../tku-components/TkuSubject";
import { dataTku } from "@/app/management/perubahan-profil/data/tkuDataList";

export default function TkuTable() {
  // const { tkuColumn, filterFields } = useTkuTableConfig();
  const data = dataTku();
  return (
    <>
      <OrangTerkaitSubject />

      {/* <DataTables
        columns={tkuColumn}
        data={data}
        filterFields={filterFields}
        path="tku-client"
      /> */}
    </>
  );
}
