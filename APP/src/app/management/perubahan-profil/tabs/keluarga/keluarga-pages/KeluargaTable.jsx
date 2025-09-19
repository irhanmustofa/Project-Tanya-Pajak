import DataTables from "@/components/datatables/Datatables";
// import useKeluargaTableConfig from "../keluarga-components/keluargaColumn";
import KeluargaSubject from "../keluarga-components/KeluargaSubject";
import keluargaDataStructure from "../../../data/keluargaDataList";

export default function KeluargaTable({ keluargaState = [] }) {
  // const { keluargaColumn, filterFields } = useKeluargaTableConfig();
  const data = keluargaDataStructure(keluargaState);

  return (
    <>
      <KeluargaSubject />

      {/* <DataTables
        columns={keluargaColumn}
        data={data}
        filterFields={filterFields}
        path="bank-client"
      /> */}
    </>
  );
}
