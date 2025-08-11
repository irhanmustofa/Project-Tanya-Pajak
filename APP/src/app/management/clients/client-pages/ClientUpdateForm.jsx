import ClientProvider from "@/app/management/clients/client-components/ClientProvider";
import MainPage from "@/layouts/MainPage";

import {
  TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import ProfilTabs from "../client-tabs/ProfilTabs";

export default function ClientUpdateForm() {
  return (
    <>
      <MainPage>
        <ClientProvider>
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
                <ProfilTabs data={[]} />
              </div>
            </TabsContent>
            <TabsContent value="alamat">
              <h1>Alamat</h1>
            </TabsContent>
            <TabsContent value="kontak">
              <h1>Kontak</h1>
            </TabsContent>
          </TabsRoot>
        </ClientProvider>
      </MainPage>
    </>
  );
}
