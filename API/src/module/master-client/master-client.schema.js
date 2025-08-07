import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterClientSchema = () => {
  const collection = mongoConfig.collection.master_client;
  const schema = {
    _id: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  };

  const options = {
    _id: false,
    timestamps: true
  };

  return createConnection({
    collection,
    schema,
    options
  });
};