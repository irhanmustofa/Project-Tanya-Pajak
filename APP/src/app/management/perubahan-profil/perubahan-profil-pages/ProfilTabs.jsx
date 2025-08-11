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

export default function ProfilTabs({ data }) {
  const [input, setInput] = useState({});
  const id = useLocalStorage.get("clientId") ?? "";
  const { errors, handleChange } = useValidateInput({
    schema: {
      company_name: "required|string|min:5",
    },
  });

  useEffect(() => {
    setInput({
      company_name: data.company_name,
      npwp: data.npwp,
      kegiatan_utama: data.kegiatan_utama,
      jenis_wp: data.jenis_wp,
      bentuk_badan_hukum: data.bentuk_badan_hukum,
      status_npwp: data.status_npwp,
      tanggal_pengukuhan_pkp: data.tanggal_pengukuhan_pkp,
      status_pkp: data.status_pkp,
      kantor_wilayah_djp: data.kantor_wilayah_djp,
      kpp: data.kpp,
      seksi_pengawasan: data.seksi_pengawasan,
    });
  }, [data]);

  return (
    <>
      <form>
        <div className="grid grid-cols-3 gap-4 my-2">
          <InputVertical
            title="Nama Perusahaan"
            name="nama"
            onChange={(e) => {
              handleChange("company_name", e.target.value);
              setInput({ ...input, company_name: e.target.value });
            }}
            value={data.company_name}
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
              value={data.tanggal_pengukuhan_pkp ?? ""}
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
              value={data.kantor_wilayah_djp ?? ""}
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
