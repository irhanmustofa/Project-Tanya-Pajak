import DataTables from "@/components/datatables/Datatables";
import useKontakTableConfig from "../kontak-components/KontakColumn";
import KontakSubject from "../kontak-components/KontakSubject";
import { dataKontak } from "@/app/management/perubahan-profil/data/kontakDataList";

export default function KontakTable() {
  const { kontakColumn, filterFields } = useKontakTableConfig();
  const data = dataKontak();

  return (
    <>
      <KontakSubject />

      <DataTables
        columns={kontakColumn}
        data={data}
        filterFields={filterFields}
        path="kontak-client"
      />
    </>
  );
}
