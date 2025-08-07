import { useMasterAsset } from "../master-asset-components/MasterAssetProvider";
import DataTables from "@/components/datatables/Datatables";
import useMasterAssetTableConfig from "../master-asset-components/MasterAssetColumn";
import MasterAssetSubject from "../master-asset-components/MasterAssetSubject";

export default function MasterAssetTable() {
  const { masterAssetState } = useMasterAsset();
  const { masterAssetColumn, filterFields } = useMasterAssetTableConfig();

  return (
    <>
      <MasterAssetSubject />

      <DataTables
        columns={masterAssetColumn}
        data={masterAssetState.data}
        filterFields={filterFields}
      />
    </>
  );
}
