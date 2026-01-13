import DataTables from "@/components/datatables/Datatables";
import useAlamatTableConfig from "../alamat-components/AlamatColumn";
import AlamatSubject from "../alamat-components/AlamatSubject";
import { alamatDataStructure } from "../../../data/alamatDataList";

export default function AlamatTable({ alamatState = [] }) {
  const { alamatColumn, filterFields } = useAlamatTableConfig();
  const data = alamatDataStructure(alamatState);

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
