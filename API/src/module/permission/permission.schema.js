import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const permissionSchema = () => {
  const collection = mongoConfig.collection.permission;
  const schema = {
    key: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
