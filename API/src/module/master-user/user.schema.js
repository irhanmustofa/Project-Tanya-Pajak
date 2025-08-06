import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const userSchema = () => {
  const collection = mongoConfig.collection.users;
  const schema = {
    client_id: {
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
    subscription: {
      type: Date,
      required: true,
      default: Date.now + 7 * 24 * 60 * 60 * 1000,
    },
    paket: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: Number,
      default: 1,
    },
    permission: {
      type: Array,
      default: [],
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
