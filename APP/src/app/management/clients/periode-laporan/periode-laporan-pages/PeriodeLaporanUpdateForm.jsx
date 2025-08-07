import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import {
  usePeriodeLaporan,
  usePeriodeLaporanDispatch,
} from "../periode-laporan-components/PeriodeLaporanProvider";
import { LucideUserPlus2 } from "lucide-react";
import { periodeLaporanUpdate } from "../periode-laporan-components/PeriodeLaporanService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { InputHorizontal } from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { periodeLaporanAll } from "../periode-laporan-components/PeriodeLaporanService";
import { dateStrip } from "@/components/custom/DateFormatted";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { tarifPph } from "@/helpers/variables";

export default function PeriodeLaporanUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const PeriodeLaporanDispatch = usePeriodeLaporanDispatch();
  const { periodeLaporanAction, periodeLaporanGroup, periodeLaporanState } =
    usePeriodeLaporan();
  const [fileSptSebelumnya, setFileSptSebelumnya] = useState("");
  const [fileSptBerjalan, setFileSptBerjalan] = useState("");
  const [fileSptBerikutnya, setFileSptBerikutnya] = useState("");

  const { errors, handleChange } = useValidateInput({
    schema: {
      tahun_buku: "required|number",
      periode_awal: "required",
      periode_akhir: "required",
      tempat_ttd: "required|string",
      tanggal_ttd: "required",
    },
  });

  useEffect(() => {
    const periodeLaporan = periodeLaporanState.data.find(
      (item) => item._id === id
    );
    setInput({
      tahun_buku: periodeLaporan.tahun_buku,
      periode_laporan: periodeLaporan.periode_laporan,
      periode_awal: periodeLaporan.periode_awal,
      periode_akhir: periodeLaporan.periode_akhir,
      tempat_ttd: periodeLaporan.tempat_ttd,
      tanggal_ttd: periodeLaporan.tanggal_ttd,
      periode_spt_sebelumnya: periodeLaporan.periode_spt_sebelumnya,
      tarif_pph_spt_sebelumnya: periodeLaporan.tarif_pph_spt_sebelumnya,
      periode_spt_berjalan: periodeLaporan.periode_spt_berjalan,
      tarif_pph_spt_berjalan: periodeLaporan.tarif_pph_spt_berjalan,
      periode_spt_berikutnya: periodeLaporan.periode_spt_berikutnya,
      tarif_pph_spt_berikutnya: periodeLaporan.tarif_pph_spt_berikutnya,
    });
    setIsOpen(true);
  }, [id, periodeLaporanState.data]);
  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
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

      await periodeLaporanUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Periode Laporan Failed",
              message: response.message,
              status: "error",
            },
          });

          handleCloseDialog();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Periode Laporan Success",
              message: "Periode Laporan updated successfully",
              status: "success",
            },
          });

          periodeLaporanAll().then((res) => {
            if (res.success) {
              PeriodeLaporanDispatch({
                type: periodeLaporanAction.SUCCESS,
                payload: res.data,
              });
            }
          });

          handleCloseDialog();
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
    onClose();
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LucideUserPlus2 className="mr-2 h-4 w-4" />
              Update Periode Laporan {input.tahun_buku || ""}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-6xl w-full max-w-full">
            <DialogTitle>Update Periode Laporan</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid gap-4 py-4 border border-gray-200 p-4 rounded-md mb-4">
                <InputHorizontal
                  title="Tahun Buku"
                  type="number"
                  name="tahun_buku"
                  value={input.tahun_buku}
                  onChange={(e) => {
                    setInput({ ...input, tahun_buku: e.target.value });
                    handleChange("tahun_buku", e.target.value);
                  }}
                  error={errors.tahun_buku}
                />

                <InputHorizontal
                  title="Periode Awal"
                  type="date"
                  name="periode_awal"
                  value={dateStrip(new Date(input.periode_awal))}
                  onChange={(e) => {
                    setInput({ ...input, periode_awal: e.target.value });
                    handleChange("periode_awal", e.target.value);
                  }}
                  error={errors.periode_awal}
                />

                <InputHorizontal
                  title="Periode Akhir"
                  type="date"
                  name="periode_akhir"
                  value={dateStrip(new Date(input.periode_akhir))}
                  onChange={(e) => {
                    setInput({ ...input, periode_akhir: e.target.value });
                    handleChange("periode_akhir", e.target.value);
                  }}
                  error={errors.periode_akhir}
                />

                <InputHorizontal
                  title="Tempat TTD SPT"
                  type="text"
                  name="tempat_ttd"
                  value={input.tempat_ttd}
                  onChange={(e) => {
                    setInput({ ...input, tempat_ttd: e.target.value });
                    handleChange("tempat_ttd", e.target.value);
                  }}
                  error={errors.tempat_ttd}
                />
                <InputHorizontal
                  title="Tanggal TTD SPT"
                  type="date"
                  name="tanggal_ttd"
                  value={dateStrip(new Date(input.tanggal_ttd))}
                  onChange={(e) => {
                    setInput({ ...input, tanggal_ttd: e.target.value });
                    handleChange("tanggal_ttd", e.target.value);
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
                    value={dateStrip(new Date(input.periode_spt_sebelumnya))}
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
                      value={input.tarif_pph_spt_sebelumnya || ""}
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
                    value={dateStrip(new Date(input.periode_spt_berjalan))}
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
                      value={input.tarif_pph_spt_berjalan || ""}
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
                    value={dateStrip(new Date(input.periode_spt_berikutnya))}
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
                      value={input.tarif_pph_spt_berikutnya || ""}
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
                    name="file_spt_berikutnya"
                    onChange={(e) => {
                      handleChange("file_spt_berikutnya", e.target);
                      setFileSptBerikutnya(e.target.files[0]);
                    }}
                    error={errors.file_spt_berikutnya}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" pending={isPending}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
