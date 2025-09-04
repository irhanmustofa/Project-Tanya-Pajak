import { useState } from "react";
import Step1JenisPajak from "./wizard/Step1JenisPajak";
import Step2Periode from "./wizard/Step2Periode";
import Step3JenisSPT from "./wizard/Step3JenisSPT";
import MainPage from "@/layouts/MainPage";
import KonsepSptProvider, {
  useKonsepSpt,
} from "../konsep-spt-components/KonsepSptProvider";
import { sptCreate } from "../konsep-spt-components/KonsepSptService";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";

export default function CreateKonsepSPT() {
  const dialogDispatch = useDialogDispatch();
  const { dialogAction, dialogState, DialogInfo } = useDialog();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jenis_pajak: "",
    masa_pajak: "",
    jenis_surat_pemberitahuan: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await sptCreate(formData).then((res) => {
      if (res.success) {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            show: true,
            title: "Add Document Success",
            message: "Document added successfully",
            status: "success",
          },
        });
      } else {
        dialogDispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            show: true,
            title: "Add Document Failed",
            message: res.message,
            status: "error",
          },
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {dialogState && (
        <DialogInfo
          onClose={() => {
            if (dialogState.status === "success") {
              window.location.href = "/konsep-spt";
            }
          }}
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-1/3 h-2 rounded-full ${
            step >= 1 ? "bg-gray-700" : "bg-gray-200"
          }`}
        />
        <div
          className={`w-1/3 h-2 rounded-full ${
            step >= 2 ? "bg-gray-700" : "bg-gray-200"
          }`}
        />
        <div
          className={`w-1/3 h-2 rounded-full ${
            step >= 3 ? "bg-gray-700" : "bg-gray-200"
          }`}
        />
      </div>

      {step === 1 && (
        <Step1JenisPajak
          data={formData}
          onChange={handleChange}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2Periode
          data={formData}
          onChange={handleChange}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3JenisSPT
          data={formData}
          onChange={handleChange}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
