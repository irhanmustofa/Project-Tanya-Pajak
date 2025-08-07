import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useClient } from "../../client-components/ClientProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProfilePDF from "./ProfilePDF";

const ProfilePeriodeList = ({ onClose }) => {
  const { clientState, clientPeriodeLaporan } = useClient();
  const id = useLocalStorage.get("clientId");
  const [clientProfile, setClientProfile] = useState({});
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(true);
  const [pdfSohw, setPdfShow] = useState(false);

  const handleClosePDF = () => {
    setPdfShow(false);
  };

  useEffect(() => {
    if (clientState?.data && Array.isArray(clientState.data) && id) {
      const foundClient = clientState.data.find((item) => item._id === id);
      if (foundClient) {
        setClientProfile(foundClient);
      }
    }
    setLoading(false);
  }, [id, clientState?.data]);

  const handleCloseDialog = () => {
    if (onClose) onClose();
  };
  const handlePeriodeChange = (value) => {
    setSelectedPeriode(value);
    setPdfShow(true);
  };
  return (
    <>
      <Dialog open={true} onOpenChange={handleCloseDialog}>
        <DialogContent className="w-1/4 h-auto max-w-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <DialogTitle>Set Periode Laporan</DialogTitle>
              <DialogDescription>
                Pilih periode laporan untuk{" "}
                {clientProfile.company_name || "Perusahaan"}.
              </DialogDescription>
            </div>
          </div>
          <div className="p-4">
            <Select value={selectedPeriode} onValueChange={handlePeriodeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Periode Laporan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {clientPeriodeLaporan?.map((periode) => (
                    <SelectItem key={periode._id} value={periode._id}>
                      {periode.tahun_buku} (
                      {new Date(periode.periode_awal).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      s.d.{" "}
                      {new Date(periode.periode_akhir).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                      )
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {pdfSohw && (
        <ProfilePDF periode={selectedPeriode} onClose={handleClosePDF} />
      )}
    </>
  );
};

export default ProfilePeriodeList;
