import MainPage from "@/layouts/MainPage";
import JenisAssetProvider from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetProvider";
import JenisAssetTable from "@/app/management/coa/jenis-asset/jenis-asset-pages/JenisAssetTable";

export default function Users() {
  return (
    <>
      <MainPage>
        <JenisAssetProvider>
          <JenisAssetTable />
        </JenisAssetProvider>
      </MainPage>
    </>
  );
}
