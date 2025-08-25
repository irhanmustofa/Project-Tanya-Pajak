import {
  TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ProfilTabs from "../tabs/profil/ProfilTabs";
import { useClient } from "../perubahan-profil-components/PerubahanProfilProvider";
import AlamatTable from "../tabs/alamat/alamat-pages/AlamatTable";
import EkonomiTabs from "../tabs/ekonomi/EkonomiTabs";
import KontakTable from "../tabs/kontak/kontak-pages/KontakTable";

export default function PerubahanProfilPages() {
  const { clientState, clientAction } = useClient();
  return (
    <>
      <h1 className="text-2xl font-medium mb-10">PROFIL WAJIB PAJAK</h1>
      <TabsRoot defaultValue="alamat">
        <TabsList className="p-4 border-0">
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="profil"
          >
            Profil Wajib Pajak
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="alamat"
          >
            Alamat
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="kontak"
          >
            Kontak
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="ekonomi"
          >
            Ekonomi
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <div className=" px-6">
            <ProfilTabs />
          </div>
        </TabsContent>
        <TabsContent value="alamat">
          <AlamatTable />
        </TabsContent>
        <TabsContent value="kontak">
          <KontakTable />
        </TabsContent>
        <TabsContent value="ekonomi">
          <EkonomiTabs />
        </TabsContent>
      </TabsRoot>
    </>
  );
}
