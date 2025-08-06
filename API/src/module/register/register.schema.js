import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const registerSchema = () => {
  const collection = mongoConfig.collection.register;
  const schema = {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
<<<<<<< HEAD
    company_name: {
      type: String,
      required: true,
      trim: true
    },
=======
>>>>>>> fd410b4 (update-register)
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    expired: {
      type: Date,
      default: Date.now,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
