import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const userSchema = () => {
  const collection = mongoConfig.collection.users;
  const schema = {
    group_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 1,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
