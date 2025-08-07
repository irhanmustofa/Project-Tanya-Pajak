import { InputHorizontal } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";

export default function PemegangSahamForm({ data, onChange }) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        nama: "",
        no_ktp: "",
        npwp: "",
        address: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jabatan: "",
        jumlah_saham: "",
        persentase: "",
      },
    ]);
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
    <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
      <h4 className="font-semibold text-center">Pemegang Saham</h4>
      {data.map((saham, i) => (
        <div
          key={i}
          className="grid grid-cols-2 gap-4 items-center border p-4 rounded relative border-gray-200"
        >
          <InputHorizontal
            title="Nama"
            value={saham.nama}
            onChange={(e) => handleChange(i, "nama", e.target.value)}
          />
          <InputHorizontal
            title="No. KTP"
            value={saham.no_ktp}
            onChange={(e) => handleChange(i, "no_ktp", e.target.value)}
          />
          <InputHorizontal
            title="No. NPWP"
            value={saham.npwp}
            onChange={(e) => handleChange(i, "npwp", e.target.value)}
          />
          <InputHorizontal
            title="Alamat"
            value={saham.address}
            onChange={(e) => handleChange(i, "address", e.target.value)}
          />
          <InputHorizontal
            title="Tempat Lahir"
            value={saham.tempat_lahir}
            onChange={(e) => handleChange(i, "tempat_lahir", e.target.value)}
          />
          <InputHorizontal
            title="Tanggal Lahir"
            value={saham.tanggal_lahir}
            type="date"
            onChange={(e) => handleChange(i, "tanggal_lahir", e.target.value)}
          />
          <InputHorizontal
            title="Jabatan"
            value={saham.jabatan}
            onChange={(e) => handleChange(i, "jabatan", e.target.value)}
          />
          <InputHorizontal
            title="Jumlah Saham"
            type="number"
            value={saham.jumlah_saham}
            onChange={(e) => handleChange(i, "jumlah_saham", e.target.value)}
          />
          <InputHorizontal
            title="% Kepemilikan"
            type="number"
            value={saham.persentase}
            onChange={(e) => handleChange(i, "persentase", e.target.value)}
          />
          <Button variant="destructive" onClick={() => handleRemove(i)}>
            Hapus
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAdd}>
        + Tambah Pemegang Saham
      </Button>
    </div>
  );
}
