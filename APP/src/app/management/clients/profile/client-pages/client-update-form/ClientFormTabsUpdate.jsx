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
import { useEffect, useState } from "react";
import { clientAll, clientUpdate } from "../../client-components/ClientService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { dialogAction } from "@/dialogs/DialogReducer";
import {
  useClient,
  useClientDispatch,
} from "../../client-components/ClientProvider";

export default function ClientFormTabsUpdate({ id, onClose }) {
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { clientAction, clientState } = useClient();
  const clientDispatch = useClientDispatch();

  useEffect(() => {
    const clientData = clientState.data.find((item) => item._id === id);
    setFormData({
      group_id: clientData.group_id || "",
      company_name: clientData.company_name || "",
      logo: clientData.logo || "",
      address_company: clientData.address_company || "",
      no_npwp: clientData.no_npwp || "",
      no_pkp: clientData.no_pkp || "",
      director_name: clientData.director_name || "",
      no_ktp_director: clientData.no_ktp_director || "",
      address_director: clientData.address_director || "",
      rups_akhir_tahun: clientData.rups_akhir_tahun || "",
      legalitas: clientData.legalitas_perusahaan || [],
    });
  }, [id, clientState.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("group_id", formData.group_id);
      submitData.append("company_name", formData.company_name);
      submitData.append("address_company", formData.address_company);
      submitData.append("no_npwp", formData.no_npwp);
      submitData.append("no_pkp", formData.no_pkp);
      submitData.append("director_name", formData.director_name);
      submitData.append("no_ktp_director", formData.no_ktp_director);
      submitData.append("address_director", formData.address_director);
      submitData.append("rups_akhir_tahun", formData.rups_akhir_tahun);

      if (formData.logo && formData.logo instanceof File) {
        submitData.append("logo", formData.logo);
      } else if (formData.logo === null) {
        submitData.append("remove_logo", "true");
      } else if (typeof formData.logo === "string") {
        submitData.append("existing_logo", formData.logo);
      }

      submitData.append("legalitas", JSON.stringify(formData.legalitas || []));

      const response = await clientUpdate(id, submitData);

      if (!response.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Failed",
            message: response.message,
            status: "error",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Update Client Success",
            message: "Client updated successfully",
            status: "success",
          },
        });

        const refreshData = await clientAll();
        if (refreshData.success) {
          clientDispatch({
            type: clientAction.SUCCESS,
            payload: refreshData.data,
          });
          window.location.reload();
        }
        onClose();
      }
    } catch (error) {
      dialogDispatch({
        type: dialogAction.DIALOG_INFO,
        payload: {
          isOpen: true,
          title: "Error",
          message: "Terjadi kesalahan saat mengupdate data.",
          status: "error",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Formulir Data Perusahaan</DialogTitle>
          </DialogHeader>
          <DialogTitle>Update Data Perusahaan</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="overflow-y-auto max-h-[70vh] px-3">
              <Tabs defaultValue="perusahaan" className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="perusahaan">Perusahaan</TabsTrigger>
                  <TabsTrigger value="direktur">Kuasa Wajib Pajak</TabsTrigger>
                  <TabsTrigger value="legalitas">Legalitas</TabsTrigger>
                </TabsList>

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

                <TabsContent value="legalitas">
                  <LegalitasPerusahaan
                    formData={formData}
                    setFormData={setFormData}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Semua"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
