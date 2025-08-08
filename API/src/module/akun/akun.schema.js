import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const akunSchema = () => {
  const collection = mongoConfig.collection.client_akun;
  const schema = {
    client_id: {
      type: String,
      required: true,
      trim: true
    },
    client_service: {
      type: Number,
      required: true,
      default: 0,
    },
    max_user: {
      type: Number,
      required: true,
      default: 0,
    },
    client_paket: {
      type: Number,
      required: true,
      default: 0,
    },
    client_active: {
      type: Date,
      required: true,
      default: Date.now,
    },
    client_status: {
      type: Number,
      required: true,
      default: 0,
    },
    refferal_code: {
      type: String,
      required: false,
      trim: true,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
