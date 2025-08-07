import { mongoConfig } from "../../../database/mongo/mongo.config.js";
import { createConnection } from "../../../database/mongo/mongo.connection.js";

export const headSchema = (client_id) => {
  const collection = mongoConfig.collection.coa_head;
  const schema = {
    nama_head: {
      type: String,
      require: true,
    },
    kode_head: {
      type: String,
      require: true,
    },
    kode_group: {
      type: String,
      require: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  };
  return createConnection({
    client_id,
    collection,
    schema,
    is_client: true,
  });
};
