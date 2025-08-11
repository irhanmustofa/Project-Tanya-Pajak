import {
  TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import ProfilTabs from "./ProfilTabs";
import { useClient } from "../../perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import AlamatTabs from "./AlamatTabs";

export default function PerubahanProfilPages() {
  const { clientState, clientAction } = useClient();

  return (
    <>
      <h1 className="text-2xl font-medium mb-10">PROFIL WAJIB PAJAK</h1>
      <TabsRoot defaultValue="profil">
        <TabsList className="p-4 border-0">
          <TabsTrigger className="border rounded-full" value="profil">
            Profil Wajib Pajak
          </TabsTrigger>
          <TabsTrigger className="border rounded-full" value="alamat">
            Alamat
          </TabsTrigger>
          <TabsTrigger className="border rounded-full" value="kontak">
            Kontak
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <div className=" px-6">
            <ProfilTabs />
          </div>
        </TabsContent>
        <TabsContent value="alamat">
          <AlamatTabs />
        </TabsContent>
        <TabsContent value="kontak">
          <h1>Kontak</h1>
        </TabsContent>
      </TabsRoot>
    </>
  );
}
