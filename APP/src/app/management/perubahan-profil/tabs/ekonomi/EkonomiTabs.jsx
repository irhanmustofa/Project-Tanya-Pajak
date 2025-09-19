import { InputVertical } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useEffect, useState, useTransition } from "react";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../../perubahan-profil-components/PerubahanProfilProvider";
import { clientFirst } from "../../perubahan-profil-components/PerubahanProfilService";
import { ekonomiClientUpdate } from "./ekonomi-components/EkonomiService";
import {
  jumlahKaryawan,
  mataUang,
  metodePembukuan,
  omsetOption,
  periodePembukuan,
} from "@/helpers/variables";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilTabs() {
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const { clientState, clientAction } = useClient();
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();
  const getData = clientState.data[0] ?? {};

  const { errors, handleChange } = useValidateInput({
    schema: {
      merek: "string",
      jumlah_karyawan: "string",
      metode_pembukuan: "string",
      mata_uang_pembukuan: "string",
      periode_pembukuan: "string",
      omset_pertahun: "string",
      bruto: "string",
    },
  });

  useEffect(() => {
    if (getData) {
      setInput({
        merek: getData.merek,
        jumlah_karyawan: getData.jumlah_karyawan,
        metode_pembukuan: getData.metode_pembukuan,
        mata_uang_pembukuan: getData.mata_uang_pembukuan,
        periode_pembukuan: getData.periode_pembukuan,
        omset_pertahun: getData.omset_pertahun,
        bruto: getData.bruto,
      });
    }
  }, [getData]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("merek", input.merek);
      formData.append("jumlah_karyawan", input.jumlah_karyawan);
      formData.append("metode_pembukuan", input.metode_pembukuan);
      formData.append("mata_uang_pembukuan", input.mata_uang_pembukuan);
      formData.append("periode_pembukuan", input.periode_pembukuan);
      formData.append("omset_pertahun", input.omset_pertahun);
      formData.append("bruto", input.bruto);
      console.log("input:", input);

      await ekonomiClientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Data Ekonomi Failed",
              message: response.message,
              status: "error",
            },
          });
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Data Ekonomi Success",
              message: "Data Ekonomi updated successfully",
              status: "success",
            },
          });
          clientFirst(id)
            .then((res) => {
              if (res.success) {
                clientDispatch({
                  type: clientAction.SUCCESS,
                  payload: res.data,
                });
              }
            })
            .catch((err) => {
              console.log("err:", err);
            });
        }
      });
    });
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <form onSubmit={inputHandler}>
        <div className="grid md:grid-cols-1 grid-cols-3 2xl:ml-40   2xl:mr-40  ">
          <div className="md:col-span-2 col-span-full">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="grid xl:grid-cols-4 grid-cols-1 gap-2 items-center content-between justify-center w-full">
                <h1 className="text-[14px] font-medium col-span-3">Merek</h1>
                <div className="col-span-1">
                  <Input
                    name="merek"
                    title="Merek"
                    value={String(input.merek)}
                    onChange={(e) => {
                      handleChange("merek", e.target.value);
                      setInput({ ...input, merek: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div>
                <Label>Jumlah Karyawan</Label>
                <Select
                  name="jumlah_karyawan"
                  value={String(input.jumlah_karyawan)}
                  onValueChange={(e) => {
                    handleChange("jumlah_karyawan", e);
                    setInput({ ...input, jumlah_karyawan: e });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {jumlahKaryawan.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.kode)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Metode Pembukuan</Label>
                <Select
                  name="metode_pembukuan"
                  value={String(input.metode_pembukuan)}
                  onValueChange={(e) => {
                    handleChange("metode_pembukuan", e);
                    setInput({ ...input, metode_pembukuan: e });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {metodePembukuan.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.kode)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Mata Uang Pembukuan</Label>
                <Select
                  name="mata_uang_pembukuan"
                  value={String(input.mata_uang_pembukuan)}
                  onValueChange={(e) => {
                    handleChange("mata_uang_pembukuan", e);
                    setInput({ ...input, mata_uang_pembukuan: e });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {mataUang.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.kode)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Periode Pembukuan</Label>
                <Select
                  name="periode_pembukuan"
                  value={String(input.periode_pembukuan)}
                  onValueChange={(e) => {
                    handleChange("periode_pembukuan", e);
                    setInput({ ...input, periode_pembukuan: e });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodePembukuan.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.kode)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Omset Per Tahun</Label>
                <Select
                  name="omset_pertahun"
                  value={String(input.omset_pertahun)}
                  onValueChange={(e) => {
                    handleChange("omset_pertahun", e);
                    setInput({ ...input, omset_pertahun: e });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {omsetOption.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.kode)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <InputVertical
                name="bruto"
                type="number"
                value={String(input.bruto)}
                title="Jumlah Peredaran Bruto"
                onChange={(e) => {
                  handleChange("bruto", e.target.value);
                  setInput({ ...input, bruto: e.target.value });
                }}
              />
            </div>
            <div>
              <div className="float-end">
                <Button pending={isPending} className="px-10 rounded-full">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
