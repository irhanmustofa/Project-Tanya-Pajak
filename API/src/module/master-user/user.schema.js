import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const userSchema = () => {
  const collection = mongoConfig.collection.users;
  const schema = {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    expired: {
      required: true,
      type: Date,
    },
    token: {
      required: true,
      type: String,
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
