import DataTables from "@/components/datatables/Datatables";
import useNomorEksternalTableConfig from "../nomor-eksternal-components/nomorEksternalColumn";
import NomorEksternalSubject from "../nomor-eksternal-components/NomorEksternalSubject";
import NomorEksternalDataStructure from "../../../data/nomorEksternalDataList";

export default function NomorEksternalTable({ nomorEksternalState = [] }) {
  const { nomorEksternalColumn, filterFields } = useNomorEksternalTableConfig();
  const data = NomorEksternalDataStructure(nomorEksternalState);

  return (
    <>
      <NomorEksternalSubject />

      <DataTables
        columns={nomorEksternalColumn}
        data={data}
        filterFields={filterFields}
        path="nomor-eksternal-client"
      />
    </>
  );
}
