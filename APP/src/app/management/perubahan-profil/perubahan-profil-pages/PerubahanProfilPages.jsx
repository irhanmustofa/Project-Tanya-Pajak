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
import OrangTerkaitTable from "../tabs/orang-terkait/orang-terkait-pages/OrangTerkaitTable";
import TkuTable from "../tabs/tku/tku-pages/TkuTable";

export default function PerubahanProfilPages() {
  return (
    <>
      <h1 className="text-2xl font-medium mb-10">PROFIL WAJIB PAJAK</h1>
      <TabsRoot defaultValue="tku">
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
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="orang-terkait"
          >
            Orang Terkait
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="tku"
          >
            TKU
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
        <TabsContent value="orang-terkait">
          <OrangTerkaitTable />
        </TabsContent>
        <TabsContent value="tku">
          <TkuTable />
        </TabsContent>
      </TabsRoot>
    </>
  );
}
