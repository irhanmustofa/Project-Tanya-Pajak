import { Button } from "@/components/ui/button";

export default function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus data ini?",
  itemInfo = null,
  itemType = "legalitas",
}) {
  if (!isOpen) return null;

  const renderItemInfo = () => {
    if (!itemInfo) return null;

    if (itemType === "pemegang_saham") {
      return (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-left">
          <p className="font-medium text-gray-900 dark:text-white">
            {itemInfo.nama}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Jabatan: {itemInfo.jabatan}
          </p>
          {itemInfo.persentase && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Persentase: {itemInfo.persentase}% ({itemInfo.jumlah_saham} saham)
            </p>
          )}
        </div>
      );
    }

    // Default untuk legalitas
    return (
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-left">
        <p className="font-medium text-gray-900 dark:text-white">
          {itemInfo.jenis_akta} - {itemInfo.nomor_akta}
        </p>
        {itemInfo.tanggal && (
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Tanggal: {new Date(itemInfo.tanggal).toLocaleDateString("id-ID")}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {title}
          </h3>

          {/* Message */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            <p className="mb-2">{message}</p>

            {renderItemInfo()}

            <p className="text-red-600 dark:text-red-400 font-medium mt-3">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
