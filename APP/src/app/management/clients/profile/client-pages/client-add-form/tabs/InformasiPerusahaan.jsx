import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect, use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClient } from "../../../client-components/ClientProvider";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function InformasiPerusahaan({ formData, setFormData }) {
  const [preview, setPreview] = useState("");
  const { clientGroup } = useClient();
  const fileInputRef = useRef(null);

  const jenisWpOption = [
    { kode: "1", jenis_wp: "BADAN" },
    { kode: "2", jenis_wp: "ORANG PRIBADI" },
  ];

  const badanHukumOption = [
    { kode: "1", badan_hukum: "Perseroan Terbatas (PT)" },
    { kode: "2", badan_hukum: "Perseroan Perorangan" },
    { kode: "3", badan_hukum: "Perusahaan Persero (Persero)" },
    { kode: "4", badan_hukum: "Perusahaan Perum (Perum)" },
    { kode: "5", badan_hukum: "Koperasi" },
    { kode: "6", badan_hukum: "Yayasan" },
  ];

  const statusNpwpOption = [
    { status: "Aktif", kode: "1" },
    { status: "Non Aktif", kode: "0" },
  ];

  const kppOption = [
    { kode: "1", kantor: "KPP Pratama Jakarta Matraman (001)" },
    { kode: "2", kantor: "KPP Pratama Jakarta Pulogadung (003)" },
    { kode: "3", kantor: "KPP Pratama Jakarta Cakung Satu (004)" },
    { kode: "4", kantor: "KPP Pratama Jakarta Kramat Jati (005)" },
    { kode: "5", kantor: "KPP Pratama Jakarta Cakung Dua (006)" },
    { kode: "6", kantor: "KPP Pratama Jakarta Duren Sawit (008)" },
    { kode: "7", kantor: "KPP Pratama Jakarta Pasar Rebo (009)" },
  ];

  const handleChange = (name, value) => {
    console.log("handleChange:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleChange("logo", file);
    } else {
      handleChange("logo", null);
    }
  };

  const removePreview = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    handleChange("logo", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-4">
      <InputHorizontal
        title="Nama Perusahaan"
        name="nama"
        value={formData.nama}
        onChange={(e) => handleChange("nama", e.target.value)}
      />
      <InputHorizontal
        title="Nomor NPWP"
        name="npwp"
        value={formData.npwp}
        onChange={(e) => handleChange("npwp", e.target.value)}
      />
      <InputHorizontal
        title="Kegiatan Utama"
        name="kegiatan_utama"
        value={formData.kegiatan_utama}
        onChange={(e) => handleChange("kegiatan_utama", e.target.value)}
      />

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>Jenis Wajib Pajak</h1>
        </div>
        <div className="col-span-3">
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
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>Bentuk Badan Hukum</h1>
        </div>
        <div className="col-span-3">
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
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>Status NPWP</h1>
        </div>
        <div className="col-span-3">
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
      </div>

      <InputHorizontal
        title="Tanggal Pengukuhan PKP"
        name="tanggal_pengukuhan_pkp"
        type="date"
        value={formData.tanggal_pengukuhan_pkp}
        onChange={(e) => handleChange("tanggal_pengukuhan_pkp", e.target.value)}
      />

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>Status PKP</h1>
        </div>
        <div className="col-span-3">
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
      </div>

      <InputHorizontal
        title="Kantor Wilayah DJP"
        name="kantor_wilayah_djp"
        value={formData.kantor_wilayah_djp}
        onChange={(e) => handleChange("kantor_wilayah_djp", e.target.value)}
      />

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>KPP</h1>
        </div>
        <div className="col-span-3">
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
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <h1>Seksi Pengawasan</h1>
        </div>
        <div className="col-span-3">
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
    </div>
  );
}
