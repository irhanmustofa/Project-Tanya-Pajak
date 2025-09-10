export default function Step2Periode({ data, onChange, onNext, onBack }) {
  console.log(" data:", data);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Pilih Periode dan Tahun Pajak
      </h2>
      <input
        type="month"
        value={data.masa_pajak}
        onChange={(e) => onChange("masa_pajak", e.target.value)}
        className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
      />
      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!data.masa_pajak}
          className="px-6 py-2 rounded-lg disabled:opacity-50 bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
