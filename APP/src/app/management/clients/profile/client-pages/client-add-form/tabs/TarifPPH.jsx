import { InputHorizontal } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";

export default function TarifPPH({ formData, setFormData }) {
  const tarifList = formData.tarif_pph || [
    {
      tahun: "",
      tarif_pph: "",
      view_spt: "",
    },
  ];

  const handleChange = (index, name, value) => {
    const updated = [...tarifList];
    updated[index][name] = value;
    setFormData({ ...formData, tarif_pph: updated });
  };

  const addTarif = () => {
    const updated = [...tarifList, { tahun: "", tarif_pph: "", view_spt: "" }];
    setFormData({ ...formData, tarif_pph: updated });
  };

  const removeTarif = (index) => {
    const updated = tarifList.filter((_, i) => i !== index);
    setFormData({ ...formData, tarif_pph: updated });
  };

  return (
    <div className="grid gap-6">
      {tarifList.map((item, index) => (
        <div
          key={index}
          className="grid gap-4 border p-4 rounded relative border-gray-200"
        >
          {tarifList.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              className="top-2 right-2 w-1/6 justify-self-end"
              onClick={() => removeTarif(index)}
            >
              Hapus
            </Button>
          )}
          <InputHorizontal
            title="Tahun"
            name="tahun"
            type="text"
            value={item.tahun}
            onChange={(e) => handleChange(index, "tahun", e.target.value)}
          />
          <InputHorizontal
            title="Tarif PPh"
            name="tarif_pph"
            type="text"
            value={item.tarif_pph}
            onChange={(e) => handleChange(index, "tarif_pph", e.target.value)}
          />
          <InputHorizontal
            title="Link View SPT"
            name="view_spt"
            type="text"
            value={item.view_spt}
            onChange={(e) => handleChange(index, "view_spt", e.target.value)}
          />
        </div>
      ))}

      <Button type="button" onClick={addTarif}>
        + Tambah Tarif PPh
      </Button>
    </div>
  );
}
