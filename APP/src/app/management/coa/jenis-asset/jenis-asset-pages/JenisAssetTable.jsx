import { useJenisAsset } from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetProvider";
import DataTables from "@/components/datatables/Datatables";
import useJenisAssetTableConfig from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetColumn";
import JenisAssetSubject from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetSubject";

export default function JenisAssetTable() {
  const { jenisAssetState } = useJenisAsset();
  const { jenisAssetColumn, filterFields } = useJenisAssetTableConfig();
  return (
    <>
      <JenisAssetSubject />

      <DataTables
        columns={jenisAssetColumn}
        data={jenisAssetState.data}
        filterFields={filterFields}
      />
    </>
  );
}
