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
import {
  jenisWpOption,
  kppOption,
  badanHukumOption,
  statusNpwpOption,
  kluOption,
} from "@/helpers/variables";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../perubahan-profil-components/PerubahanProfilProvider";
import {
  clientFirst,
  clientUpdate,
} from "../perubahan-profil-components/PerubahanProfilService";
import { dateShort, dateStrip } from "@/components/custom/DateFormatted";

export default function ProfilTabs() {
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const { clientState, clientAction } = useClient();
  const [input, setInput] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const getData = clientState.data[0] ?? {};

  const { errors, handleChange } = useValidateInput({
    schema: {
      company_name: "required|string|min:5",
      company_npwp: "string|min:16",
      kegiatan_utama: "string",
      jenis_wp: "number",
      bentuk_badan_hukum: "number",
      status_npwp: "number",
      tanggal_pengukuhan_pkp: "string",
      status_pkp: "number",
      kantor_wilayah_djp: "string",
      kantor_pelayanan_pajak: "string",
      seksi_pengawasan: "string",
      kode_klu: "string",
    },
  });

  useEffect(() => {
    if (clientState.success) {
      setInput({
        company_name: getData.company_name,
        company_npwp: getData.company_npwp,
        kegiatan_utama: getData.kegiatan_utama,
        jenis_wp: getData.jenis_wp,
        bentuk_badan_hukum: getData.bentuk_badan_hukum,
        status_npwp: getData.status_npwp,
        tanggal_pengukuhan_pkp: getData.tanggal_pengukuhan_pkp,
        status_pkp: getData.status_pkp,
        kantor_wilayah_djp: getData.kantor_wilayah_djp,
        kantor_pelayanan_pajak: getData.kantor_pelayanan_pajak,
        seksi_pengawasan: getData.seksi_pengawasan,
        kode_klu: getData.kode_klu,
      });
    }
    setIsOpen(true);
  }, [getData, isOpen]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("company_name", input.company_name);
      formData.append("company_npwp", input.company_npwp);
      formData.append("kegiatan_utama", input.kegiatan_utama);
      formData.append("jenis_wp", input.jenis_wp);
      formData.append("bentuk_badan_hukum", input.bentuk_badan_hukum);
      formData.append("status_npwp", input.status_npwp);
      formData.append("tanggal_pengukuhan_pkp", input.tanggal_pengukuhan_pkp);
      formData.append("status_pkp", input.status_pkp);
      formData.append("kantor_wilayah_djp", input.kantor_wilayah_djp);
      formData.append("kantor_pelayanan_pajak", input.kantor_pelayanan_pajak);
      formData.append("seksi_pengawasan", input.seksi_pengawasan);
      formData.append("kode_klu", input.kode_klu);

      await clientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update Profil Failed",
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
              title: "Update Profile Success",
              message: "Profile updated successfully",
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

          handleCloseDialog();
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setInput({});
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <form onSubmit={inputHandler} className="px-6">
        <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6 my-2">
          <InputVertical
            title={"Nama Perusahaan"}
            name="company_name"
            onChange={(e) => {
              handleChange("company_name", e.target.value);
              setInput({ ...input, company_name: e.target.value });
            }}
            value={input.company_name}
            className="my-2"
          />

          <InputVertical
            title={"Nomor NPWP" + "" + input.company_npwp}
            name="company_npwp"
            onChange={(e) => {
              handleChange("company_npwp", e.target.value);
              setInput({ ...input, company_npwp: e.target.value });
            }}
            className="my-2"
            value={input.company_npwp}
          />

          <InputVertical
            title="Kegiatan Utama"
            name="kegiatan_utama"
            onChange={(e) => {
              handleChange("kegiatan_utama", e.target.value);
              setInput({ ...input, kegiatan_utama: e.target.value });
            }}
            className="my-2"
            value={input.kegiatan_utama}
          />
        </div>

        <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div>
            <h1 className="mb-2">Jenis Wajib Pajak</h1>
            <Select
              name="jenis_wp"
              value={String(input.jenis_wp)}
              onValueChange={(e) => {
                handleChange("jenis_wp", e);
                setInput({ ...input, jenis_wp: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {jenisWpOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.jenis_wp}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h1 className="mb-2">Bentuk Badan Hukum</h1>
            <Select
              name="bentuk_badan_hukum"
              value={String(input.bentuk_badan_hukum)}
              onValueChange={(e) => {
                handleChange("bentuk_badan_hukum", e);
                setInput({ ...input, bentuk_badan_hukum: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {badanHukumOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.badan_hukum}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h1 className="mb-2">Status NPWP</h1>
            <Select
              name="status_npwp"
              value={String(input.status_npwp)}
              onValueChange={(e) => {
                handleChange("status_npwp", e);
                setInput({ ...input, status_npwp: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {statusNpwpOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.status}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2">
            <InputVertical
              title="Tanggal Pengukuhan PKP"
              name="tanggal_pengukuhan_pkp"
              type="date"
              value={dateStrip(input.tanggal_pengukuhan_pkp)}
              onChange={(e) => {
                handleChange("tanggal_pengukuhan_pkp", e.target.value);
                setInput({ ...input, tanggal_pengukuhan_pkp: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div>
            <h1 className="mb-2">Status PKP</h1>
            <Select
              name="status_pkp"
              value={String(input.status_pkp)}
              onValueChange={(e) => {
                handleChange("status_pkp", e);
                setInput({ ...input, status_pkp: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {statusNpwpOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.status}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <InputVertical
              title="Kantor Wilayah DJP"
              name="kantor_wilayah_djp"
              value={input.kantor_wilayah_djp}
              onChange={(e) => {
                handleChange("kantor_wilayah_djp", e.target.value);
                setInput({ ...input, kantor_wilayah_djp: e.target.value });
              }}
              className="mt-2 "
            />
          </div>

          <div>
            <h1 className="mb-2">Kantor Pelayanan Pajak</h1>
            <Select
              name="kantor_pelayanan_pajak"
              value={String(input.kantor_pelayanan_pajak)}
              onValueChange={(e) => {
                handleChange("kantor_pelayanan_pajak", e);
                setInput({ ...input, kantor_pelayanan_pajak: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {kppOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.kantor}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h1 className="mb-2">Seksi Pengawasan</h1>
            <Select
              name="seksi_pengawasan"
              value={String(input.seksi_pengawasan)}
              onValueChange={(e) => {
                handleChange("seksi_pengawasan", e);
                setInput({ ...input, seksi_pengawasan: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {statusNpwpOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.status}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="mb-2">Kode KLU</h1>
            <Select
              name="kode_klu"
              value={String(input.kode_klu)}
              onValueChange={(e) => {
                handleChange("kode_klu", e);
                setInput({ ...input, kode_klu: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {kluOption.map((item, key) => {
                  return (
                    <SelectItem key={key} value={String(item.kode)}>
                      {item.kode + "-" + item.deskripsi}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="float-end">
          <Button pending={isPending} className="px-10 rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
