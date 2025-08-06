import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterClientSchema = () => {
  const collection = mongoConfig.collection.master_client;
  const schema = {
    id_client: {
      required: true,
      unique: true,
      type: String,
    },
    nama: {
      type: String,
    },
    status: {
      required: true,
      type: Number,
      default: 1,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
