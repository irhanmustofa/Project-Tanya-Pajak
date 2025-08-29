import { useState } from "react";
import Step1JenisPajak from "./wizard/Step1JenisPajak";
import Step2Periode from "./wizard/Step2Periode";
import Step3JenisSPT from "./wizard/Step3JenisSPT";
import MainPage from "@/layouts/MainPage";
import KonsepSptProvider from "../konsep-spt-components/KonsepSptProvider";

export default function CreateKonsepSPT() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jenisPajak: "",
    periode: "",
    jenisSPT: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Data terkumpul:", formData);
    alert("SPT berhasil dibuat!");
  };

  return (
    <MainPage>
      <KonsepSptProvider>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Progress Bar */}
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
      </KonsepSptProvider>
    </MainPage>
  );
}
