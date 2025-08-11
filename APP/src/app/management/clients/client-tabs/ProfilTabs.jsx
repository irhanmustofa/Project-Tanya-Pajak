import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import ButtonSubmit from "@/components/custom/ButtonSubmit";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useValidateInput } from "@/hooks/use-validate-input";
import { useEffect, useState } from "react";
import {
  jenisWpOption,
  kppOption,
  badanHukumOption,
  statusNpwpOption,
} from "@/helpers/variables";
import { Button } from "react-day-picker";

export default function ProfilTabs(formData) {
  const [input, setInput] = useState({});
  const id = useLocalStorage.get("clientId") ?? "";
  const { errors, handleChange } = useValidateInput({
    schema: {
      nama_group: "required|string|min:5",
      kode_group: "required|string|min:4",
    },
  });

  useEffect(() => {
    setInput({
      company_name: formData.company_name,
      npwp: formData.npwp,
      kegiatan_utama: formData.kegiatan_utama,
      jenis_wp: formData.jenis_wp,
      bentuk_badan_hukum: formData.bentuk_badan_hukum,
      status_npwp: formData.status_npwp,
      tanggal_pengukuhan_pkp: formData.tanggal_pengukuhan_pkp,
      status_pkp: formData.status_pkp,
      kantor_wilayah_djp: formData.kantor_wilayah_djp,
      kpp: formData.kpp,
      seksi_pengawasan: formData.seksi_pengawasan,
    });
  }, [formData]);
  return (
    <>
      <form>
        <div className="grid grid-cols-3 gap-4 my-2">
          <InputVertical
            title="Nama Perusahaan"
            name="nama"
            onChange={(e) => handleChange("nama", e.target.value)}
            value={formData.company_name ?? "dsfsdf"}
            className="my-2"
          />

          <InputVertical
            title="Nomor NPWP"
            name="npwp"
            onChange={(e) => handleChange("npwp", e.target.value)}
            className="my-2"
          />

          <InputVertical
            title="Kegiatan Utama"
            name="kegiatan_utama"
            onChange={(e) => handleChange("kegiatan_utama", e.target.value)}
            className="my-2"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 my-8">
          <div>
            <h1 className="mb-2">Jenis Wajib Pajak</h1>
            <Select name="jenis_wp" value={"" || undefined}>
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
            <Select name="bentuk_badan_hukum" value={"" || undefined}>
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
            <Select name="status_npwp" value={"" || undefined}>
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
              value={formData.tanggal_pengukuhan_pkp ?? ""}
              onChange={(e) =>
                handleChange("tanggal_pengukuhan_pkp", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 my-8">
          <div>
            <h1 className="mb-2">Status PKP</h1>
            <Select name="status_pkp" value={"" || undefined}>
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
              value={formData.kantor_wilayah_djp ?? ""}
              onChange={(e) =>
                handleChange("kantor_wilayah_djp", e.target.value)
              }
              className="mt-2 "
            />
          </div>

          <div>
            <h1 className="mb-2">KPP</h1>
            <Select name="kpp" value={"" || undefined}>
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
            <Select name="seksi_pengawasan" value={"" || undefined}>
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
        </div>
        <div className="float-end">
          <ButtonSubmit title="Submit" className="px-10 rounded-full" />
        </div>
      </form>
    </>
  );
}
