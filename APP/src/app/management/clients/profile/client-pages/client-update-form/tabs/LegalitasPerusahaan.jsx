import { InputHorizontal } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PemegangSahamForm from "./PemegangSahamForm";

export default function LegalitasPerusahaan({ formData, setFormData }) {
  const legalitas = formData.legalitas || [
    {
      jenis_akta: "",
      nomor_akta: "",
      tanggal: "",
      nomor_sk: "",
      nomor_nib: "",
      nomor_kbli: "",
      alamat_perusahaan: "",
      total_saham: "",
      harga_saham: "",
      jumlah_saham: "",
      link_akta: "",
      link_sk: "",
      link_nib: "",
      pemegang_saham: [],
    },
  ];

  const handleChange = (index, name, value) => {
    const updated = [...legalitas];
    updated[index][name] = value;
    setFormData({ ...formData, legalitas: updated });
  };

  const addAkta = () => {
    setFormData({
      ...formData,
      legalitas: [
        ...legalitas,
        {
          jenis_akta: "",
          nomor_akta: "",
          tanggal: "",
          nomor_sk: "",
          nomor_nib: "",
          nomor_kbli: "",
          alamat_perusahaan: "",
          total_saham: "",
          harga_saham: "",
          jumlah_saham: "",
          link_akta: "",
          link_sk: "",
          link_nib: "",
          pemegang_saham: [],
        },
      ],
    });
  };

  const removeAkta = (index) => {
    const updated = [...legalitas];
    updated.splice(index, 1);
    setFormData({ ...formData, legalitas: updated });
  };

  return (
    <div className="grid gap-6">
      {legalitas.map((akta, index) => (
        <div
          key={index}
          className="border p-4 relative space-y-4 border-gray-200 rounded-lg"
        >
          {legalitas.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              className="top-2 right-2 w-1/6 justify-self-end absolute"
              onClick={() => removeAkta(index)}
            >
              Hapus
            </Button>
          )}
          <h3 className="font-semibold text-lg text-center">
            Akta {index + 1}
          </h3>

          <label className="block font-medium text-sm mb-1">Jenis Akta</label>
          <div className="flex gap-6 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`jenis_akta_${index}`}
                value="Pendirian"
                checked={akta.jenis_akta === "Pendirian"}
                onChange={(e) =>
                  handleChange(index, "jenis_akta", e.target.value)
                }
              />
              Pendirian
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`jenis_akta_${index}`}
                value="Perubahan"
                checked={akta.jenis_akta === "Perubahan"}
                onChange={(e) =>
                  handleChange(index, "jenis_akta", e.target.value)
                }
              />
              Perubahan
            </label>
          </div>
          <InputHorizontal
            title="Nomor Akta"
            name="nomor_akta"
            value={akta.nomor_akta}
            onChange={(e) => handleChange(index, "nomor_akta", e.target.value)}
          />
          <InputHorizontal
            title="Tanggal Akta"
            name="tanggal"
            type="date"
            value={akta.tanggal}
            onChange={(e) => handleChange(index, "tanggal", e.target.value)}
          />
          <InputHorizontal
            title="Nomor SK"
            name="nomor_sk"
            value={akta.nomor_sk}
            onChange={(e) => handleChange(index, "nomor_sk", e.target.value)}
          />
          <InputHorizontal
            title="Nomor NIB"
            name="nomor_nib"
            value={akta.nomor_nib}
            onChange={(e) => handleChange(index, "nomor_nib", e.target.value)}
          />
          <InputHorizontal
            title="Nomor KBLI"
            name="nomor_kbli"
            value={akta.nomor_kbli}
            onChange={(e) => handleChange(index, "nomor_kbli", e.target.value)}
          />
          <div>
            <label className="block font-medium text-sm">
              Alamat Perusahaan
            </label>
            <Textarea
              name="alamat_perusahaan"
              value={akta.alamat_perusahaan}
              onChange={(e) =>
                handleChange(index, "alamat_perusahaan", e.target.value)
              }
            />
          </div>
          <InputHorizontal
            title="Total Saham"
            name="total_saham"
            type="number"
            value={akta.total_saham}
            onChange={(e) => handleChange(index, "total_saham", e.target.value)}
          />
          <InputHorizontal
            title="Harga Saham"
            name="harga_saham"
            type="number"
            value={akta.harga_saham}
            onChange={(e) => handleChange(index, "harga_saham", e.target.value)}
          />
          <InputHorizontal
            title="Jumlah Saham"
            name="jumlah_saham"
            type="number"
            value={akta.jumlah_saham}
            onChange={(e) =>
              handleChange(index, "jumlah_saham", e.target.value)
            }
          />
          <InputHorizontal
            title="Link Akta"
            name="link_akta"
            value={akta.link_akta}
            onChange={(e) => handleChange(index, "link_akta", e.target.value)}
          />
          <InputHorizontal
            title="Link SK"
            name="link_sk"
            value={akta.link_sk}
            onChange={(e) => handleChange(index, "link_sk", e.target.value)}
          />
          <InputHorizontal
            title="Link NIB"
            name="link_nib"
            value={akta.link_nib}
            onChange={(e) => handleChange(index, "link_nib", e.target.value)}
          />

          <div>
            <PemegangSahamForm
              data={akta.pemegang_saham}
              onChange={(newData) =>
                handleChange(index, "pemegang_saham", newData)
              }
            />
          </div>
        </div>
      ))}

      <Button type="button" onClick={addAkta}>
        + Tambah Legalitas Akta
      </Button>
    </div>
  );
}
