export default function Step1JenisPajak({ data, onChange, onNext }) {
  const pilihan = ["PPN", "PPh Badan", "PPh Final", "PPh 21/26"];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pilih Jenis Pajak</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pilihan.map((item) => (
          <button
            key={item}
            onClick={() => onChange("jenis_pajak", item)}
            className={`p-4 border rounded-lg  ${
              data.jenis_pajak === item
                ? "bg-gray-300 border-gray-400 text-black"
                : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={onNext}
          disabled={!data.jenis_pajak}
          className="px-6 py-2 rounded-lg disabled:opacity-50 bg-gray-500 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
