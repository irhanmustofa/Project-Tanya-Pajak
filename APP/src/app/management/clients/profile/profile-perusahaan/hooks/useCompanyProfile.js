import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
// import { useClient, useClientDispatch } from "../client-components/ClientProvider";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
// import { clientUpdate, clientAll } from "../client-components/ClientService";
import { useClient, useClientDispatch } from "../../client-components/ClientProvider";
import { clientAll, clientUpdate } from "../../client-components/ClientService";

export const useCompanyProfile = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const id = useLocalStorage.get("clientId");
    const [_id, setId] = useState("");

    const { clientState, clientAction } = useClient();
    const clientDispatch = useClientDispatch();
    const dialogDispatch = useDialogDispatch();
    const { dialogAction: dialogActionTypes } = useDialog();

    // Effect untuk load data dari context
    useEffect(() => {
        if (id && clientState.data && clientState.data.length > 0) {
            const clientData = clientState.data.find((item) => item._id === id);
            if (clientData) {
                setFormData({
                    company_name: clientData.company_name || "",
                    logo: clientData.logo || "",
                    address_company: clientData.address_company || "",
                    no_npwp: clientData.no_npwp || "",
                    no_pkp: clientData.no_pkp || "",
                    director_name: clientData.director_name || "",
                    no_ktp_director: clientData.no_ktp_director || "",
                    address_director: clientData.address_director || "",
                    rups_akhir_tahun: clientData.rups_akhir_tahun || "",
                    legalitas: clientData.legalitas_perusahaan || [],
                });
                setId(clientData._id);
            }

        }
    }, [id, clientState.data]);


    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (legalitasData) => {
        setLoading(true);

        try {
            const submitData = new FormData();

            // Append semua data text
            submitData.append("company_name", formData.company_name || "");
            submitData.append("address_company", formData.address_company || "");
            submitData.append("no_npwp", formData.no_npwp || "");
            submitData.append("no_pkp", formData.no_pkp || "");
            submitData.append("director_name", formData.director_name || "");
            submitData.append("no_ktp_director", formData.no_ktp_director || "");
            submitData.append("address_director", formData.address_director || "");
            submitData.append("rups_akhir_tahun", formData.rups_akhir_tahun || "");

            // Handle file logo dengan 3 kondisi
            if (formData.logo && formData.logo instanceof File) {
                submitData.append("logo", formData.logo);
            } else if (formData.logo === null) {
                submitData.append("remove_logo", "true");
            } else if (typeof formData.logo === "string") {
                submitData.append("existing_logo", formData.logo);
            }

            // Append data legalitas yang sudah diupdate
            submitData.append("legalitas", JSON.stringify(legalitasData));

            const response = await clientUpdate(_id, submitData);

            if (!response.success) {
                dialogDispatch({
                    type: dialogActionTypes.DIALOG_INFO,
                    payload: {
                        isOpen: true,
                        title: "Update Failed",
                        message: response.message,
                        status: "error",
                    },
                });
            } else {
                dialogDispatch({
                    type: dialogActionTypes.DIALOG_INFO,
                    payload: {
                        isOpen: true,
                        title: "Update Success",
                        message: "Data perusahaan berhasil diupdate",
                        status: "success",
                    },
                });

                // Refresh data di context
                const refreshData = await clientAll();
                if (refreshData.success) {
                    clientDispatch({
                        type: clientAction.SUCCESS,
                        payload: refreshData.data,
                    });
                }
                window.location.reload();
            }
        } catch (error) {
            dialogDispatch({
                type: dialogActionTypes.DIALOG_INFO,
                payload: {
                    isOpen: true,
                    title: "Error",
                    message: "Terjadi kesalahan saat menyimpan data.",
                    status: "error",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        loading,
        handleInputChange,
        handleSave,

    };
};