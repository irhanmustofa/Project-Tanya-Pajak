import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";
export const periodeLaporanSchema = (client_id) => {
  const collection = mongoConfig.collection.periode_laporan;
  const schema = {
    tahun_buku: { type: Number, required: true },
    periode_laporan: { type: String },
    periode_awal: { type: Date, required: true },
    periode_akhir: { type: Date, required: true },
    tanggal_ttd: { type: Date },
    tempat_ttd: { type: String, required: true },

    periode_spt_sebelumnya: { type: Date, required: false },
    tarif_pph_spt_sebelumnya: { type: String, required: false },
    file_spt_sebelumnya: { type: String },

    periode_spt_berjalan: { type: Date, required: false },
    tarif_pph_spt_berjalan: { type: String, required: false },
    file_spt_berjalan: { type: String },

    periode_spt_berikutnya: { type: Date, required: false },
    tarif_pph_spt_berikutnya: { type: String, required: false },
    file_spt_berikutnya: { type: String },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },

  };

  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
