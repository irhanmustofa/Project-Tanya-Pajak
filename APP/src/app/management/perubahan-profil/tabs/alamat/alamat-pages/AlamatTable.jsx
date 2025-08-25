import DataTables from "@/components/datatables/Datatables";
import useAlamatTableConfig from "../alamat-components/AlamatColumn";
import AlamatSubject from "../alamat-components/AlamatSubject";
import { dataAlamat } from "../../../data/alamatDataList";

export default function AlamatTable() {
  const { alamatColumn, filterFields } = useAlamatTableConfig();
  const data = dataAlamat();

  return (
    <>
      <AlamatSubject />

      <DataTables
        columns={alamatColumn}
        data={data}
        filterFields={filterFields}
        path="alamat-client"
      />
    </>
  );
}
