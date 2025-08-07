import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputHorizontal } from "@/components/custom/input-custom";
import { use, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  periodeLaporanAll,
  periodeLaporanCreate,
} from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanService";
import {
  usePeriodeLaporan,
  usePeriodeLaporanDispatch,
} from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { tarifPph } from "@/helpers/variables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function PeriodeLaporanAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();
  const [fileSptSebelumnya, setFileSptSebelumnya] = useState("");
  const [fileSptBerjalan, setFileSptBerjalan] = useState("");
  const [fileSptBerikutnya, setFileSptBerikutnya] = useState("");

  const [input, setInput] = useState({});

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const periodeLaporanDispatch = usePeriodeLaporanDispatch();
  const { periodeLaporanAction } = usePeriodeLaporan();
  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      tahun_buku: "required|number",
      periode_awal: "required",
      periode_akhir: "required",
      tempat_ttd: "required|string",
      tanggal_ttd: "required",
      periode_spt_sebelumnya: "required|string",
      tarif_pph_spt_sebelumnya: "required|string",
      periode_spt_berjalan: "required|string",
      tarif_pph_spt_berjalan: "string",
      periode_spt_berikutnya: "required|string",
      tarif_pph_spt_berikutnya: "required|string",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("tahun_buku", input.tahun_buku);
      formData.append("periode_laporan", input.periode_laporan);
      formData.append(
        "periode_awal",
        new Date(input.periode_awal).toLocaleDateString("en-CA")
      );
      formData.append(
        "periode_akhir",
        new Date(input.periode_akhir).toLocaleDateString("en-CA")
      );
      formData.append("tempat_ttd", input.tempat_ttd);
      formData.append(
        "tanggal_ttd",
        new Date(input.tanggal_ttd).toLocaleDateString("en-CA")
      );
      formData.append(
        "periode_spt_sebelumnya",
        new Date(input.periode_spt_sebelumnya).toLocaleDateString("en-CA")
      );
      formData.append(
        "tarif_pph_spt_sebelumnya",
        input.tarif_pph_spt_sebelumnya
      );
      formData.append("file_spt_sebelumnya", fileSptSebelumnya);
      formData.append(
        "periode_spt_berjalan",
        new Date(input.periode_spt_berjalan).toLocaleDateString("en-CA")
      );
      formData.append("tarif_pph_spt_berjalan", input.tarif_pph_spt_berjalan);
      formData.append("file_spt_berjalan", fileSptBerjalan);
      formData.append(
        "periode_spt_berikutnya",
        new Date(input.periode_spt_berikutnya).toLocaleDateString("en-CA")
      );
      formData.append(
        "tarif_pph_spt_berikutnya",
        input.tarif_pph_spt_berikutnya
      );
      formData.append("file_spt_berikutnya", fileSptBerikutnya);

      await periodeLaporanCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Periode Laporan Success",
              message: "Periode Laporan added successfully",
              status: "success",
            },
          });

          periodeLaporanAll().then((res) => {
            if (res.success) {
              periodeLaporanDispatch({
                type: periodeLaporanAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add Periode Laporan Failed",
              message: response.message,
              status: "error",
            },
          });
          // handleOnClose();
        }
      });
    });
  };

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      {dialogState.isOpen && <DialogInfo />}
      <Dialog open={isOpen} onOpenChange={handleOnClose}>
        <DialogContent className="sm:max-w-6xl w-full max-w-full">
          <DialogTitle>Input New COA</DialogTitle>
          <DialogDescription>Add a new coa to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid gap-4 py-4 border border-gray-200 p-4 rounded-md mb-4">
              <InputHorizontal
                title="Tahun Buku"
                type="text"
                name="tahun_buku"
                onChange={(e) => {
                  handleChange("tahun_buku", e.target.value);
                  setInput({ ...input, tahun_buku: e.target.value });
                }}
                error={errors.tahun_buku}
              />
              <InputHorizontal
                title="Periode Laporan"
                type="text"
                name="periode_laporan"
                onChange={(e) => {
                  handleChange("periode_laporan", e.target.value);
                  setInput({ ...input, periode_laporan: e.target.value });
                }}
                error={errors.periode_laporan}
              />
              <InputHorizontal
                title="Periode Awal"
                type="date"
                name="periode_awal"
                onChange={(e) => {
                  handleChange("periode_awal", e.target.value);
                  setInput({ ...input, periode_awal: e.target.value });
                }}
                error={errors.periode_awal}
              />
              <InputHorizontal
                title="Periode Akhir"
                type="date"
                name="periode_akhir"
                onChange={(e) => {
                  handleChange("periode_akhir", e.target.value);
                  setInput({ ...input, periode_akhir: e.target.value });
                }}
                error={errors.periode_akhir}
              />
              <InputHorizontal
                title="Tempat TTD SPT"
                type="text"
                name="tempat_ttd"
                onChange={(e) => {
                  handleChange("tempat_ttd", e.target.value);
                  setInput({ ...input, tempat_ttd: e.target.value });
                }}
                error={errors.tempat_ttd}
              />
              <InputHorizontal
                title="Tanggal TTD SPT"
                type="date"
                name="tanggal_ttd"
                onChange={(e) => {
                  handleChange("tanggal_ttd", e.target.value);
                  setInput({ ...input, tanggal_ttd: e.target.value });
                }}
                error={errors.tanggal_ttd}
              />
            </div>
            <div className="grid gap-4 mt-4 mb-6">
              <div className="flex gap-4 py-4 border border-gray-200 p-4 rounded-md">
                <InputHorizontal
                  title="Periode SPT Sebelumnya"
                  type="date"
                  name="periode_spt_sebelumnya"
                  onChange={(e) => {
                    handleChange("periode_spt_sebelumnya", e.target.value);
                    setInput({
                      ...input,
                      periode_spt_sebelumnya: e.target.value,
                    });
                  }}
                  error={errors.periode_spt_sebelumnya}
                />
                <div className="flex col-span-3 items-center gap-2">
                  <Label>Tarif PPH SPT Seblumnya</Label>
                  <Select
                    name="tarif_pph_spt_sebelumnya"
                    onValueChange={(value) => {
                      handleChange("tarif_pph_spt_sebelumnya", value);
                      setInput({
                        ...input,
                        tarif_pph_spt_sebelumnya: value,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tarif PPh" />
                    </SelectTrigger>
                    <SelectContent>
                      {tarifPph.map((item, key) => (
                        <SelectItem key={key} value={String(item.code)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <InputHorizontal
                  title="File SPT Sebelumnya"
                  type="file"
                  name="file_spt_sebelumnya"
                  onChange={(e) => {
                    handleChange("file_spt_sebelumnya", e.target);
                    setFileSptSebelumnya(e.target.files[0]);
                  }}
                  error={errors.file_spt_sebelumnya}
                />
              </div>

              <div className="flex gap-4 py-4 border border-gray-200 p-4 rounded-md">
                <InputHorizontal
                  title="Periode SPT Berjalan"
                  type="date"
                  name="periode_spt_berjalan"
                  onChange={(e) => {
                    handleChange("periode_spt_berjalan", e.target.value);
                    setInput({
                      ...input,
                      periode_spt_berjalan: e.target.value,
                    });
                  }}
                  error={errors.periode_spt_berjalan}
                />
                <div className="flex col-span-3 items-center gap-2">
                  <Label>Tarif PPH SPT Berjalan</Label>
                  <Select
                    name="tarif_pph_spt_berjalan"
                    onValueChange={(value) => {
                      handleChange("tarif_pph_spt_berjalan", value);
                      setInput({
                        ...input,
                        tarif_pph_spt_berjalan: value,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tarif PPh" />
                    </SelectTrigger>
                    <SelectContent>
                      {tarifPph.map((item, key) => (
                        <SelectItem key={key} value={String(item.code)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <InputHorizontal
                  title="File SPT Berjalan"
                  type="file"
                  name="file_spt_berjalan"
                  onChange={(e) => {
                    handleChange("file_spt_berjalan", e.target);
                    setFileSptBerjalan(e.target.files[0]);
                  }}
                  error={errors.file_spt_berjalan}
                />
              </div>

              <div className="flex gap-4 py-4 border border-gray-200 p-4 rounded-md">
                <InputHorizontal
                  title="Periode SPT Berikutnya"
                  type="date"
                  name="periode_spt_berikutnya"
                  onChange={(e) => {
                    handleChange("periode_spt_berikutnya", e.target.value);
                    setInput({
                      ...input,
                      periode_spt_berikutnya: e.target.value,
                    });
                  }}
                  error={errors.periode_spt_berikutnya}
                />
                <div className="flex col-span-3 items-center gap-2">
                  <Label>Tarif PPH SPT Berikutnya</Label>
                  <Select
                    name="tarif_pph_spt_berikutnya"
                    onValueChange={(value) => {
                      handleChange("tarif_pph_spt_berikutnya", value);
                      setInput({
                        ...input,
                        tarif_pph_spt_berikutnya: value,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tarif PPh" />
                    </SelectTrigger>
                    <SelectContent>
                      {tarifPph.map((item, key) => (
                        <SelectItem key={key} value={String(item.code)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <InputHorizontal
                  title="File SPT Berikutnya"
                  type="file"
                  name="file_spt_sebelumnya"
                  onChange={(e) => {
                    handleChange("file_spt_sebelumnya", e.target);
                    setFileSptBerikutnya(e.target.files[0]);
                  }}
                  error={errors.file_spt_berikutnya}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" pending={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
