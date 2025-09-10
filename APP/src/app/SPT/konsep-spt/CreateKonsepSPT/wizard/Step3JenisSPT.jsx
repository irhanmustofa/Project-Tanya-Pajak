export default function Step3JenisSPT({ data, onChange, onBack, onSubmit }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pilih Jenis SPT</h2>
      <select
        value={data.jenis_surat_pemberitahuan}
        onChange={(e) => onChange("jenis_surat_pemberitahuan", e.target.value)}
        className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
      >
        <option value="">-- Pilih --</option>
        <option value="Normal">SPT Normal</option>
        <option value="Pembetulan">SPT Pembetulan</option>
      </select>
      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg"
        >
          Kembali
        </button>
        <button
          onClick={onSubmit}
          disabled={!data.jenis_surat_pemberitahuan}
          className="px-6 py-2 rounded-lg disabled:opacity-50 bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
