import React, { useState, useEffect } from "react";
import MainPage from "@/layouts/MainPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JurnalTable from "./jurnal-pages/JurnalTable";
import JurnalProvider from "./jurnal-components/JurnalProvider";

const tahunList = Array.from({ length: 6 }, (_, i) =>
  String(new Date().getFullYear() - i)
);
const masaList = Array.from({ length: 12 }, (_, i) => String(i + 1));

export default function Jurnal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tahun, setTahun] = useState("");
  const [masa, setMasa] = useState("");
  const [result, setResult] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tahunQuery = queryParams.get("tahun");
    const masaQuery = queryParams.get("masa");
    if (tahunQuery) setTahun(tahunQuery);
    if (masaQuery) setMasa(masaQuery);
  }, [location]);
  useEffect(() => {
    if (shouldFetch) {
      const timeout = setTimeout(() => setShouldFetch(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [shouldFetch]);

  const handleCari = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (tahun) queryParams.set("tahun", tahun);
    if (masa) queryParams.set("masa", masa);
    navigate(`/jurnal?${queryParams.toString()}`, { replace: true });
    setShouldFetch(true);
  };

  return (
    <MainPage>
      <JurnalProvider
        params={{ tahun, masa }}
        shouldFetch={shouldFetch}
        onResult={(data) => setResult(data)}
      >
        <h1 className="text-2xl font-bold mb-4">Jurnal</h1>

        <form className="flex gap-4 mb-4 items-end mt-4" onSubmit={handleCari}>
          <Select
            value={tahun || undefined}
            onValueChange={setTahun}
            placeholder="Pilih Tahun"
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {tahunList.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={masa || undefined}
            onValueChange={setMasa}
            placeholder="Pilih Masa"
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Pilih Masa" />
            </SelectTrigger>
            <SelectContent>
              {masaList.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            type="submit"
            className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
          >
            Submit
          </button>
        </form>

        {result && <JurnalTable />}
      </JurnalProvider>
    </MainPage>
  );
}
