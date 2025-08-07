import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import { useEffect, useState, useTransition } from "react";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  coaAll,
  coaCreate,
} from "@/app/management/coa/master/coa-components/CoaService";
import {
  useCoa,
  useCoaDispatch,
} from "@/app/management/coa/master/coa-components/CoaProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { jenisAsset } from "@/helpers/variables";
import { coaGroupAll } from "../../group/coa-group-components/CoaGroupService";
import { coaHeadAll } from "../../head/coa-head-components/CoaHeadService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserAddForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTrasition] = useTransition();

  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const coaDispatch = useCoaDispatch();
  const { coaAction } = useCoa();
  const [coaGroupState, setCoaGroupState] = useState([]);
  const [coaHeadState, setCoaHeadState] = useState([]);
  const [coaKodeAkun, setCoaKodeAkun] = useState("");
  const [groupAkun, setGroupAkun] = useState("");

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
  }, []);

  const { valid, handleChange, errors } = useValidateInput({
    schema: {
      nama_akun: "required|min:3",
      kode_akun: "required|max:3",
      kode_head: "required",
      kode_group: "required",
      jenis_asset: "required",
    },
  });

  const inputHandler = (event) => {
    event.preventDefault();

    startTrasition(async () => {
      const formData = new FormData();
      formData.append("nama_akun", event.target.nama_akun.value);
      formData.append(
        "kode_akun",
        event.target.kode_head.value + event.target.kode_akun.value
      );
      formData.append("kode_head", event.target.kode_head.value);
      formData.append("jenis_asset", event.target.jenis_asset.value);
      formData.append("kode_group", event.target.kode_group.value);
      formData.append(
        "klasifikasi_pajak",
        event.target.klasifikasi_pajak.value ?? ""
      );
      formData.append("pph", event.target.pph.value ?? "");
      formData.append("laba_kotor", event.target.laba_kotor.value ?? "");
      formData.append("ebt", event.target.ebt.value ?? "");
      formData.append("arus_bank", event.target.arus_bank.value ?? "");
      formData.append("cf", event.target.cf.value ?? "");

      await coaCreate(formData).then((response) => {
        if (response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Success",
              message: "COA added successfully",
              status: "success",
            },
          });

          coaAll().then((res) => {
            if (res.success) {
              coaDispatch({ type: coaAction.SUCCESS, payload: res.data });
            }
          });

          handleOnClose();
        } else {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              show: true,
              title: "Add COA Failed",
              message: response.message,
              status: "error",
            },
          });
          handleOnClose();
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Input New COA</DialogTitle>
          <DialogDescription>Add a new coa to the system.</DialogDescription>
          <form onSubmit={inputHandler}>
            <div className="grid grid-cols-4 gap-4 py-4">
              <div className="col-span-4 lg:col-span-2">
                <h1>
                  Group{" "}
                  <span className="text-[12px] border border-sky-400/50 px-1 rounded-sm">
                    auto
                  </span>
                </h1>
                <Select
                  name="kode_group"
                  value={groupAkun}
                  disabled={true}
                  onValueChange={(e) => handleChange("kode_group", e)}
                >
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
                {errors.kode_group}
              </div>

              <div className="col-span-4 lg:col-span-2">
                <h1>Head</h1>
                <Select
                  Value={"" || undefined}
                  name="kode_head"
                  onValueChange={(e) => {
                    setCoaKodeAkun(e);
                    setGroupAkun(String(e.charAt(0) + "000"));
                    handleChange("kode_head", e);
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

              <div className="col-span-4 lg:col-span-2">
                <h1>Jenis Asset</h1>
                <Select
                  name="jenis_asset"
                  onValueChange={(e) => handleChange("jenis_asset", e)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisAsset.map((item, key) => {
                      return (
                        <SelectItem key={key} value={String(item.jenis_asset)}>
                          {item.jenis_asset}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.jenis_asset}
              </div>

              <div className="col-span-4 lg:col-span-2">
                <Label htmlFor="kode_akun" className="col-span-3 ">
                  Kode Akun
                </Label>
                <div class="grid grid-cols-8  items-center rounded-md">
                  <Input
                    className="rounded-none rounded-l-lg col-span-2 bg-slate-500"
                    type="text"
                    value={coaKodeAkun}
                    readonly={true}
                  />
                  <Input
                    className="col-span-6 rounded-none rounded-r-lg"
                    type="text"
                    name="kode_akun"
                    onChange={(e) => handleChange("kode_akun", e.target.value)}
                    error={errors.kode_akun}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <InputVertical
                  title="Nama Akun"
                  type="text"
                  name="nama_akun"
                  onChange={(e) => handleChange("nama_akun", e.target.value)}
                  error={errors.nama_akun}
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
                />
              </div>
              <div className="col-span-2">
                <InputVertical
                  title="PPh"
                  type="text"
                  name="pph"
                  onChange={(e) => handleChange("pph", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <InputVertical
                  title="Laba Kotor"
                  type="text"
                  name="laba_kotor"
                  onChange={(e) => handleChange("laba_kotor", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <InputVertical
                  title="EBT"
                  type="text"
                  name="ebt"
                  onChange={(e) => handleChange("ebt", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <InputVertical
                  title="Arus Bank"
                  type="text"
                  name="arus_bank"
                  onChange={(e) => handleChange("arus_bank", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <InputVertical
                  title="CF"
                  type="text"
                  name="cf"
                  onChange={(e) => handleChange("cf", e.target.value)}
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
