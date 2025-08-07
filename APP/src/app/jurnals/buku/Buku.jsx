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
import BukuTable from "./buku-pages/BukuTable";
import BukuProvider from "./buku-components/BukuProvider";

const tahunList = Array.from({ length: 6 }, (_, i) =>
  String(new Date().getFullYear() - i)
);
const masaList = Array.from({ length: 12 }, (_, i) => String(i + 1));

export default function Buku() {
  const { mode } = useParams();
  const location = useLocation();
  const [buku, setBuku] = useState("");
  const [result, setResult] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  console.log("mode", mode);
  useEffect(() => {
    if (mode) setBuku(mode);

    if (mode) {
      setShouldFetch(true);
    }
  }, [location, mode]);

  return (
    <MainPage>
      <BukuProvider
        params={{ buku }}
        shouldFetch={shouldFetch}
        onResult={(data) => setResult(data)}
      >
        {result && <BukuTable />}
      </BukuProvider>
    </MainPage>
  );
}
