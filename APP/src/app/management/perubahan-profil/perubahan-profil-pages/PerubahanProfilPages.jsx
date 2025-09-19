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
import BankTable from "../tabs/bank/bank-pages/BankTable";
import NomorEksternalTable from "../tabs/nomor-eksternal/nomor-eksternal-pages/NomorEksternalTable";
import KeluargaTable from "../tabs/keluarga/keluarga-pages/KeluargaTable";

export default function PerubahanProfilPages() {
  const { clientState } = useClient();
  return (
    <>
      <h1 className="text-2xl font-medium mb-10">PROFIL WAJIB PAJAK</h1>
      <TabsRoot defaultValue="unit-keluarga">
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
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="bank"
          >
            Bank
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="nomor-eksternal"
          >
            Nomor Identifikasi Eksternal
          </TabsTrigger>
          <TabsTrigger
            className="border rounded-full xl:text-[14px] text-[10px]"
            value="unit-keluarga"
          >
            Unit Keluarga
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
        <TabsContent value="bank">
          <BankTable bankState={clientState?.data[0].data_bank ?? []} />
        </TabsContent>
        <TabsContent value="nomor-eksternal">
          <NomorEksternalTable
            nomorEksternalState={clientState?.data[0].nomor_eksternal ?? []}
          />
        </TabsContent>
        <TabsContent value="unit-keluarga">
          <KeluargaTable
            keluargaState={clientState?.data[0].data_keluarga ?? []}
          />
        </TabsContent>
      </TabsRoot>
    </>
  );
}
