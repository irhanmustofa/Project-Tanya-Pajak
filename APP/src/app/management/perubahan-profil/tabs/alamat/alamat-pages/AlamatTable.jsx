import DataTables from "@/components/datatables/Datatables";
import useAlamatTableConfig from "../alamat-components/AlamatColumn";
import AlamatSubject from "../alamat-components/AlamatSubject";

export default function AlamatTable({ clientState = {} }) {
  const { alamatColumn, filterFields } = useAlamatTableConfig();
  console.log("table-data:", clientState.data[0]);
  return (
    <>
      <AlamatSubject />

      <DataTables
        columns={alamatColumn}
        data={
          clientState?.data[0]?.alamat.length > 0
            ? clientState?.data[0]?.alamat
            : []
        }
        filterFields={filterFields}
      />
    </>
  );
}
