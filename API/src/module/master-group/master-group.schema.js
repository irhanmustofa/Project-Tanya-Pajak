import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const masterGroupSchema = () => {
  const collection = mongoConfig.collection.master_group;
  const schema = {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
