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
import { useCoa, useCoaDispatch } from "../coa-components/CoaProvider";
import { LucideUserPlus2 } from "lucide-react";
import { coaUpdate } from "../coa-components/CoaService";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import { useValidateInput } from "@/hooks/use-validate-input";
import { coaAll } from "../coa-components/CoaService";
import { coaGroup, coaHead, jenisAsset } from "@/helpers/variables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { coaGroupAll } from "../../group/coa-group-components/CoaGroupService";
import { coaHeadAll } from "../../head/coa-head-components/CoaHeadService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserUpdateForm({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [isPending, startTransition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaDispatch = useCoaDispatch();
  const { coaAction, coaState } = useCoa();
  const [groupAkun, setGroupAkun] = useState("");
  const [coaKodeAkun, setCoaKodeAkun] = useState("");
  const [coaGroupState, setCoaGroupState] = useState([]);
  const [coaHeadState, setCoaHeadState] = useState([]);

  const { errors, handleChange } = useValidateInput({
    schema: {
      nama_akun: "required|string|min:3",
      kode_akun: "required|string|max:3",
      kode_head: "required|string",
      jenis_asset: "required|string",
      kode_group: "required|string",
    },
  });

  useEffect(() => {
    coaGroupAll().then((res) => {
      if (res.success) {
        setCoaGroupState(res.data);
      }
    });

    coaHeadAll().then((res) => {
      if (res.success) {
        setCoaHeadState(res.data);
      }
    });

    const coa = coaState.data.find((item) => item._id === id);
    setInput({
      nama_akun: coa.nama_akun,
      kode_akun: coa.kode_akun.substring(4),
      kode_head: coa.kode_head,
      jenis_asset: coa.jenis_asset,
      kode_group: coa.kode_group,
      klasifikasi_pajak: coa.klasifikasi_pajak,
      pph: coa.pph,
      laba_kotor: coa.laba_kotor,
      ebt: coa.ebt,
      arus_bank: coa.arus_bank,
      cf: coa.cf,
    });

    setGroupAkun(String(coa.kode_group));

    setIsOpen(true);
  }, [id, coaState.data]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("nama_akun", input.nama_akun);
      formData.append("kode_akun", input.kode_head + input.kode_akun);
      formData.append("kode_head", input.kode_head);
      formData.append("jenis_asset", input.jenis_asset);
      formData.append("kode_group", groupAkun);

      formData.append("klasifikasi_pajak", input.klasifikasi_pajak);
      formData.append("pph", input.pph);
      formData.append("laba_kotor", input.laba_kotor);
      formData.append("ebt", input.ebt);
      formData.append("arus_bank", input.arus_bank);
      formData.append("cf", input.cf);

      await coaUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update COA Failed",
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
              title: "Update COA Success",
              message: "COA updated successfully",
              status: "success",
            },
          });

          coaAll().then((res) => {
            if (res.success) {
              coaDispatch({
                type: coaAction.SUCCESS,
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
              Update COA {input.nama_akun || ""}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogTitle>Update COA</DialogTitle>
            <DialogDescription>
              Make changes an existing account.
            </DialogDescription>
            <form onSubmit={inputHandler}>
              <div className="grid grid-cols-4 gap-4 py-4">
                <div className="col-span-2">
                  <h1>Group</h1>
                  <Select name="kode_group" value={groupAkun} disabled={true}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {coaGroupState.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode_group)}>
                            {item.kode_group + "-" + item.nama_group}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <h1>Head</h1>
                  <Select
                    name="kode_head"
                    defaultValue={input.kode_head}
                    onValueChange={(e) => {
                      handleChange("kode_head", e);
                      setInput({ ...input, kode_head: e });
                      setGroupAkun(String(e.charAt(0) + "000"));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Head" />
                    </SelectTrigger>
                    <SelectContent>
                      {coaHeadState.map((item, key) => {
                        return (
                          <SelectItem key={key} value={String(item.kode_head)}>
                            {item.kode_head + "-" + item.nama_head}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.kode_head}
                </div>

                <div className="col-span-2">
                  <InputVertical
                    title="Jenis Asset"
                    value={input.jenis_asset}
                    name="jenis_asset"
                    onChange={(e) => {
                      handleChange("jenis_asset", e.target.value);
                      setInput({
                        ...input,
                        jenis_asset: e.target.value,
                      });
                    }}
                    error={errors.jenis_asset}
                  />
                </div>

                <div class="col-span-2">
                  <Label htmlFor="kode_akun" className="col-span-3 ">
                    Kode Akun
                  </Label>
                  <div class="grid grid-cols-8  items-center rounded-md">
                    <Input
                      className="rounded-none rounded-l-lg col-span-2 bg-slate-500"
                      type="text"
                      Value={input.kode_head}
                      readonly={true}
                    />
                    <Input
                      className="col-span-6 rounded-none rounded-r-lg"
                      type="text"
                      name="kode_akun"
                      onChange={(e) => {
                        handleChange("kode_akun", e.target.value);
                        setInput({ ...input, kode_akun: e.target.value });
                      }}
                      error={errors.kode_akun}
                      Value={input.kode_akun}
                    />
                  </div>
                </div>

                <div class="col-span-2">
                  <InputVertical
                    title="Nama Akun"
                    type="text"
                    name="nama_akun"
                    onChange={(e) => {
                      handleChange("nama_akun", e.target.value);
                      setInput({ ...input, nama_akun: e.target.value });
                    }}
                    error={errors.nama_akun}
                    Value={input.nama_akun}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="Klasifikasi Pajak"
                    type="number"
                    name="klasifikasi_pajak"
                    onChange={(e) =>
                      handleChange("klasifikasi_pajak", e.target.value)
                    }
                    value={input.klasifikasi_pajak}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="PPh"
                    type="text"
                    name="pph"
                    onChange={(e) => handleChange("pph", e.target.value)}
                    value={input.pph}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="Laba Kotor"
                    type="text"
                    name="laba_kotor"
                    onChange={(e) => handleChange("laba_kotor", e.target.value)}
                    value={input.laba_kotor}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="EBT"
                    type="text"
                    name="ebt"
                    onChange={(e) => handleChange("ebt", e.target.value)}
                    value={input.laba_kotor}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="Arus Bank"
                    type="text"
                    name="arus_bank"
                    onChange={(e) => handleChange("arus_bank", e.target.value)}
                    value={input.arus_bank}
                  />
                </div>
                <div className="col-span-2">
                  <InputVertical
                    title="CF"
                    type="text"
                    name="cf"
                    onChange={(e) => handleChange("cf", e.target.value)}
                    value={input.cf}
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
