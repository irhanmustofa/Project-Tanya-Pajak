import { InputHorizontal } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";

export default function PengurusForm({ data, onChange }) {
  const handleAdd = () => {
    onChange([...data, { nama: "", jabatan: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-2 border p-4 rounded-lg bg-gray-800 mt-4">
      <h4 className="font-semibold text-center">Pengurus</h4>
      {data.map((org, i) => (
        <div
          key={i}
          className="grid grid-cols-2 gap-4 items-center border p-4 rounded relative border-gray-200"
        >
          <InputHorizontal
            title="Nama"
            value={org.nama}
            onChange={(e) => handleChange(i, "nama", e.target.value)}
          />
          <InputHorizontal
            title="Jabatan"
            value={org.jabatan}
            onChange={(e) => handleChange(i, "jabatan", e.target.value)}
          />
          <Button variant="destructive" onClick={() => handleRemove(i)}>
            Hapus
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAdd}>
        + Tambah Pengurus
      </Button>
    </div>
  );
}
