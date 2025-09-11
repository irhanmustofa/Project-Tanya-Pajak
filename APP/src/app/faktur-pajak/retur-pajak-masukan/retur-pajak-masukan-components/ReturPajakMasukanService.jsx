import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const returPajakMasukanEndpoint = {};

export const returPajakMasukanAll = async () => {
  return {
    success: true,
    data: Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      npwp_penjual: `01.234.567.${(index + 1)
        .toString()
        .padStart(3, "0")}-999.000`,
      nama_penjual: `PT Penjual ${index + 1}`,
      nomor_faktur_pajak: `010.${(index + 1)
        .toString()
        .padStart(3, "0")}.12345678`,
      tanggal_faktur_pajak: new Date(2025, 0, index + 1).toISOString(),
      masa_pajak: ((index % 12) + 1).toString().padStart(2, "0"),
      tahun: "2025",
      masa_pajak_pengkreditan: ((index % 12) + 1).toString().padStart(2, "0"),
      tahun_pajak_pengkreditan: "2025",
      status_faktur: index % 4,
      dpp_nilai_lain: 1000000 + index * 50000,
      ppn: 100000 + index * 5000,
      ppnbm: 0,
      perekam: `User ${index + 1}`,
      nomor_sp2dk: `SP2DK-${index + 1}`,
      valid: index % 2 === 0 ? "Ya" : "Tidak",
      dilaporkan: index % 2 === 0 ? "Sudah" : "Belum",
      dilaporkan_penjual: index % 3 === 0 ? "Ya" : "Tidak",
    })),
  };
};
