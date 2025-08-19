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
  kewarganegaraanOption,
  bahasaOption,
  jenisPerusahaan,
} from "@/helpers/variables";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../../perubahan-profil-components/PerubahanProfilProvider";
import {
  clientFirst,
  clientUpdate,
} from "../../perubahan-profil-components/PerubahanProfilService";
import { dateStrip } from "@/components/custom/DateFormatted";
import { countryList } from "../../data/country";

export default function ProfilTabs() {
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const { clientState, clientAction } = useClient();
  const [input, setInput] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, seIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const getData = clientState.data[0] ?? {};

  const { errors, handleChange } = useValidateInput({
    schema: {
      negara_asal: "string",
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
      nomor_keputusan_pengesahan: "string",
      tanggal_keputusan_pengesahan: "string",
      nomor_keputusan_pengesahan_perubahan: "string",
      tanggal_keputusan_pengesahan_perubahan: "string",
      nomor_akta_pendirian: "string",
      tempat_pendirian: "string",
      tanggal_pendirian: "string",
      nik_notaris: "string",
      nama_notaris: "string",
      jenis_perusahaan: "string",
      modal_dasar: "number",
      modal_ditempatkan: "number",
      modal_disetor: "number",
      kewarganegaraan: "string",
      bahasa: "string",
    },
  });

  useEffect(() => {
    if (getData) {
      setInput({
        negara_asal: getData.negara_asal,
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
        kewarganegaraan: getData.kewarganegaraan,
        bahasa: getData.bahasa,
        nomor_keputusan_pengesahan: getData.nomor_keputusan_pengesahan,
        tanggal_keputusan_pengesahan: getData.tanggal_keputusan_pengesahan,
        nomor_keputusan_pengesahan_perubahan:
          getData.nomor_keputusan_pengesahan_perubahan,
        tanggal_keputusan_pengesahan_perubahan:
          getData.tanggal_keputusan_pengesahan_perubahan,
        nomor_akta_pendirian: getData.nomor_akta_pendirian,
        tempat_pendirian: getData.tempat_pendirian,
        tanggal_pendirian: getData.tanggal_pendirian,
        nik_notaris: getData.nik_notaris,
        nama_notaris: getData.nama_notaris,
        jenis_perusahaan: getData.jenis_perusahaan,
        modal_dasar: getData.modal_dasar ?? 0,
        modal_ditempatkan: getData.modal_ditempatkan ?? 0,
        modal_disetor: getData.modal_disetor ?? 0,
      });
    }
    setIsOpen(true);
  }, [getData]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("negara_asal", input.negara_asal);
      formData.append("company_name", input.company_name);
      formData.append("company_npwp", input.company_npwp);
      formData.append("kegiatan_utama", input.kegiatan_utama);
      formData.append("jenis_wp", input.jenis_wp);
      formData.append("bentuk_badan_hukum", input.bentuk_badan_hukum);
      formData.append(
        "nomor_keputusan_pengesahan",
        input.nomor_keputusan_pengesahan
      );
      formData.append(
        "tanggal_keputusan_pengesahan",
        input.tanggal_keputusan_pengesahan
      );
      formData.append(
        "nomor_keputusan_pengesahan_perubahan",
        input.nomor_keputusan_pengesahan_perubahan
      );
      formData.append(
        "tanggal_keputusan_pengesahan_perubahan",
        input.tanggal_keputusan_pengesahan_perubahan
      );
      formData.append("nomor_akta_pendirian", input.nomor_akta_pendirian);
      formData.append("tempat_pendirian", input.tempat_pendirian);
      formData.append("tanggal_pendirian", input.tanggal_pendirian);
      formData.append("nik_notaris", input.nik_notaris);
      formData.append("nama_notaris", input.nama_notaris);
      formData.append("jenis_perusahaan", input.jenis_perusahaan);
      formData.append("modal_dasar", input.modal_dasar);
      formData.append("modal_ditempatkan", input.modal_ditempatkan);
      formData.append("modal_disetor", input.modal_disetor);
      formData.append("kewarganegaraan", input.kewarganegaraan);
      formData.append("bahasa", input.bahasa);

      formData.append("status_npwp", input.status_npwp);
      formData.append("tanggal_pengukuhan_pkp", input.tanggal_pengukuhan_pkp);
      formData.append("status_pkp", input.status_pkp);
      formData.append("kantor_wilayah_djp", input.kantor_wilayah_djp);
      formData.append("kantor_pelayanan_pajak", input.kantor_pelayanan_pajak);
      formData.append("seksi_pengawasan", input.seksi_pengawasan);
      formData.append("kode_klu", input.kode_klu);

      console.log("fe:", input);

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
  };

  return (
    <>
      {dialogState.isOpen && <DialogInfo />}
      <form onSubmit={inputHandler}>
        <div className="px-6 grid xl:grid-cols-4 grid-cols-3">
          <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 col-span-3  gap-6 mb-10">
            <InputVertical
              title={"Nomor NPWP"}
              name="company_npwp"
              onChange={(e) => {
                handleChange("company_npwp", e.target.value);
                setInput({ ...input, company_npwp: e.target.value });
              }}
              value={String(input.company_npwp)}
            />

            <div className="mb-2">
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

            <InputVertical
              title={"Nama Perusahaan"}
              name="company_name"
              onChange={(e) => {
                handleChange("company_name", e.target.value);
                setInput({ ...input, company_name: e.target.value });
              }}
              value={String(input.company_name)}
            />

            <div className="mb-2">
              <h1 className="mb-2">Kategori Wajib Pajak</h1>
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

            <div className="mb-2">
              <h1 className="mb-2">Negara Asal</h1>
              <Select
                name="negara_asal"
                value={String(input.negara_asal)}
                onValueChange={(e) => {
                  handleChange("negara_asal", e);
                  setInput({ ...input, negara_asal: e });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((item, key) => {
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
              title="Kegiatan Utama"
              name="kegiatan_utama"
              onChange={(e) => {
                handleChange("kegiatan_utama", e.target.value);
                setInput({ ...input, kegiatan_utama: e.target.value });
              }}
              value={String(input.kegiatan_utama)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 col-span-2 mb-2">
            <InputVertical
              name="nomor_keputusan_pengesahan"
              value={String(input.nomor_keputusan_pengesahan)}
              title="Nomor Keputusan Pengesahan"
              onChange={(e) => {
                handleChange("nomor_keputusan_pengesahan", e.target.value);
                setInput({
                  ...input,
                  nomor_keputusan_pengesahan: e.target.value,
                });
              }}
              className="mb-4"
            />

            <InputVertical
              name="tanggal_keputusan_pengesahan"
              value={dateStrip(input.tanggal_keputusan_pengesahan)}
              title="Tanggal Keputusan Pengesahan"
              type="date"
              onChange={(e) => {
                handleChange("tanggal_keputusan_pengesahan", e.target.value);
                setInput({
                  ...input,
                  tanggal_keputusan_pengesahan: e.target.value,
                });
              }}
              className="mb-4"
            />

            <InputVertical
              name="nomor_keputusan_pengesahan_perubahan"
              value={String(input.nomor_keputusan_pengesahan_perubahan)}
              title="Nomor Keputusan Pengesahan Perubahan"
              onChange={(e) => {
                handleChange(
                  "nomor_keputusan_pengesahan_perubahan",
                  e.target.value
                );
                setInput({
                  ...input,
                  nomor_keputusan_pengesahan_perubahan: e.target.value,
                });
              }}
              className="mb-4"
            />

            <InputVertical
              name="tanggal_keputusan_pengesahan_perubahan"
              value={dateStrip(input.tanggal_keputusan_pengesahan_perubahan)}
              title="Tanggal Keputusan Pengesahan Perubahan"
              type="date"
              onChange={(e) => {
                handleChange(
                  "tanggal_keputusan_pengesahan_perubahan",
                  e.target.value
                );
                setInput({
                  ...input,
                  tanggal_keputusan_pengesahan_perubahan: e.target.value,
                });
              }}
              className="mb-4"
            />
          </div>

          <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 col-span-3 gap-6 my-8">
            <InputVertical
              name="nomor_akta_pendirian"
              value={String(input.nomor_akta_pendirian)}
              title="Nomor Akta Pendirian"
              onChange={(e) => {
                handleChange("nomor_akta_pendirian", e.target.value);
                setInput({
                  ...input,
                  nomor_akta_pendirian: e.target.value,
                });
              }}
            />

            <InputVertical
              name="tempat_pendirian"
              value={String(input.tempat_pendirian)}
              title="Tempat Pendirian"
              onChange={(e) => {
                handleChange("tempat_pendirian", e.target.value);
                setInput({
                  ...input,
                  tempat_pendirian: e.target.value,
                });
              }}
            />

            <InputVertical
              name="tanggal_pendirian"
              value={dateStrip(input.tanggal_pendirian)}
              title="Tanggal Pendirian"
              type="date"
              onChange={(e) => {
                handleChange("tanggal_pendirian", e.target.value);
                setInput({
                  ...input,
                  tanggal_pendirian: e.target.value,
                });
              }}
            />

            <InputVertical
              name="nik_notaris"
              value={String(input.nik_notaris)}
              title="NIK Notaris"
              onChange={(e) => {
                handleChange("nik_notaris", e.target.value);
                setInput({
                  ...input,
                  nik_notaris: e.target.value,
                });
              }}
            />

            <InputVertical
              name="nama_notaris"
              value={String(input.nama_notaris)}
              title="Nama Notaris"
              onChange={(e) => {
                handleChange("nama_notaris", e.target.value);
                setInput({
                  ...input,
                  nama_notaris: e.target.value,
                });
              }}
            />

            <div className="mb-2">
              <h1 className="mb-2">Jenis Perusahaan</h1>
              <Select
                name="jenis_perusahaan"
                value={String(input.jenis_perusahaan)}
                onValueChange={(e) => {
                  handleChange("jenis_perusahaan", e);
                  setInput({ ...input, jenis_perusahaan: e });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {jenisPerusahaan.map((item, key) => {
                    return (
                      <SelectItem key={key} value={item.kode}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <InputVertical
              name="modal_dasar"
              value={String(input.modal_dasar)}
              title="Modal Dasar"
              type="number"
              onChange={(e) => {
                handleChange("modal_dasar", e.target.value);
                setInput({ ...input, modal_dasar: e.target.value });
              }}
            />

            <InputVertical
              name="modal_ditempatkan"
              value={String(input.modal_ditempatkan)}
              title="Modal Ditempatkan"
              type="number"
              onChange={(e) => {
                handleChange("modal_ditempatkan", e.target.value);
                setInput({ ...input, modal_ditempatkan: e.target.value });
              }}
            />

            <InputVertical
              name="modal_disetor"
              value={String(input.modal_disetor)}
              title="Modal Disetor"
              type="number"
              onChange={(e) => {
                handleChange("modal_disetor", e.target.value);
                setInput({ ...input, modal_disetor: e.target.value });
              }}
            />

            <div className="mb-2">
              <h1 className="mb-2">Kewarganegaraan</h1>
              <Select
                name="kewarganegaraan"
                value={String(input.kewarganegaraan)}
                onValueChange={(e) => {
                  handleChange("kewarganegaraan", e);
                  setInput({ ...input, kewarganegaraan: e });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {kewarganegaraanOption.map((item, key) => {
                    return (
                      <SelectItem key={key} value={String(item.kode)}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2">
              <h1 className="mb-2">Bahasa</h1>
              <Select
                name="bahasa"
                value={input.bahasa ? String(input.bahasa) : ""}
                onValueChange={(e) => {
                  handleChange("bahasa", e);
                  setInput({ ...input, bahasa: e });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {bahasaOption.map((item, key) => {
                    return (
                      <SelectItem key={key} value={String(item.kode)}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isVisible && (
            <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 col-span-3 gap-6 my-8">
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
                    setInput({
                      ...input,
                      tanggal_pengukuhan_pkp: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          )}

          {isVisible && (
            <div
              className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 col-span-3 gap-6 my-8"
              hidden
            >
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
          )}
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
