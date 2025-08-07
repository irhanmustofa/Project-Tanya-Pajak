// File: components/CompanyFormTabs.jsx
import {
  TabsRoot as Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InformasiPerusahaan from "./tabs/InformasiPerusahaan";
import DirekturPengurus from "./tabs/DirekturPengurus";
import PeriodeLaporan from "./tabs/PeriodeLaporan";
import TarifPPH from "./tabs/TarifPPH";
import LegalitasPerusahaan from "./tabs/LegalitasPerusahaan";
import { useState } from "react";
import { clientAll, clientCreate } from "../../client-components/ClientService";
import { useDialogDispatch } from "@/dialogs/DialogProvider";
import { dialogAction } from "@/dialogs/DialogReducer";
import {
  useClient,
  useClientDispatch,
} from "../../client-components/ClientProvider";
import ButtonSubmit from "@/components/custom/ButtonSubmit";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function ClientFormTabs({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { clientAction } = useClient();
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const [formData, setFormData] = useState({
    group_id: "",
    company_name: "",
    logo: "",
    address_company: "",
    no_npwp: "",
    no_pkp: "",
    director_name: "",
    no_ktp_director: "",
    address_director: "",
    rups_akhir_tahun: "",
    pengurus: {},
    tahun_buku: "",
    tanggal_ttd: "",
    tempat_ttd: "",
    legalitas: [],
  });

  const handleSubmit = async (e) => {
    let group_id = "";
    if (useLocalStorage.get("groupId") == "ADM00") {
      group_id = formData.group_id;
    } else {
      group_id = useLocalStorage.get("groupId");
    }
    setLoading(true);
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("group_id", group_id);
    submitData.append("company_name", formData.company_name);
    submitData.append("address_company", formData.address_company);
    submitData.append("no_npwp", formData.no_npwp);
    submitData.append("no_pkp", formData.no_pkp);
    submitData.append("director_name", formData.director_name);
    submitData.append("no_ktp_director", formData.no_ktp_director);
    submitData.append("address_director", formData.address_director);
    submitData.append("rups_akhir_tahun", formData.rups_akhir_tahun);
    submitData.append("tahun_buku", formData.tahun_buku);
    submitData.append("tanggal_ttd", formData.tanggal_ttd);
    submitData.append("tempat_ttd", formData.tempat_ttd);

    if (formData.logo && formData.logo instanceof File) {
      submitData.append("logo", formData.logo);
    }

    submitData.append("pengurus", JSON.stringify(formData.pengurus));
    submitData.append("legalitas", JSON.stringify(formData.legalitas));

    try {
      const response = await clientCreate(submitData);
      if (response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Berhasil",
            message: "Data perusahaan berhasil disimpan.",
            status: "success",
          },
        });

        const data = await clientAll();
        if (data.success) {
          window.location.reload();
          clientDispatch({ type: clientAction.SUCCESS, payload: data.data });
        }
        onClose();
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Gagal",
            message: response.message || "Gagal menyimpan data perusahaan.",
            status: "error",
          },
        });
      }
    } catch (error) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          title: "Error",
          message: "Terjadi kesalahan saat menyimpan data.",
          status: "error",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Formulir Data Perusahaan</DialogTitle>
        </DialogHeader>
        <DialogTitle>Input Data Perusahaan</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Tabs defaultValue="perusahaan" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="perusahaan">Perusahaan</TabsTrigger>
              <TabsTrigger value="direktur">Direktur & Pengurus</TabsTrigger>
              {/* <TabsTrigger value="periode">Periode Laporan</TabsTrigger>
              <TabsTrigger value="pph">Tarif PPh</TabsTrigger> */}
              <TabsTrigger value="legalitas">Legalitas</TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto h-[60vh] px-3 py-2">
              <TabsContent value="perusahaan">
                <InformasiPerusahaan
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>

              <TabsContent value="direktur">
                <DirekturPengurus
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>

              {/* <TabsContent value="periode">
                <PeriodeLaporan formData={formData} setFormData={setFormData} />
              </TabsContent> */}

              {/* <TabsContent value="pph">
                <TarifPPH formData={formData} setFormData={setFormData} />
              </TabsContent> */}

              <TabsContent value="legalitas">
                <LegalitasPerusahaan
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>
            </div>
          </Tabs>
          <DialogFooter>
            <ButtonSubmit loading={loading} title="Simpan" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
