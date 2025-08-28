import DataTables from "@/components/datatables/Datatables";
import useOrangTerkaitTableConfig from "../orang-terkait-components/OrangTerkaitColumn";
import OrangTerkaitSubject from "../orang-terkait-components/OrangTerkaitSubject";
import { dataOrangTerkait } from "@/app/management/perubahan-profil/data/orangTerkaitDataList";

export default function OrangTerkaitTable() {
  const { orangTerkaitColumn, filterFields } = useOrangTerkaitTableConfig();
  const data = dataOrangTerkait();
  return (
    <>
      <OrangTerkaitSubject />

      <DataTables
        columns={orangTerkaitColumn}
        data={data}
        filterFields={filterFields}
        path="orang-terkait-client"
      />
    </>
  );
}
