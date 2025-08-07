import MainPage from "@/layouts/MainPage";
import MasterAssetProvider from "@/app/asset/master-asset/master-asset-components/MasterAssetProvider";
import MasterAssetTable from "@/app/asset/master-asset/master-asset-pages/MasterAssetTable";

export default function MasterAsset() {
  return (
    <>
      <MainPage>
        <MasterAssetProvider>
          <MasterAssetTable />
        </MasterAssetProvider>
      </MainPage>
    </>
  );
}
