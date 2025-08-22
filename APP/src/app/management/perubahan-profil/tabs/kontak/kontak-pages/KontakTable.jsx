import DataTables from "@/components/datatables/Datatables";
import useKontakTableConfig from "../kontak-components/KontakColumn";
import KontakSubject from "../kontak-components/KontakSubject";

export default function KontakTable({ clientState = {} }) {
  const { kontakColumn, filterFields } = useKontakTableConfig();
  const dataKontak = clientState?.data[0]?.data_kontak ?? [];
  return (
    <>
      <KontakSubject />

      <DataTables
        columns={kontakColumn}
        data={dataKontak}
        filterFields={filterFields}
        path="kontak-client"
      />
    </>
  );
}
