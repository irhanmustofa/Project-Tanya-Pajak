import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  useClient,
  useClientDispatch,
} from "@/app/management/clients/profile/client-components/ClientProvider";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ProfilePDF from "./ProfilePDF";

export default function ViewProfileContent() {
  const { clientState, loading, error } = useClient();
  const { clientDispatch } = useClientDispatch();
  const id = useLocalStorage.get("clientId");
  const [clientProfile, setClientProfile] = useState({});
  const [showPDF, setShowPDF] = useState(false);

  const latestLegalitas = clientProfile?.legalitas_perusahaan?.[0] || {};
  const latestPemegangSaham = latestLegalitas?.pemegang_saham?.[0] || {};

  useEffect(() => {
    if (clientState?.data && Array.isArray(clientState.data) && id) {
      const foundClient = clientState.data.find((item) => item._id === id);
      if (foundClient) {
        setClientProfile(foundClient);
      }
    }
  }, [id, clientState?.data]);
  const handleShowPDF = () => {
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-[1000px] mx-auto my-10 bg-white shadow-lg rounded-lg">
        <div className="flex justify-end p-4">
          <Button
            onClick={handleShowPDF}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to PDF
          </Button>
        </div>

        <div className="p-6 text-sm text-gray-800 space-y-6">
          <div className="bg-yellow-300 text-black font-bold py-1 px-2 border border-black">
            MYTAXACCOUNTINGSYSTEM - PROFILE & LEGALITAS WAJIB PAJAK
          </div>

          <div className="border border-black rounded-lg">
            <div className="bg-yellow-300 font-semibold py-2 px-4 text-center italic border-b border-black">
              PROFILE WAJIB PAJAK
            </div>
            <div className="p-4 space-y-3">
              <div className="flex">
                <span className="font-bold w-40">NAMA WAJIB PAJAK:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.company_name || "Belum ada nama perusahaan"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">ALAMAT:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.address_company ||
                    "Belum ada alamat perusahaan"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO. NPWP:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.no_npwp || "Belum ada NPWP"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO. PKP:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.no_pkp || "Belum ada PKP"}
                </span>
              </div>
            </div>
          </div>
          <div className="border border-black rounded-lg">
            <div className="bg-yellow-300 font-semibold py-2 px-4 text-center italic border-b border-black">
              KUASA WAJIB PAJAK
            </div>
            <div className="p-4 space-y-3">
              <div className="flex">
                <span className="font-bold w-40">NAMA DIREKTUR:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.director_name}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO. KTP DIREKTUR:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.no_ktp_director}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">ALAMAT DIREKTUR:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.address_director}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO. PKP:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {clientProfile?.no_pkp || "Belum ada PKP"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex px-4">
            <span className="font-bold w-40">RUPS AKHIR TAHUN No:</span>
            <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
              {clientProfile?.rups}
            </span>
          </div>

          <div className="border border-black rounded-lg">
            <div className="bg-yellow-300 font-semibold py-2 px-4 text-center italic border-b border-black">
              NAMA PENGURUS SESUAI DENGAN AKTA PERUBAHAN TERAKHIR
            </div>
            <div className="p-4 space-y-3">
              <div className="flex">
                <span className="font-bold w-40">NAMA:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.nama || "Belum ada nama"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO KTP:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.no_ktp || "Belum ada KTP"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">NO NPWP:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.npwp || "Belum ada NPWP"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">ALAMAT:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.address || "Belum ada alamat"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">TEMPAT, TGL LAHIR:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.tempat_lahir &&
                  latestPemegangSaham?.tanggal_lahir
                    ? `${latestPemegangSaham.tempat_lahir}, ${new Date(
                        latestPemegangSaham.tanggal_lahir
                      ).toLocaleDateString("id-ID")}`
                    : "Belum ada tempat, tanggal lahir"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">JABATAN:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.jabatan || "Belum ada jabatan"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">JUMLAH SAHAM:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.jumlah_saham
                    ? latestPemegangSaham.jumlah_saham.toLocaleString("id-ID")
                    : latestLegalitas?.jumlah_saham?.toLocaleString("id-ID") ||
                      "Belum ada jumlah saham"}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">PERSENTASE KEPEMILIKAN:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  {latestPemegangSaham?.persentase
                    ? `${latestPemegangSaham.persentase}%`
                    : "Belum ada persentase"}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-black rounded-lg">
            <div className="bg-yellow-300 font-semibold py-2 px-4 text-center italic border-b border-black">
              PERIODE LAPORAN
            </div>
            <div className="p-4 space-y-3">
              <div className="flex">
                <span className="font-bold w-40">TAHUN BUKU:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  2024
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">PERIODE LAPORAN:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  2024
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">PERIODE AWAL:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  01/01/2024
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">PERIODE AKHIR:</span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  31/12/2024
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">
                  Tanggal & Tempat ( TTD SPT):
                </span>
                <span className="flex-1 border-b border-dashed border-gray-400 pb-1">
                  Jakarta, 31 Desember 2024
                </span>
              </div>
            </div>
          </div>

          <div className="border border-black rounded-lg">
            <div className="bg-yellow-300 font-semibold py-2 px-4 text-center italic border-b border-black">
              TARIF PERHITUNGAN CIT
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="font-semibold border-b-2 border-black">
                    <th className="text-left py-2">Keterangan</th>
                    <th className="text-left py-2">Periode</th>
                    <th className="text-left py-2">Tarif PPh</th>
                    <th className="text-left py-2">Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2">SPT Tahun Sebelumnya</td>
                    <td className="py-2">12/31/2023</td>
                    <td className="py-2">FINAL</td>
                    <td className="py-2">
                      <a href="#" className="text-blue-600 underline mr-2">
                        LINK SPT
                      </a>
                      <a href="#" className="text-red-600 underline">
                        VIEW SPT
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2">SPT Tahun Berjalan</td>
                    <td className="py-2">12/31/2024</td>
                    <td className="py-2">FINAL</td>
                    <td className="py-2">
                      <a href="#" className="text-blue-600 underline mr-2">
                        LINK SPT
                      </a>
                      <a href="#" className="text-red-600 underline">
                        VIEW SPT
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">SPT Tahun Berikutnya</td>
                    <td className="py-2">12/31/2025</td>
                    <td className="py-2">FINAL</td>
                    <td className="py-2">
                      <a href="#" className="text-blue-600 underline mr-2">
                        LINK SPT
                      </a>
                      <a href="#" className="text-red-600 underline">
                        VIEW SPT
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {clientProfile?.legalitas_perusahaan &&
            clientProfile.legalitas_perusahaan.length > 0 &&
            clientProfile.legalitas_perusahaan.map((item, index) => (
              <div
                key={index}
                className="border border-black rounded-lg mb-8 overflow-x-auto"
              >
                <div
                  className={`text-white font-semibold py-2 px-4 text-center ${
                    index === 0 ? "bg-orange-800" : "bg-green-800"
                  }`}
                >
                  {item.jenis_akta?.toUpperCase() ||
                    `AKTA PERUSAHAAN - ${index + 1}`}
                </div>

                <table className="w-full text-sm border-collapse border border-black">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold w-48 border-r border-black">
                        NOMOR AKTA
                      </td>
                      <td className="p-2">{item.nomor_akta || "-"}</td>
                      <td className="p-2 text-blue-600 underline">
                        <a
                          href={item.link_akta}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LINK AKTA
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        NOMOR SK
                      </td>
                      <td className="p-2">{item.nomor_sk || "-"}</td>
                      <td className="p-2 text-blue-600 underline">
                        <a
                          href={item.link_sk}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LINK SK
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        NOMOR NIB
                      </td>
                      <td className="p-2">{item.nomor_nib || "-"}</td>
                      <td className="p-2 text-blue-600 underline">
                        <a
                          href={item.link_nib}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LINK NIB
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        ALAMAT
                      </td>
                      <td className="p-2" colSpan={2}>
                        {item.alamat_perusahaan || "-"}
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        TOTAL SAHAM
                      </td>
                      <td className="p-2">
                        {item.total_saham?.toLocaleString("id-ID") || "-"}
                      </td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        HARGA / SAHAM
                      </td>
                      <td className="p-2">
                        {item.harga_saham
                          ? `Rp ${item.harga_saham.toLocaleString("id-ID")}`
                          : "-"}
                      </td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-semibold border-r border-black">
                        JUMLAH SAHAM
                      </td>
                      <td className="p-2">
                        {item.jumlah_saham
                          ? `Rp ${item.jumlah_saham.toLocaleString("id-ID")}`
                          : "-"}
                      </td>
                      <td className="p-2"></td>
                    </tr>

                    {/* Pemegang Saham */}
                    <tr className="bg-gray-100 border-b border-black">
                      <td
                        className="p-2 font-bold border-r border-black"
                        colSpan={3}
                      >
                        NAMA PEMEGANG SAHAM
                      </td>
                    </tr>
                    {item.pemegang_saham?.map((pemegang, i) => (
                      <tr key={i} className="border-b border-black">
                        <td className="p-2">{pemegang.nama}</td>
                        <td className="p-2">{pemegang.persentase}%</td>
                        <td className="p-2">
                          Rp {(pemegang.nilai || 0).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-gray-100 border-b border-black">
                      <td
                        className="p-2 font-bold border-r border-black"
                        colSpan={3}
                      >
                        NAMA PENGURUS
                      </td>
                    </tr>
                    {item.pemegang_saham?.map((pengurus, i) => (
                      <tr key={i} className="border-b border-black">
                        <td className="p-2">{pengurus.nama}</td>
                        <td className="p-2" colSpan={2}>
                          {pengurus.jabatan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
      {showPDF && <ProfilePDF onClose={handleClosePDF} />}
    </>
  );
}
