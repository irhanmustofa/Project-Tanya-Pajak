import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import {
  useClient,
  useClientDispatch,
} from "../../perubahan-profil-components/PerubahanProfilProvider";
import { useEffect, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useValidateInput } from "@/hooks/use-validate-input";
import {
  InputHorizontal,
  InputVertical,
} from "@/components/custom/input-custom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { jenisAlamat, jenisWpOption } from "@/helpers/variables";
import { Button } from "@/components/ui/button";
import { countryList } from "../../data/country";
import { Input } from "@/components/ui/input";
import { provinceList } from "../../data/province";
import AlamatSubject from "./alamat-components/AlamatSubject";

export default function AlamatTabs() {
  const id = useLocalStorage.get("clientId") ?? "";
  const dialogDispatch = useDialogDispatch();
  const clientDispatch = useClientDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();
  const { clientState, clientAction } = useClient();
  const [input, setInput] = useState({});
  const [country, setCountry] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const getData = clientState.data[0] ?? {};

  const { errors, handleChange } = useValidateInput({
    schema: {
      alamat: "string|min:5",
      rt: "string|min:3|max:3",
      rw: "string|min:3|max:3",
      provinsi: "number",
      kabupaten: "number",
      kecamatan: "number",
      desa: "number",
      kode_area: "number",
      kode_pos: "number",
      data_geometrik: "string",
      disewa: "number",
      tanggal_mulai: "string",
      tanggal_berakhir: "string",
      kode_kpp: "number",
      bagian_pengawasan: "number",
    },
  });

  useEffect(() => {
    if (clientState.success) {
      setInput({
        alamat: getData.alamat,
        rt: getData.rt,
        rw: getData.rw,
        provinsi: getData.provinsi,
        kabupaten: getData.kabupaten,
        kecamatan: getData.kecamatan,
        desa: getData.desa,
        kode_area: getData.kode_area,
        kode_pos: getData.kode_pos,
        data_geometrik: getData.data_geometrik,
        disewa: getData.disewa,
        tanggal_mulai: getData.tanggal_mulai,
        tanggal_berakhir: getData.tanggal_berakhir,
        kode_kpp: getData.kode_kpp,
        bagian_pengawasan: getData.bagian_pengawasan,
      });
    }
    setIsOpen(true);
  }, [getData, isOpen]);

  const inputHandler = (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("alamat", input.alamat);
      formData.append("rt", input.rt);
      formData.append("rw", input.rw);
      formData.append("provinsi", input.provinsi);
      formData.append("kabupaten", input.kabupaten);
      formData.append("kecamatan", input.kecamatan);
      formData.append("desa", input.desa);
      formData.append("kode_area", input.kode_area);
      formData.append("kode_pos", input.kode_pos);
      formData.append("data_geometrik", input.data_geometrik);
      formData.append("disewa", input.disewa);
      formData.append("tanggal_mulai", input.tanggal_mulai);
      formData.append("tanggal_berakhir", input.tanggal_berakhir);
      formData.append("kode_kpp", input.kode_kpp);
      formData.append("bagian_pengawasan", input.bagian_pengawasan);

      await clientUpdate(id, formData).then((response) => {
        if (!response.success) {
          dialogDispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Update alamat Failed",
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
              title: "Update Alamat Success",
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

  return <>AlamatTabs</>;
}
