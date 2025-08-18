import { mongoConfig } from "../../../database/mongo/mongo.config.js";
import { createConnection } from "../../../database/mongo/mongo.connection.js";

export const pajakKeluaranSchema = (client_id) => {
    const collection = mongoConfig.collection.pajak_keluaran;
    const schema = {
        nomor_faktur: { type: String, required: true },
        tanggal_faktur: { type: Date, required: true },
        dpp: { type: Number, required: true },
        ppn: { type: Number, required: true },
        description: { type: String, required: false },
        lawan_transaksi: {
            nama: { type: String, required: true },
            npwp: { type: String, required: true },
            alamat: { type: String, required: false },
        },
        status: { type: Number, default: 1 },
    };

    return createConnection({
        client_id,
        collection,
        schema,
        is_client: true,
    });
};
