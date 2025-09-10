import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const pajakMasukanEndpoint = {};

export const pajakMasukanAll = async () => {
  return {
    success: true,
    data: Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      kode_transaksi: "Kode Transaksi " + (index + 1),
      no_faktur: "No Faktur " + (index + 1),
      tipe_transaksi: "Tipe Transaksi " + (index + 1),
      tgl_transaksi: "Tgl Transaksi " + (index + 1),
      jenis_faktur: "Jenis Faktur " + (index + 1),
      referensi_faktur: "Referensi Faktur " + (index + 1),
      alamat: "Alamat " + (index + 1),
      idtku: "IDTKU " + (index + 1),
      description: "Description " + (index + 1),
    })),
  };
};
