import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "../utils/formatter";

export default function LegalitasTable({
  legalitasData,
  onAddLegalitas,
  onEditLegalitas,
  onDeleteLegalitas,
}) {
  return (
    <div className="mt-6 border border-gray-200 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Akta Perusahaan</h3>
        <Button onClick={onAddLegalitas} size="sm">
          + Tambah Akta
        </Button>
      </div>

      {legalitasData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Belum ada data akta perusahaan
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">No</th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Jenis Akta
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Nomor Akta
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Total Saham
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Pemegang Saham
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {legalitasData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.jenis_akta === "Pendirian"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.jenis_akta}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {item.nomor_akta}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(item.tanggal)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatCurrency(item.total_saham)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.pemegang_saham?.length || 0} orang
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditLegalitas(item, index)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteLegalitas(index)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
